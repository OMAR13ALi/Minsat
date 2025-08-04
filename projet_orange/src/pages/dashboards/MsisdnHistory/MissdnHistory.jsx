import React, { useState, useEffect, useRef } from 'react';
import { Download, Calendar } from 'lucide-react';

const MsisdnHistory = () => {
  const [msisdn, setMsisdn] = useState('50013115');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedService, setSelectedService] = useState('PAM');
  const [globalSearch, setGlobalSearch] = useState('');
  const [daIdFilter, setDaIdFilter] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [userRole, setUserRole] = useState('agentDSC'); // Default role for demo
  
  const [historyData, setHistoryData] = useState([]);
  const [rawData, setRawData] = useState({});
  
  // Refs to track matching elements
  const matchingElementsRef = useRef([]);
  const daIdInputRef = useRef(null);

  const serviceOptions = ['PAM', 'Refill', 'SMS', 'Voice', 'Data'];

  const contextMap = (ctx) => {
    if (ctx === "CAPv2_V.1.0@ericsson.com" || ctx === "CAP_V.1.0@ericsson.com") return "Voice";
    if (ctx === "SCAP_V.2.0@ericsson.com") return "SMS";
    if (ctx === "Ericsson_OCS_V1_0.0.0.10.32251@3gpp.org") return "Data";
    return ctx;
  };

  
  const formatLocationNumber = (locationNumber) => {
    if (!locationNumber || locationNumber === '-') return '-';
    
    const numStr = locationNumber.toString();
    if (numStr.startsWith('21650') || numStr.startsWith('6050')) {
      return 'NATIONAL';
    }
    return 'INTERNATIONAL';
  };


  const formatBNumber = (bNumber, role) => {
    if (!bNumber || bNumber === '-') return '-';
    
    const numStr = bNumber.toString();
    
    // If role is agentDSC, mask the number
    if (role === 'agentDSC') {
      if (numStr.length > 5) {
        // Show first 5 characters (216 + 2 digits) and replace the rest with stars
        const visiblePart = numStr.substring(0, 5);
        const maskedPart = '*'.repeat(numStr.length - 5);
        return visiblePart + maskedPart;
      }
    }
    
    // For agent IN or other roles, show the full number
    return numStr;
  };


  const parseDate = (str) => {
    const [year, month, day] = str.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00`);
  };

  const isInDateRange = (dateStr) => {
    const date = new Date(dateStr);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    if (end) end.setHours(23, 59, 59, 999);
    return (!start || date >= start) && (!end || date <= end);
  };

  const fetchData = async () => {
    try {
      const msisdnFull = msisdn.startsWith('216') ? msisdn : `216${msisdn}`;
      const response = await fetch('http://localhost:5000/history/transactionByNumber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msisdn: msisdnFull, startDate: '', endDate: '' }),
      });

      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setRawData(data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setHistoryData([]);
      return {};
    }
  };

  const filterDataByService = (data, service) => {
    if (service === 'PAM') {
      return (data.PAM || []).filter(d => isInDateRange(d.transactionDateTime));
    } else if (service === 'Refill') {
      return (data.Refill || []).filter(r => isInDateRange(r.transactionDateTime));
    } else if (service === 'Voice') {
      return (data.Usage || []).filter(entry =>
        ['0', '1'].includes(String(entry.serviceIdentifier)) &&
        entry.chargingContext === 'CAPv2_V.1.0@ericsson.com' &&
        isInDateRange(entry.transactionDateTime)
      );
    } else if (service === 'SMS') {
      return (data.Usage || []).filter(entry =>
        ['0', '1'].includes(String(entry.serviceIdentifier)) &&
        entry.chargingContext === 'SCAP_V.2.0@ericsson.com' &&
        isInDateRange(entry.transactionDateTime)
      );
    } else if (service === 'Data') {
      return (data.Usage || []).filter(entry =>
        entry.chargingContext === 'Ericsson_OCS_V1_0.0.0.10.32251@3gpp.org' &&
        isInDateRange(entry.transactionDateTime)
      );
    }
    return [];
  };

  const handleSearch = async () => {
    const data = await fetchData();
    const filtered = filterDataByService(data, selectedService);
    setHistoryData(filtered);
  };

  useEffect(() => {
    if (Object.keys(rawData).length) {
      const filtered = filterDataByService(rawData, selectedService);
      setHistoryData(filtered);
    }
  }, [selectedService]);

  const handleClear = () => {
    setMsisdn('');
    setStartDate('');
    setEndDate('');
    setSelectedService('PAM');
    setGlobalSearch('');
    setDaIdFilter('');
    setCurrentMatchIndex(0);
    setHistoryData([]);
    setRawData({});
    matchingElementsRef.current = [];
  };

  // Count total matches and update matching elements
  const countMatches = () => {
    if (!daIdFilter) return 0;
    
    let count = 0;
    const elements = [];
    
    historyData.forEach((row, rowIndex) => {
      if (row.details) {
        try {
          const parsed = typeof row.details === 'string' ? JSON.parse(row.details) : row.details;
          Object.entries(parsed).forEach(([section, entries]) => {
            if (Array.isArray(entries)) {
              entries.forEach((entry, entryIndex) => {
                Object.entries(entry).forEach(([key, val]) => {
                  if (key === 'dAId' && val.toString() === daIdFilter) {
                    count++;
                    elements.push({
                      rowIndex,
                      elementId: `daid-${rowIndex}-${section}-${entryIndex}-${key}`
                    });
                  }
                });
              });
            }
          });
        } catch (e) {
          // Invalid JSON, skip
        }
      }
    });
    
    matchingElementsRef.current = elements;
    return count;
  };

  const totalMatches = countMatches();

  // Navigate to next match
  const navigateToNextMatch = () => {
    if (totalMatches === 0) return;
    
    const nextIndex = (currentMatchIndex + 1) % totalMatches;
    setCurrentMatchIndex(nextIndex);
    
    // Scroll to the element
    const targetMatch = matchingElementsRef.current[nextIndex];
    if (targetMatch) {
      setTimeout(() => {
        const element = document.getElementById(targetMatch.elementId);
        if (element) {
          const mainContent = document.querySelector('.main-content');
          
          if (mainContent) {
            // Get element position relative to the main content
            const elementRect = element.getBoundingClientRect();
            const mainContentRect = mainContent.getBoundingClientRect();
            
            // Calculate the scroll position with a proper offset
            const offsetTop = elementRect.top - mainContentRect.top + mainContent.scrollTop;
            const targetScrollTop = offsetTop - 150; // 150px from top to keep title visible
            
            // Scroll to the calculated position
            mainContent.scrollTo({
              top: Math.max(0, targetScrollTop),
              behavior: 'smooth'
            });
          }
          
          // Add temporary highlight animation
          element.style.transition = 'all 0.3s ease';
          element.style.transform = 'scale(1.05)';
          element.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.5)';
          element.style.backgroundColor = '#ffeb3b';
          
          setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'none';
            element.style.backgroundColor = '';
          }, 800);
        }
      }, 100);
    }
  };

  // Handle Enter key press
  const handleDaIdKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigateToNextMatch();
    }
  };

  // Reset current match index when filter changes
  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [daIdFilter, historyData]);

  const exportToExcel = () => {
    console.log("Exporting Excel...");
    console.log("msisdn:", msisdn);
    console.log("selectedService:", selectedService);
    console.log("historyData:", historyData);

    if (!historyData || historyData.length === 0) {
      alert("No data to export.");
      return;
    }

    const formattedData = historyData.map((row) => ({
      DateTime: row.transactionDateTime || row.dateTime || '-',
      TransactionAmount: row.transactionAmount || '-',
      Balance: row.mainAccountBalance || row.balance || '-',
      ServiceIdentifier: row.EventType || row.serviceIdentifier || '-',
      ChargingContext: row.chargingContext || '-',
      Traffic: row.TotalVolume || row.traffic || '-',
      UsedUnits: row.duration || row.usedUnits || row.dataVolume || '-',
      BNumber_Voucher: formatBNumber(row.bNumber || row.bNumberVoucher, userRole),
      LocationNumber: formatLocationNumber(row.locationNumber) || '-',
      Details: row.details ? JSON.stringify(row.details) : 'No details',
    }));

    // Create mock Excel export for demo
    console.log("Excel data prepared:", formattedData);
    alert(`Excel export prepared with ${formattedData.length} rows`);
  };

  const highlightDaIdsInDetails = (details, daIdFilter, rowIndex) => {
    if (!details) return <span>No details available</span>;

    let parsed;
    try {
      parsed = typeof details === 'string' ? JSON.parse(details) : details;
    } catch (e) {
      return <span>Invalid JSON</span>;
    }

    const lines = [];

    Object.entries(parsed).forEach(([section, entries]) => {
      lines.push({ type: 'section', text: section });

      if (Array.isArray(entries)) {
        entries.forEach((entry, entryIndex) => {
          Object.entries(entry).forEach(([key, val]) => {
            const isMatch = key === 'dAId' && val.toString() === daIdFilter && daIdFilter;
            const elementId = isMatch ? `daid-${rowIndex}-${section}-${entryIndex}-${key}` : null;
            
            lines.push({
              type: 'line',
              text: `${key}: ${val}`,
              isDaIdLine: key === 'dAId',
              isMatch,
              elementId
            });
          });
        });
      }
    });

    return (
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>
        {lines.map((item, i) =>
          item.type === 'section' ? (
            <div key={i} style={{ fontWeight: 'bold', marginTop: '4px', textDecoration: 'underline' }}>
              {item.text}
            </div>
          ) : (
            <div
              key={i}
              id={item.elementId || undefined}
              style={{
                fontWeight: item.isDaIdLine ? 'bold' : 'normal',
                backgroundColor: item.isMatch ? '#cce5ff' : 'transparent',
                fontFamily: 'monospace',
                padding: item.isMatch ? '2px 4px' : '0',
                borderRadius: item.isMatch ? '3px' : '0',
                border: item.isMatch ? '1px solid #007bff' : 'none'
              }}
            >
              {item.text}
            </div>
          )
        )}
      </div>
    );
  };

  const filteredData = historyData.filter(row =>
    Object.values(row).some(
      val => val && val.toString().toLowerCase().includes(globalSearch.toLowerCase())
    )
  );

  console.log("✅ Filtered Data:", filteredData);

  return (
    <main className="main-content">
      <div className="msisdn-history">
        <div className="content-header">
          <div className="header-icon">
            <span>📱</span>
          </div>
          <h1>MSISDN History</h1>
        </div>

        <div className="search-section">
          <div className="search-row">
            <div className="search-field">
              <label>MSISDN :</label>
              <div className="input-group">
                <span className="country-code">+216</span>
                <input
                  type="text"
                  value={msisdn}
                  onChange={(e) => setMsisdn(e.target.value)}
                  placeholder="Enter MSISDN"
                />
              </div>
            </div>
          </div>

          <div className="search-row">
            <div className="search-field">
              <label>Début :</label>
              <div className="date-input">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Calendar className="date-icon" size={16} />
              </div>
            </div>

            <div className="search-field">
              <label>Fin :</label>
              <div className="date-input">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Calendar className="date-icon" size={16} />
              </div>
            </div>
          </div>

          <div className="search-buttons">
            <button className="btn-search" onClick={handleSearch}>
              Envoyer
            </button>
            <button className="btn-clear" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <button className="btn-excel" onClick={exportToExcel}>
              <Download size={16} />
              Excel
            </button>
            <div className="global-search">
              <label>Global Search:</label>
              <input
                type="text"
                placeholder="Search by dAId"
                value={daIdFilter}
                onChange={(e) => setDaIdFilter(e.target.value)}
                onKeyPress={handleDaIdKeyPress}
                ref={daIdInputRef}
              />
              {totalMatches > 0 && (
                <span className="match-counter">
                  {currentMatchIndex + 1} / {totalMatches}
                </span>
              )}
            </div>
          </div>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Date Time</th>
                  <th>Transaction Amount</th>
                  <th>Balance</th>
                  <th>Service Identifier</th>
                  <th>Charging Context
                    <select 
                      className="header-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      {serviceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </th>
                  <th>Traffic</th>
                  <th>Used Units</th>
                  <th>B Number / Voucher</th>
                  <th>Location Number</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length === 0 ? (
                  <tr><td colSpan="10" style={{textAlign:'center'}}>No data available</td></tr>
                ) : (
                  historyData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.transactionDateTime || row.dateTime || '-'}</td>
                      <td>{row.transactionAmount || '-'}</td>
                      <td>{row.mainAccountBalance || row.balance || '-'}</td>
                      <td>{row.EventType || row.serviceIdentifier || '-'}</td>
                      <td>{contextMap(row.chargingContext) || row.chargingContext || '-'}</td>
                      <td>{row.TotalVolume || row.traffic || '-'}</td>
                      <td>{row.duration || row.usedUnits || row.dataVolume || '-'}</td>
                      <td>{formatBNumber(row.bNumber || row.bNumberVoucher, userRole)}</td>
                      <td>{formatLocationNumber(row.locationNumber) || '-'}</td>
                      <td className="details-cell">
                        {highlightDaIdsInDetails(row.details, daIdFilter, index)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Showing {historyData.length} entr{historyData.length > 1 ? 'ies' : 'y'}</span>
            {totalMatches > 0 && (
              <span className="matches-info">
                | {totalMatches} dAId match{totalMatches > 1 ? 'es' : ''} found
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
          margin-left: 30px;
          margin-top: 0px;
          flex: 1;
          background-color: #f5f2f8;
          min-height: calc(100vh - 60px);
          max-height: calc(100vh - 60px);
          overflow-y: auto;
          transition: margin-left 0.3s ease;
          font-size: 22px;
        }

        .msisdn-history {
          background-color: #f5f5f5;
          min-height: 100%;
          padding: 20px;
          font-family: Arial, sans-serif;
          font-size: 10px;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 19px;
        }

        .header-icon {
          background: #ff6b35;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 16px;
        }

        .content-header h1 {
          color: #333;
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .search-section {
          background: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 18px;
        }

        .search-row {
          display: flex;
          gap: 40px;
          margin-bottom: 20px;
          align-items: center;
        }

        .search-row:last-of-type {
          margin-bottom: 30px;
        }

        .search-field {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 200px;
        }

        .search-field label {
          font-weight: 600;
          color: #333;
          min-width: 60px;
        }

        .input-group {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }

        .country-code {
          background: #f8f9fa;
          padding: 8px 12px;
          border-right: 1px solid #ddd;
          font-size: 20px;
          color: #666;
        }

        .input-group input {
          padding: 8px 12px;
          border: none;
          outline: none;
          min-width: 150px;
          font-size: 16px;
        }

        .date-input {
          position: relative;
          display: flex;
          align-items: center;
        }

        .date-input input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
          min-width: 150px;
          font-size: 16px;
        }

        .date-input input::-webkit-calendar-picker-indicator {
          opacity: 0;
        }

        .date-icon {
          position: absolute;
          right: 10px;
          color: #666;
          pointer-events: none;
          z-index: 1;
        }

        .search-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .btn-search {
          background: #ff6b35;
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-search:hover {
          background: #e55a2e;
        }

        .btn-clear {
          background: #333;
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-clear:hover {
          background: #555;
        }

        .table-section {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: visible;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        .btn-excel {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
        }

        .btn-excel:hover {
          background: #218838;
        }

        .global-search {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
        }

        .global-search input {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
        }

        .match-counter {
          background: #ff6b35;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          min-width: 40px;
          text-align: center;
        }

        .data-table {
          overflow-x: auto;
          max-height: none;
          overflow-y: visible;
        }

        .data-table table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        .data-table th {
          background: #ff6b35;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          font-size: 15px;
          position: sticky;
          top: 0;
          z-index: 10;
          font-size: 13px;
        }

        .header-select {
          display: block;
          width: 100%;
          background: white;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 3px;
          padding: 4px;
          margin-top: 5px;
          font-size: 14px;
        }

        .data-table td {
          padding: 8px;
          border-bottom: 1px solid #dee2e6;
          font-size: 15px;
          vertical-align: top;
        }

        .data-table tr:nth-child(even) {
          background: #f8f9fa;
        }

        .data-table tr:hover {
          background: #e9ecef;
        }

        .details-cell {
          max-width: 250px;
          min-width: 210px;

          position: relative;
        }

        .details-content {
          max-height: 80px;
          overflow-y: auto;
          white-space: pre-line;
          font-size: 15px;
          line-height: 1.3;
          background: #f8f9fa;
          padding: 4px;
          border-radius: 3px;
        }

        .table-footer {
          padding: 15px 20px;
          background: #f8f9fa;
          border-top: 1px solid #dee2e6;
          color: #666;
          font-size: 15px;
        }

        .matches-info {
          color: #ff6b35;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          
          .search-row {
            flex-direction: column;
            gap: 20px;
          }

          .search-field {
            min-width: 100%;
          }

          .table-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .data-table {
            font-size: 10px;
          }
        }

        @media (max-width: 1024px) {
          .main-content {
            margin-left: 200px;
          }
        }

        .sidebar-collapsed .main-content {
          margin-left: 60px;
        }
      `}</style>
    </main>
  );
};

export default MsisdnHistory;