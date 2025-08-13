import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MSISDNContent = () => {
  const [msisdn, setMsisdn] = useState('56005443');
  const [showFafCug, setShowFafCug] = useState(false);
  const [searchResults, setSearchResults] = useState({
    subscriberNumber: '21656005443',
    serviceClass: '14 ( EDAWA5 )',
    activationDate: '2025-04-18 12:00',
    balance: '0.005 DT',
    serviceFee: '2037-12-31 12:00',
    status: 'Active',
    barringStatus: '',
    supervisionFee: '2037-12-31 12:00',
    serviceRemoval: '2037-12-31 12:00',
    fafData: {
      fafNumbers: ['21698765432', '21687654321', '21676543210'],
      activationDate: '2025-04-18',
      status: 'Active'
    },
    cugData: {
      communityId: 'CUG_001234',
      groupName: 'Corporate Group A',
      memberCount: 15,
      activationDate: '2025-04-18',
      status: 'Active'
    }
  });

  const [activeTab, setActiveTab] = useState('Dedicated Accounts');
  const [globalSearch, setGlobalSearch] = useState('');

  const tabs = [
    'Dedicated Accounts',
    'Accumulator',
    'Offer',
    'Usage Thresholds/Counters'
  ];

  const tableData = [
    { id: '17', value: '0', expiryDate: '9999-12-31 00:00', description: 'Initial Credits' },
    { id: '24', value: '2', expiryDate: '9999-12-31 00:00', description: 'Remboursement SOS' },
    { id: '51', value: '0', expiryDate: '9999-12-31 00:00', description: 'Service padock recharge 7jrs' },
    { id: '182', value: '0', expiryDate: '9999-12-31 00:00', description: '' }
  ];

  const handleSearch = () => {
    console.log('Searching for MSISDN:', msisdn);
  };

  const handleClear = () => {
    setMsisdn('');
    setShowFafCug(false);
    setSearchResults({
      subscriberNumber: '',
      serviceClass: '',
      activationDate: '',
      balance: '',
      serviceFee: '',
      status: '',
      barringStatus: '',
      supervisionFee: '',
      serviceRemoval: '',
      fafData: null,
      cugData: null
    });
  };

  const toggleFafCug = () => {
    setShowFafCug(!showFafCug);
  };

  return (
    <div className="msisdn-content" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="content-header">
        <div className="header-icon">
          <span>📱</span>
        </div>
        <h1>MSISDN Information</h1>
      </div>

      <div className="search-section">
        <div className="search-field">
          <label>MSISDN :</label>
          <div className="search-input-group">
            <div className="country-code">
              <span className="flag">🇹🇳</span>
              <span>+216</span>
            </div>
            <input
              type="text"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              placeholder="Enter MSISDN"
            />
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

      {/* THREE SEPARATE BOXES */}
      <div className="boxes-container">
        <div className="main-boxes">
          {/* BOX 1: SUB NUMBER */}
          <div className="single-box">
            <div className="box-header">SUB NUMBER</div>
            <div className="box-body">
              <div className="info-row">
                <span className="info-label">SUB NUMBER:</span>
                <span className="info-value">{searchResults.subscriberNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">SC OFFRE:</span>
                <span className="info-value">{searchResults.serviceClass}</span>
              </div>
              <div className="info-row">
                <span className="info-label">STATUS ON:</span>
                <span className="info-value">{searchResults.activationDate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Barring Status:</span>
                <span className="info-value">{searchResults.barringStatus}</span>
              </div>
            </div>
          </div>

          {/* BOX 2: DATE */}
          <div className="single-box">
            <div className="box-header">DATE</div>
            <div className="box-body">
              <div className="info-row">
                <span className="info-label">Service Fee:</span>
                <span className="info-value">{searchResults.serviceFee}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`info-value status-${searchResults.status.toLowerCase()}`}>
                  {searchResults.status}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Supervision Fee:</span>
                <span className="info-value">{searchResults.supervisionFee}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Service Removal:</span>
                <span className="info-value">{searchResults.serviceRemoval}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          {/* BOX 3: SOLDE */}
          <div className="single-box solde-box">
            <div className="box-header">SOLDE</div>
            <div className="box-body">
              <div className="balance-section">
                <div className="balance-amount">{searchResults.balance}</div>
              </div>
              {(searchResults.fafData || searchResults.cugData) && (
                <button className="faf-cug-btn" onClick={toggleFafCug}>
                  {showFafCug ? 'Hide' : 'Reveal'} FAF & Community ID
                </button>
              )}
            </div>
          </div>

          {/* FAF & CUG Container */}
          {showFafCug && (searchResults.fafData || searchResults.cugData) && (
            <div className="faf-cug-container">
              <div className="box-header">FAF & COMMUNITY ID</div>
              <div className="box-body faf-cug-body">
                {searchResults.fafData && (
                  <div className="faf-section">
                    <h4 className="section-title">FAF Numbers</h4>
                    <div className="faf-numbers">
                      {searchResults.fafData.fafNumbers.map((number, index) => (
                        <div key={index} className="faf-number">{number}</div>
                      ))}
                    </div>
                    <div className="faf-info">
                      <span className="info-small">Status: {searchResults.fafData.status}</span>
                    </div>
                  </div>
                )}
                
                {searchResults.cugData && (
                  <div className="cug-section">
                    <h4 className="section-title">Community Group</h4>
                    <div className="info-row-small">
                      <span className="info-label-small">ID:</span>
                      <span className="info-value-small">{searchResults.cugData.communityId}</span>
                    </div>
                    <div className="info-row-small">
                      <span className="info-label-small">Group:</span>
                      <span className="info-value-small">{searchResults.cugData.groupName}</span>
                    </div>
                    <div className="info-row-small">
                      <span className="info-label-small">Members:</span>
                      <span className="info-value-small">{searchResults.cugData.memberCount}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tabs-section">
        <div className="tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="table-header">
            <div className="global-search">
              <label>Global Search:</label>
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>DA ID</th>
                  <th>Value</th>
                  <th>Expiry Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.value}</td>
                    <td>{row.expiryDate}</td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Showing 1 to 4 of 4 entries</span>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>© 2025 SIMTRACK. All Rights Reserved | Design by: ODC</p>
      </div>

      <style jsx>{`
        .msisdn-content {
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
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
          font-size: 18px;
          font-weight: 600;
        }

        .search-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-field {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-field label {
          font-weight: 600;
          color: #333;
        }

        .search-input-group {
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
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }

        .search-input-group input {
          padding: 8px 12px;
          border: none;
          outline: none;
          min-width: 150px;
        }

        .search-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-search {
          background: #ff6b35;
          color: white;
          border: none;
          padding: 8px 20px;
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
          padding: 8px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-clear:hover {
          background: #555;
        }

        /* BOXES CONTAINER STYLING */
        .boxes-container {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .main-boxes {
          display: flex;
          gap: 15px;
          flex: 2;
        }

        .right-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .single-box {
          background: white;
          border: 2px solid #333;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          flex: 1;
        }

        .solde-box {
          min-height: 140px;
        }

        .box-header {
          background: #ff6b35;
          color: white;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          border-radius: 4px 4px 0 0;
        }

        .box-body {
          padding: 15px;
          height: calc(100% - 44px);
          display: flex;
          flex-direction: column;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 15px;
        }

        .info-label {
          font-weight: bold;
          color: #333;
        }

        .info-value {
          color: #666;
        }

        .status-active {
          color: #28a745;
          font-weight: bold;
        }

        .balance-section {
          text-align: center;
          margin: 10px 0;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .balance-amount {
          font-size: 20px;
          font-weight: bold;
          color: #ff6b35;
        }

        .faf-cug-btn {
          background: #ff6b35;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          width: 100%;
          transition: background 0.3s ease;
        }

        .faf-cug-btn:hover {
          background: #e55a2e;
        }

        /* FAF & CUG Container */
        .faf-cug-container {
          background: white;
          border: 2px solid #333;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faf-cug-body {
          padding: 12px;
          max-height: 200px;
          overflow-y: auto;
        }

        .section-title {
          margin: 0 0 8px 0;
          font-size: 13px;
          font-weight: bold;
          color: #ff6b35;
          border-bottom: 1px solid #eee;
          padding-bottom: 4px;
        }

        .faf-section, .cug-section {
          margin-bottom: 15px;
        }

        .faf-section:last-child, .cug-section:last-child {
          margin-bottom: 0;
        }

        .faf-numbers {
          margin-bottom: 8px;
        }

        .faf-number {
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 12px;
          margin-bottom: 3px;
          border: 1px solid #e9ecef;
        }

        .info-row-small {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 12px;
        }

        .info-label-small {
          font-weight: bold;
          color: #333;
        }

        .info-value-small {
          color: #666;
        }

        .info-small {
          font-size: 12px;
          color: #28a745;
          font-weight: 500;
        }

        .tabs-section {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .tabs-header {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        .tab {
          padding: 12px 20px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .tab.active {
          background: white;
          border-bottom-color: #ff6b35;
          color: #ff6b35;
          font-weight: 600;
        }

        .tab:hover {
          background: #e9ecef;
        }

        .tab-content {
          padding: 20px;
        }

        .table-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 15px;
        }

        .global-search {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .global-search input {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
        }

        .data-table {
          overflow-x: auto;
        }

        .data-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #ff6b35;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }

        .data-table td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
        }

        .data-table tr:nth-child(even) {
          background: #f8f9fa;
        }

        .data-table tr:hover {
          background: #e9ecef;
        }

        .table-footer {
          margin-top: 15px;
          color: #666;
          font-size: 14px;
        }

        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .search-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-field {
            flex-direction: column;
            align-items: stretch;
          }

          .boxes-container {
            flex-direction: column;
          }

          .main-boxes {
            flex-direction: column;
          }

          .tabs-header {
            flex-wrap: wrap;
          }

          .tab {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default MSISDNContent;