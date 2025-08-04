import React, { useState } from 'react';

const Trace4GInterface = () => {
  const [msisdn, setMsisdn] = useState('53 666 692');
  const [countryCode, setCountryCode] = useState('+216');
  // Show results by default for demonstration
  const [searchResult, setSearchResult] = useState({
    imsi: '605010136850894',
    imei: '356835258918600',
    mmeCode: '32',
    mTmsi: '369851154 (#DC72CD32)',
    eNodeBName: '',
    uplinkKbps: '150000',
    downlinkKbps: '2000000',
    uplinkKbps2: '150000',
    downlinkKbps2: '2000000',
    classIdentifier: 'QCI8',
    uplinkKbps3: '150000',
    downlinkKbps3: '300000',
    apn: 'mms.otun',
    classIdentifier2: 'QCI8',
    uplinkKbps4: '150000',
    downlinkKbps4: '300000',
    apn2: 'weborange',
    uplinkKbps5: '150000',
    downlinkKbps5: '2000000',
    classIdentifier3: 'QCI8'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Format phone number with spaces
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 8 digits
    const limited = digits.slice(0, 8);
    
    // Format as XX XXX XXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(5)}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 2)} ${limited.slice(2)}`;
    } else {
      return limited;
    }
  };

  // Get clean number (without spaces) for database
  const getCleanNumber = (formattedNumber) => {
    return formattedNumber.replace(/\s/g, '');
  };

  // Check if number is valid (exactly 8 digits)
  const isValidNumber = () => {
    const cleanNumber = getCleanNumber(msisdn);
    return cleanNumber.length === 8;
  };

  const handleNumberChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setMsisdn(formatted);
  };

  // Sample data for demonstration
  const sampleResult = {
    imsi: '605010136850894',
    imei: '356835258918600',
    mmeCode: '32',
    mTmsi: '369851154 (#DC72CD32)',
    eNodeBName: '',
    uplinkKbps: '150000',
    downlinkKbps: '2000000',
    uplinkKbps2: '150000',
    downlinkKbps2: '2000000',
    classIdentifier: 'QCI8',
    uplinkKbps3: '150000',
    downlinkKbps3: '300000',
    apn: 'mms.otun',
    classIdentifier2: 'QCI8',
    uplinkKbps4: '150000',
    downlinkKbps4: '300000',
    apn2: 'weborange',
    uplinkKbps5: '150000',
    downlinkKbps5: '2000000',
    classIdentifier3: 'QCI8'
  };

  const handleEnvoyer = () => {
    if (!isValidNumber()) return;
    
    setIsLoading(true);
    const cleanNumber = getCleanNumber(msisdn);
    console.log('Sending to database:', cleanNumber); // This would be sent to database
    
    // Simulate API call
    setTimeout(() => {
      setSearchResult(sampleResult);
      setIsLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setMsisdn('');
    setSearchResult(null);
  };

  // Styles
  const containerStyle = {
    padding: '20px',
    paddingLeft: '10px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    overflowY: 'auto'
  };

  const mainContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '70px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px'
  };

  const iconStyle = {
    backgroundColor: '#ea580c',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  const searchSectionStyle = {
    padding: '30px 40px',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '50px'
  };

  const inputGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '40px'
  };

  const labelStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748'
  };

  const flagStyle = {
    width: '80px',
    height: '50px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '2px solid #cbd5e0'
  };

  const countryCodeStyle = {
    padding: '14px 18px',
    fontSize: '18px',
    border: '2px solid #cbd5e0',
    borderRadius: '6px',
    backgroundColor: '#f7fafc',
    width: '80px',
    textAlign: 'center',
    fontWeight: '600'
  };

  const inputStyle = {
    padding: '14px 20px',
    fontSize: '18px',
    border: '2px solid #cbd5e0',
    borderRadius: '6px',
    width: '220px',
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: '1px'
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  };

  const envoyerButtonStyle = {
    padding: '16px 40px',
    fontSize: '18px',
    backgroundColor: isValidNumber() ? '#f97316' : '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: isValidNumber() ? 'pointer' : 'not-allowed',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    opacity: isValidNumber() ? 1 : 0.6
  };

  const clearButtonStyle = {
    padding: '16px 40px',
    fontSize: '18px',
    backgroundColor: '#1a202c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  };

  const resultContainerStyle = {
    margin: '30px',
    border: '2px solid #2d3748',
    borderRadius: '4px',
    backgroundColor: '#f7fafc',
    fontFamily: 'monospace'
  };

  const resultContentStyle = {
    padding: '20px',
    fontSize: '16px',
    lineHeight: '2.2',
    color: '#2d3748',
    textAlign: 'center'
  };

  const redTextStyle = {
    color: '#dc2626',
    fontWeight: 'bold'
  };

  const blueTextStyle = {
    color: '#2563eb'
  };

  const renderResult = () => {
    if (!searchResult) return null;

    return (
      <div style={resultContainerStyle}>
        <div style={resultContentStyle}>
          <div style={{ marginBottom: '8px' }}>
            <span style={blueTextStyle}>IMSI</span>
            <span style={{ marginLeft: '60px' }}>: {searchResult.imsi}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={blueTextStyle}>IMEI</span>
            <span style={{ marginLeft: '60px' }}>: {searchResult.imei}</span>
          </div>
          <div style={{ marginLeft: '80px', marginBottom: '8px' }}>
            <span>MME Code</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.mmeCode}</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={redTextStyle}>M-TMSI</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.mTmsi}</span>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <span>eNodeB Name</span>
            <span style={{ marginLeft: '80px' }}>:</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>uplink (kbps)</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.uplinkKbps}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>downlink (kbps)</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.downlinkKbps}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>uplink (kbps)</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.uplinkKbps2}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>downlink (kbps)</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.downlinkKbps2}</span>
          </div>
          <div style={{ marginLeft: '40px', marginBottom: '8px' }}>
            <span>class identifier</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.classIdentifier}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>uplink (kbps)</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.uplinkKbps3}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>downlink (kbps)</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.downlinkKbps3}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span>APN</span>
            <span style={{ marginLeft: '100px' }}>: {searchResult.apn}</span>
          </div>
          <div style={{ marginLeft: '40px', marginBottom: '8px' }}>
            <span>class identifier</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.classIdentifier2}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>uplink (kbps)</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.uplinkKbps4}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '16px' }}>
            <span>downlink (kbps)</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.downlinkKbps4}</span>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <span>APN</span>
            <span style={{ marginLeft: '100px' }}>: {searchResult.apn2}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>uplink (kbps)</span>
            <span style={{ marginLeft: '40px' }}>: {searchResult.uplinkKbps5}</span>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
            <span>downlink (kbps)</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.downlinkKbps5}</span>
          </div>
          <div style={{ marginLeft: '40px' }}>
            <span>class identifier</span>
            <span style={{ marginLeft: '32px' }}>: {searchResult.classIdentifier3}</span>
          </div>
        </div>
      </div>
    );
  };

  // Table data for search results
  const [tableData] = useState([
    { 
      timestamp: '2024-07-15 14:30:22',
      msisdn: '21653666692',
      imsi: '605010136850894',
      mTmsi: '369851154',
      status: 'Active',
      location: 'Tunis-Centre'
    },
    { 
      timestamp: '2024-07-15 14:25:18',
      msisdn: '21653666692',
      imsi: '605010136850894',
      mTmsi: '369851154',
      status: 'Connected',
      location: 'Tunis-Centre'
    },
    { 
      timestamp: '2024-07-15 14:20:45',
      msisdn: '21653666692',
      imsi: '605010136850894',
      mTmsi: '369851154',
      status: 'Handover',
      location: 'Tunis-Nord'
    }
  ]);

  const [tableState, setTableState] = useState({
    entries: 10,
    search: '',
    page: 1,
    filteredData: [],
    filters: { timestamp: '', msisdn: '', imsi: '', mTmsi: '', status: '', location: '' }
  });

  // Table styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    borderRight: '1px solid #ea580c'
  };

  const tdStyle = {
    padding: '10px 12px',
    fontSize: '14px',
    borderBottom: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb'
  };

  const renderTable = () => {
    return (
      <div style={{ margin: '30px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#374151' }}>Search Results History</h3>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>MSISDN</th>
              <th style={thStyle}>IMSI</th>
              <th style={thStyle}>M-TMSI</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, borderRight: 'none' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white' }}>
                <td style={tdStyle}>{row.timestamp}</td>
                <td style={tdStyle}>{row.msisdn}</td>
                <td style={tdStyle}>{row.imsi}</td>
                <td style={tdStyle}>{row.mTmsi}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    backgroundColor: row.status === 'Active' ? '#10b981' : row.status === 'Connected' ? '#3b82f6' : '#f59e0b',
                    color: 'white'
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ ...tdStyle, borderRight: 'none' }}>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination for table */}
        <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Showing 1 to {tableData.length} of {tableData.length} entries
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button style={{ padding: '6px 12px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f97316', color: 'white' }}>
              1
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{... containerStyle, height: '100vh', overflowY: 'auto' }}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={iconStyle}>📡</div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Trace 4G</h2>
        </div>

        {/* Search Section */}
        <div style={searchSectionStyle}>
          <h1 style={titleStyle}>M-TMSI search for LTE</h1>
          
          <div style={inputGroupStyle}>
            <span style={labelStyle}>MSISDN :</span>
            <div style={flagStyle}>
              <img 
                src="/assets/tunisia_flag.webp" 
                alt="Tunisia Flag" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '4px'
                }} 
              />
            </div>
            <input
              type="text"
              value={countryCode}
              style={countryCodeStyle}
              readOnly
            />
            <input
              type="text"
              value={msisdn}
              onChange={handleNumberChange}
              style={inputStyle}
              placeholder="XX XXX XXX"
              maxLength="10"
            />
          </div>

          <div style={buttonGroupStyle}>
            <button
              onClick={handleEnvoyer}
              style={envoyerButtonStyle}
              disabled={!isValidNumber() || isLoading}
            >
              {isLoading ? 'Searching...' : 'Envoyer'}
            </button>
            <button
              onClick={handleClear}
              style={clearButtonStyle}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        {renderResult()}
        {renderTable()}
      </div>
    </div>
  );
};

export default Trace4GInterface;