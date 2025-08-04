import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MSISDNContent = () => {
  const [msisdn, setMsisdn] = useState('56005443');
  const [searchResults, setSearchResults] = useState({
    subscriberNumber: '21656005443',
    serviceClass: '14 ( EDAWA5 )',
    activationDate: '2025-04-18 12:00',
    balance: '0.005 DT',
    serviceFee: '2037-12-31 12:00',
    status: 'Active',
    barringStatus: '',
    supervisionFee: '2037-12-31 12:00',
    serviceRemoval: '2037-12-31 12:00'
  });

  const [activeTab, setActiveTab] = useState('Dedicated Accounts');
  const [globalSearch, setGlobalSearch] = useState('');

  const tabs = [
    'Dedicated Accounts',
    'Accumulator',
    'Offer',
    'FAF',
    'Community ID',
    'Usage Thresholds/Counters'
  ];

  const tableData = [
    { id: '17', value: '0', expiryDate: '9999-12-31 00:00', description: 'Initial Credits' },
    { id: '24', value: '2', expiryDate: '9999-12-31 00:00', description: 'Remboursement SOS' },
    { id: '51', value: '0', expiryDate: '9999-12-31 00:00', description: 'Service padock recharge 7jrs' },
    { id: '182', value: '0', expiryDate: '9999-12-31 00:00', description: '' }
  ];

  const handleSearch = () => {
    // Simulate search functionality
    console.log('Searching for MSISDN:', msisdn);
  };

  const handleClear = () => {
    setMsisdn('');
    setSearchResults({
      subscriberNumber: '',
      serviceClass: '',
      activationDate: '',
      balance: '',
      serviceFee: '',
      status: '',
      barringStatus: '',
      supervisionFee: '',
      serviceRemoval: ''
    });
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

      <div className="info-panel">
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Subscriber Number :</span>
            <span className="value">{searchResults.subscriberNumber}</span>
          </div>
          <div className="info-item">
            <span className="label">Service Class :</span>
            <span className="value">{searchResults.serviceClass}</span>
          </div>
          <div className="info-item">
            <span className="label">Activation Date :</span>
            <span className="value">{searchResults.activationDate}</span>
          </div>
          <div className="info-item">
            <span className="label">Balance :</span>
            <span className="value">{searchResults.balance}</span>
          </div>
          <div className="info-item">
            <span className="label">Service Fee Period :</span>
            <span className="value">{searchResults.serviceFee}</span>
          </div>
          <div className="info-item">
            <span className="label">Status :</span>
            <span className={`value status-${searchResults.status.toLowerCase()}`}>
              {searchResults.status}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Barring Status :</span>
            <span className="value">{searchResults.barringStatus}</span>
          </div>
          <div className="info-item">
            <span className="label">Supervision Fee Period :</span>
            <span className="value">{searchResults.supervisionFee}</span>
          </div>
          <div className="info-item">
            <span className="label">Service Removal :</span>
            <span className="value">{searchResults.serviceRemoval}</span>
          </div>
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
        <p>© 2023 MINSAT. All Rights Reserved | Design by: ODC</p>
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

        .info-panel {
          background: white;
          border: 2px solid #ff6b35;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 4px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item .label {
          font-weight: 600;
          color: #333;
        }

        .info-item .value {
          color: #555;
        }

        .status-active {
          color: #28a745;
          font-weight: 600;
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

          .info-grid {
            grid-template-columns: 1fr;
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