import React, { useState, useEffect, useRef } from 'react';
import { Download, Calendar, Loader } from 'lucide-react';
import * as XLSX from 'xlsx';

const MsisdnHistory = () => {
  const [msisdn, setMsisdn] = useState('50013115');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [globalSearch, setGlobalSearch] = useState('');
  const [daIdFilter, setDaIdFilter] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [userRole, setUserRole] = useState('agentDSC'); // Default role for demo
  const [isLoading, setIsLoading] = useState(false);

  const [historyData, setHistoryData] = useState([]);
  const [rawData, setRawData] = useState({});
  const [lastFetchedMsisdn, setLastFetchedMsisdn] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Refs to track matching elements
  const matchingElementsRef = useRef([]);
  const daIdInputRef = useRef(null);

  const serviceOptions = ['All', 'PAM', 'Adjustment', 'Refill', 'SMS', 'Voice', 'Data'];

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

  // New function to format the Used Units column with two fields
  const formatUsedUnits = (row) => {
    const paymentProfile = row.paymentProfile || '';
    const originNodeId = row.originNodeId || '';
    const duration = row.duration || '';
    const usedUnits = row.usedUnits || '';
    const dataVolume = row.dataVolume || '';

    // If we have duration, usedUnits, or dataVolume, show them along with the two new fields
    const primaryValue = duration || usedUnits || dataVolume || '-';

    return {
      primaryValue,
      paymentProfile,
      originNodeId
    };
  };

  // New function to format B Number section with fallback fields
  const formatBNumberSection = (row, role) => {
    const bNumber = row.bNumber || row.bNumberVoucher;

    if (bNumber && bNumber !== '-') {
      return {
        primaryValue: formatBNumber(bNumber, role),
        activationCode: null,
        voucherSerialNumber: null
      };
    }

    // If no B Number, show activation code and voucher serial number
    const activationCode = row.activationCode || '';
    const voucherSerialNumber = row.voucherSerialNumber || '';

    return {
      primaryValue: '-',
      activationCode,
      voucherSerialNumber
    };
  };

  const parseDate = (str) => {
    const [year, month, day] = str.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const isInDateRange = (dateStr) => {
    if (!dateStr) return true; // If no date, include it
    
    try {
      const date = new Date(dateStr);
      const start = startDate ? parseDate(startDate) : null;
      const end = endDate ? parseDate(endDate) : null;

      if (end) end.setHours(23, 59, 59, 999);
      return (!start || date >= start) && (!end || date <= end);
    } catch (error) {
      console.warn('Invalid date format:', dateStr);
      return true; // Include invalid dates to avoid losing data
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const msisdnFull = msisdn.startsWith('216') ? msisdn : `216${msisdn}`;
      console.log('🔍 Fetching data for MSISDN:', msisdnFull);
      
      const response = await fetch(`${API_URL}/history/transactionByNumber`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          msisdn: msisdnFull, 
          startDate: startDate || '', 
          endDate: endDate || '' 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Raw data received:', data);
      
      // Store the raw data and the MSISDN used to fetch it
      setRawData(data);
      setLastFetchedMsisdn(msisdnFull);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setHistoryData([]);
      return {};
    } finally {
      setIsLoading(false);
    }
  };

  const filterDataByService = (data, service) => {
    console.log('🔄 Filtering data by service:', service);
    console.log('🔄 Available data keys:', Object.keys(data));
    
    let filtered = [];
    
    try {
      if (service === 'All') {
        // Combine all data from PAM, Adjustment, Refill, and Usage (Voice, SMS, Data)
        const pamData = (data.PAM || []).filter(d => isInDateRange(d.transactionDateTime));
        const adjustmentData = (data.SDPAdjustment || []).filter(l => isInDateRange(l.transactionDateTime));
        const refillData = (data.Refill || []).filter(r => isInDateRange(r.transactionDateTime));
        const usageData = (data.Usage || []).filter(entry => isInDateRange(entry.transactionDateTime));
        
        // Concatenate all arrays
        filtered = [...pamData, ...adjustmentData, ...refillData, ...usageData];
      } else if (service === 'PAM') {
        filtered = (data.PAM || []).filter(d => {
          const inRange = isInDateRange(d.transactionDateTime);
          return inRange;
        });
      } else if (service === 'Adjustment') {
        filtered = (data.SDPAdjustment || []).filter(l => {
          const inRange = isInDateRange(l.transactionDateTime);
          return inRange;
        });
      } else if (service === 'Refill') {
        filtered = (data.Refill || []).filter(r => {
          const inRange = isInDateRange(r.transactionDateTime);
          return inRange;
        });
      } else if (service === 'Voice') {
        filtered = (data.Usage || []).filter(entry => {
          const isVoice = ['0', '1'].includes(String(entry.serviceIdentifier)) &&
            entry.chargingContext === 'CAPv2_V.1.0@ericsson.com';
          const inRange = isInDateRange(entry.transactionDateTime);
          return isVoice && inRange;
        });
      } else if (service === 'SMS') {
        filtered = (data.Usage || []).filter(entry => {
          const isSMS = entry.chargingContext === 'SCAP_V.2.0@ericsson.com';
          const inRange = isInDateRange(entry.transactionDateTime);
          return isSMS && inRange;
        });
      } else if (service === 'Data') {
        filtered = (data.Usage || []).filter(entry => {
          const isData = entry.chargingContext === 'Ericsson_OCS_V1_0.0.0.10.32251@3gpp.org';
          const inRange = isInDateRange(entry.transactionDateTime);
          return isData && inRange;
        });
      }
      
      console.log('✅ Filtered results:', filtered.length, 'items');
      return filtered;
    } catch (error) {
      console.error('❌ Error filtering data:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    console.log('🚀 Starting search...');
    // Clear existing data immediately when starting a new search
    setHistoryData([]);
    setRawData({});
    
    const data = await fetchData();
    if (Object.keys(data).length > 0) {
      const filtered = filterDataByService(data, selectedService);
      setHistoryData(filtered);
      console.log('✅ Search completed. History data set:', filtered.length, 'items');
    }
  };

  // Only filter when service changes, but keep existing data
  useEffect(() => {
    console.log('🔄 Service or date filter changed:', selectedService);
    if (Object.keys(rawData).length > 0) {
      const filtered = filterDataByService(rawData, selectedService);
      setHistoryData(filtered);
      console.log('✅ Data re-filtered:', filtered.length, 'items');
    }
  }, [selectedService, startDate, endDate]); // Added startDate and endDate as dependencies

  // Separate useEffect for rawData changes to avoid conflicts
  useEffect(() => {
    if (Object.keys(rawData).length > 0) {
      const filtered = filterDataByService(rawData, selectedService);
      setHistoryData(filtered);
      console.log('✅ Raw data processed:', filtered.length, 'items');
    }
  }, [rawData]);

  const handleClear = () => {
    console.log('🧹 Clearing all data...');
    setMsisdn('');
    setStartDate('');
    setEndDate('');
    setSelectedService('PAM');
    setGlobalSearch('');
    setDaIdFilter('');
    setCurrentMatchIndex(0);
    setHistoryData([]);
    setRawData({});
    setLastFetchedMsisdn('');
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
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });

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

    // Prepare the data for Excel export
    const formattedData = historyData.map((row, index) => {
      const usedUnitsData = formatUsedUnits(row);
      const bNumberData = formatBNumberSection(row, userRole);

      // Format Used Units column
      let usedUnitsStr = usedUnitsData.primaryValue !== '-' ? usedUnitsData.primaryValue : '';
      const usedUnitsSecondaryParts = [];
      if (usedUnitsData.paymentProfile) {
        usedUnitsSecondaryParts.push(`PaymentProfile: ${usedUnitsData.paymentProfile}`);
      }
      if (usedUnitsData.originNodeId) {
        usedUnitsSecondaryParts.push(`OriginNodeId: ${usedUnitsData.originNodeId}`);
      }
      if (usedUnitsSecondaryParts.length > 0) {
        usedUnitsStr += (usedUnitsStr ? ' | ' : '') + usedUnitsSecondaryParts.join(' | ');
      }
      if (!usedUnitsStr) {
        usedUnitsStr = '-';
      }

      // Format B Number column
      let bNumberStr = '';
      if (bNumberData.primaryValue !== '-') {
        bNumberStr = bNumberData.primaryValue;
      }
      const bNumberSecondaryParts = [];
      if (bNumberData.activationCode) {
        bNumberSecondaryParts.push(`ActivationCode: ${bNumberData.activationCode}`);
      }
      if (bNumberData.voucherSerialNumber) {
        bNumberSecondaryParts.push(`VoucherSerial: ${bNumberData.voucherSerialNumber}`);
      }
      if (bNumberSecondaryParts.length > 0) {
        bNumberStr += (bNumberStr ? ' | ' : '') + bNumberSecondaryParts.join(' | ');
      }
      if (!bNumberStr) {
        bNumberStr = '-';
      }

      // Format Details column
      let detailsStr = '';
      let parsedDetails = {};
      if (row.details) {
        try {
          parsedDetails = typeof row.details === 'string' ? JSON.parse(row.details) : row.details;
        } catch (e) {
          detailsStr += 'Invalid JSON in details';
        }
      }

      if (selectedService === 'Adjustment') {
        if (row.service && row.service !== '-') {
          detailsStr += `service: ${row.service}\n`;
        }
        if (row.serviceCode && row.serviceCode !== '-') {
          detailsStr += `serviceCode: ${row.serviceCode}\n`;
        }
      }
      
      if (row.segmentationId && row.segmentationId !== '-') {
        detailsStr += `segmentationId: ${row.segmentationId}\n`;
      }
      
      if (Object.keys(parsedDetails).length > 0) {
        detailsStr += JSON.stringify(parsedDetails, null, 2);
      }

      return {
        DateTime: row.transactionDateTime || row.dateTime || '-',
        TransactionAmount: row.transactionAmount || '-',
        Balance: row.mainAccountBalance || row.balance || '-',
        ServiceIdentifier: selectedService === 'Adjustment' ? '-' : (row.EventType || row.serviceIdentifier || '-'),
        ChargingContext: selectedService === 'Adjustment' ? '-' : (contextMap(row.chargingContext) || row.chargingContext || row.service || '-'),
        Traffic: row.TotalVolume || row.traffic || '-',
        UsedUnits: usedUnitsStr,
        BNumber_Voucher: bNumberStr,
        LocationNumber: formatLocationNumber(row.locationNumber) || '-',
        Details: detailsStr || 'No details',
      };
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    
    // Auto-size columns
    const colWidths = [];
    const headers = Object.keys(formattedData[0] || {});
    headers.forEach((header, i) => {
      const maxLength = Math.max(
        header.length,
        ...formattedData.map(row => (row[header] || '').toString().length)
      );
      colWidths[i] = { wch: Math.min(maxLength + 2, 50) }; // Cap at 50 characters
    });
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, selectedService);
    
    // Generate filename with dates if available
    let filename = `MSISDN_History_${selectedService}_${msisdn}`;
    if (startDate && endDate) {
      filename += `_${startDate}_to_${endDate}`;
    } else if (startDate) {
      filename += `_from_${startDate}`;
    } else if (endDate) {
      filename += `_until_${endDate}`;
    }
    filename += '.xlsx';
    
    // Download the file
    XLSX.writeFile(wb, filename);
    
    console.log("Excel file exported successfully:", filename);
  };

  const highlightDaIdsInDetails = (details, daIdFilter, rowIndex, row, selectedService) => {
    const lines = [];

    // Check for 'service' and 'serviceCode' on the main row object for 'Adjustment' service
    if (selectedService === 'Adjustment') {
      if (row.service && row.service !== '-') {
        lines.push({
          type: 'line',
          text: `service: ${row.service}`,
          isDaIdLine: false,
          isMatch: false,
          elementId: null
        });
      }
      if (row.serviceCode && row.serviceCode !== '-') {
        lines.push({
          type: 'line',
          text: `serviceCode: ${row.serviceCode}`,
          isDaIdLine: false,
          isMatch: false,
          elementId: null
        });
      }

      if (lines.length > 0) {
        lines.push({ type: 'separator' });
      }
    }

    if (row.segmentationId && row.segmentationId !== '-') {
      lines.push({
        type: 'line',
        text: `segmentationId: ${row.segmentationId}`,
        isDaIdLine: false,
        isMatch: false,
        elementId: null
      });
    }

    // Now, process the actual JSON details field if it exists
    let parsedDetails = {};
    if (details) {
      try {
        parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
      } catch (e) {
        lines.push({ type: 'line', text: 'Invalid JSON in details', isDaIdLine: false, isMatch: false, elementId: null });
      }
    }

    if (Object.keys(parsedDetails).length > 0) {
      Object.entries(parsedDetails).forEach(([section, entries]) => {
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
        } else {
          lines.push({ type: 'line', text: `${section}: ${parsedDetails[section]}`, isDaIdLine: false, isMatch: false, elementId: null});
        }
      });
    }

    // If no data to show
    if (lines.length === 0) {
      return <span>---</span>;
    }

    return (
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>
        {lines.map((item, i) => {
          if (item.type === 'section') {
            return (
              <div key={i} style={{ fontWeight: 'bold', marginTop: '4px', textDecoration: 'underline' }}>
                {item.text}
              </div>
            );
          } else if (item.type === 'separator') {
            return (
              <div key={i} style={{
                borderTop: '1px solid #ccc',
                margin: '4px 0',
                height: '1px'
              }}></div>
            );
          } else {
            return (
              <div
                key={i}
                id={item.elementId || undefined}
                style={{
                  fontWeight: item.isDaIdLine ? 'bold' : 'normal',
                  backgroundColor: item.isMatch ? '#cce5ff' : 'transparent',
                  fontFamily: 'monospace',
                  padding: item.isMatch ? '2px 4px' : '0',
                  borderRadius: item.isMatch ? '3px' : '0',
                  border: item.isMatch ? '1px solid #007bff' : 'none',
                  fontSize: '12px',
                  lineHeight: '1.4'
                }}
              >
                {item.text}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const filteredData = historyData.filter(row =>
    Object.values(row).some(
      val => val && val.toString().toLowerCase().includes(globalSearch.toLowerCase())
    )
  );

  console.log("✅ Current History Data Length:", historyData.length);
  console.log("✅ Current Selected Service:", selectedService);
  console.log("✅ Filtered Data:", filteredData);

  return (
    <div className="main-content">
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
            <button className="btn-search" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="spinner" size={16} />
                  Loading...
                </>
              ) : (
                'Envoyer'
              )}
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
                  {`${currentMatchIndex + 1} / ${totalMatches}`}
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
                {isLoading ? (
                  <tr>
                    <td colSpan="10" className="loading-cell">
                      <div className="loading-container">
                        <Loader className="loading-spinner" size={24} />
                        <span style={{ marginLeft: '10px', fontSize: '16px' }}>Loading data...</span>
                      </div>
                    </td>
                  </tr>
                ) : historyData.length === 0 ? (
                  <tr><td colSpan="10" style={{ textAlign: 'center' }}>No data available</td></tr>
                ) : (
                  historyData.map((row, index) => {
                    const usedUnitsData = formatUsedUnits(row);
                    const bNumberData = formatBNumberSection(row, userRole);

                    return (
                      <tr key={index}>
                        <td>{row.transactionDateTime || row.dateTime || '-'}</td>
                        <td>{row.transactionAmount || '-'}</td>
                        <td>{row.mainAccountBalance || row.balance || '-'}</td>
                        <td>{selectedService === 'Adjustment' ? '-' : (row.EventType || row.serviceIdentifier || row.serviceCode || '-')}</td>
                        <td>{selectedService === 'Adjustment' ? '-' : (contextMap(row.chargingContext) || row.chargingContext || row.service || '-')}</td>
                        <td>{row.TotalVolume || row.traffic || '-'}</td>
                        <td className="used-units-cell">
                          <div className="used-units-container">
                            {usedUnitsData.primaryValue !== '-' && (
                              <div className="primary-value">{usedUnitsData.primaryValue}</div>
                            )}
                            {(usedUnitsData.paymentProfile || usedUnitsData.originNodeId) && (
                              <div className="secondary-values">
                                {usedUnitsData.paymentProfile && (
                                  <div className="payment-profile">
                                    <span className="label">Payment:</span> {usedUnitsData.paymentProfile}
                                  </div>
                                )}
                                {usedUnitsData.originNodeId && (
                                  <div className="origin-node">
                                    <span className="label">Origin:</span> {usedUnitsData.originNodeId}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="bnumber-cell">
                          <div className="bnumber-container">
                            {bNumberData.primaryValue !== '-' && (
                              <div className="primary-value">{bNumberData.primaryValue}</div>
                            )}
                            {(bNumberData.activationCode || bNumberData.voucherSerialNumber) && (
                              <div className="secondary-values">
                                {bNumberData.activationCode && (
                                  <div className="activation-code">
                                    <span className="label">Activation:</span> {bNumberData.activationCode}
                                  </div>
                                )}
                                {bNumberData.voucherSerialNumber && (
                                  <div className="voucher-serial">
                                    <span className="label">Serial:</span> {bNumberData.voucherSerialNumber}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{formatLocationNumber(row.locationNumber) || '-'}</td>
                        <td className="details-cell">
                          {highlightDaIdsInDetails(row.details, daIdFilter, index, row, selectedService)}
                        </td>
                      </tr>
                    );
                  })
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

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
          color: #ff6b35;
        }

        .loading-cell {
          text-align: center;
          padding: 40px;
        }

        .btn-search:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-search:disabled:hover {
          background: #ff6b35;
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
          display: flex;
          align-items: center;
          gap: 8px;
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

        .used-units-cell {
          min-width: 150px;
          max-width: 200px;
        }

        .bnumber-cell {
          min-width: 140px;
          max-width: 180px;
        }

        .used-units-container,
        .bnumber-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .primary-value {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .secondary-values {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .payment-profile,
        .origin-node,
        .activation-code,
        .voucher-serial {
          font-size: 12px;
          color: #666;
          background: #f8f9fa;
          padding: 2px 4px;
          border-radius: 3px;
          border-left: 3px solid #ff6b35;
        }

        .payment-profile .label,
        .origin-node .label,
        .activation-code .label,
        .voucher-serial .label {
          font-weight: 600;
          color: #333;
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

          .used-units-container {
            font-size: 10px;
          }

          .bnumber-container {
            font-size: 10px;
          }

          .payment-profile,
          .origin-node,
          .activation-code,
          .voucher-serial {
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
    </div>
  );
};

export default MsisdnHistory;