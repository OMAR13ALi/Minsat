import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const MSISDNContent = () => {
  const [msisdn, setMsisdn] = useState("50123456");
  const [showFafCug, setShowFafCug] = useState(false);
  const [searchResults, setSearchResults] = useState({
    subscriberNumber: '21650123456',
    serviceClass: 'Premium',
    activationDate: '2023-01-15',
    balance: '45.75 TND',
    serviceFee: '2024-01-15',
    status: 'Active',
    barringStatus: 'NO BARRING',
    supervisionFee: '2024-01-15',
    serviceRemoval: '',
    fafData: {
      fafNumbers: [
        { fafNumber: '21651234567', fafIndicator: 'Primary', description: 'Family Number 1' },
        { fafNumber: '21651234568', fafIndicator: 'Secondary', description: 'Family Number 2' }
      ],
      activationDate: '2023-01-15',
      status: 'Active'
    },
    cugData: {
      communityId: 'CUG001',
      groupName: 'Corporate Group',
      memberCount: 15,
      activationDate: '2023-01-15',
      status: 'Active'
    },
    dedicatedAccounts: [
      { id: 'DA001', value: '1000 MB', expiryDate: '2024-12-31', description: 'Data Bundle' },
      { id: 'DA002', value: '500 MB', expiryDate: '2024-11-30', description: 'Bonus Data' },
      { id: 'DA003', value: '2000 MB', expiryDate: '2024-10-15', description: 'Monthly Package' }
    ],
    offers: [
      { offerID: 'OFF001', expiryDate: '2024-12-31', startDate: '2024-01-01', description: 'Premium Package' },
      { offerID: 'OFF002', expiryDate: '2024-11-30', startDate: '2024-02-01', description: 'Data Boost' }
    ],
    usageThresholdsAndCounters: [
      {
        usageCounterID: 'UC001',
        description: 'Data Usage Counter',
        usageCounterValue: '1073741824',
        usageThresholdInformation: [
          { usageThresholdID: 'UT001', usageThresholdValue: '5.00 GB' },
          { usageThresholdID: 'UT002', usageThresholdValue: '10.00 GB' }
        ]
      },
      {
        usageCounterID: 'UC002',
        description: 'Voice Usage Counter',
        usageCounterValue: '536870912',
        usageThresholdInformation: [
          { usageThresholdID: 'UT003', usageThresholdValue: '2.00 GB' }
        ]
      }
    ],
    accumulators: [
      { accumulatorID: 'ACC001', value: '150', startDate: '2024-01-01', resetDate: '2024-12-31', description: 'Monthly Minutes' },
      { accumulatorID: 'ACC002', value: '75', startDate: '2024-01-01', resetDate: '2024-11-30', description: 'Bonus SMS' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('Dedicated Accounts');
  const [globalSearch, setGlobalSearch] = useState('');

  const tabs = ['Dedicated Accounts', 'Accumulator', 'Offer', 'Usage Thresholds/Counters'];

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setMsisdn('');
    setShowFafCug(false);
    setError(null);
  };

  const toggleFafCug = () => {
    setShowFafCug(!showFafCug);
  };

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(lowerSearch)
      )
    );
  };

  const bytesToGB = (bytes) => {
    if (!bytes || isNaN(parseInt(bytes))) return '0 GB';
    const gb = parseInt(bytes) / (1024 * 1024 * 1024);
    return gb.toFixed(2) + ' GB';
  };

  return (
    <div className="msisdn-content">
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
          <button className="btn-search" onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Envoyer'}
          </button>
          <button className="btn-clear" onClick={handleClear} disabled={loading}>
            Clear
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="boxes-container">
        <div className="main-boxes">
          <div className="info-box">
            <div className="box-header">
              <div className="header-title">SUB NUMBER</div>
            </div>
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

          <div className="info-box">
            <div className="box-header">
              <div className="header-title">DATE</div>
            </div>
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
                <span className="info-value">{searchResults.serviceRemoval || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="right-column">
          <div className="info-box solde-box">
            <div className="box-header">
              <div className="header-title">SOLDE</div>
            </div>
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

          {showFafCug && (searchResults.fafData || searchResults.cugData) && (
            <div className="faf-cug-container">
              <div className="box-header">
                <div className="header-title">FAF & COMMUNITY ID</div>
              </div>
              <div className="box-body faf-cug-body">
                {searchResults.fafData && (
                  <div className="faf-section">
                    <h4 className="section-title">FAF Numbers</h4>
                    <div className="faf-numbers">
                      {searchResults.fafData.fafNumbers.map((faf, index) => (
                        <div key={index} className="faf-number">
                          <div><strong>Number:</strong> {faf.fafNumber}</div>
                          <div><strong>fafIndicator:</strong> {faf.fafIndicator}</div>
                          <div><strong>Description:</strong> {faf.description || "N/A"}</div>
                        </div>
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
              {activeTab === 'Dedicated Accounts' && (
                <>
                  <thead>
                    <tr>
                      <th>DA ID</th>
                      <th>Value</th>
                      <th>Expiry Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(searchResults.dedicatedAccounts, globalSearch).length > 0 ? (
                      filterData(searchResults.dedicatedAccounts, globalSearch).map((row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.value}</td>
                          <td>{row.expiryDate}</td>
                          <td>{row.description || ''}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4">No dedicated accounts available</td></tr>
                    )}
                  </tbody>
                </>
              )}
              
              {activeTab === 'Accumulator' && (
                <>
                  <thead>
                    <tr>
                      <th>Accumulator ID</th>
                      <th>Value</th>
                      <th>Start Date</th>
                      <th>Reset Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(searchResults.accumulators || [], globalSearch).length > 0 ? (
                      filterData(searchResults.accumulators, globalSearch).map((acc, index) => (
                        <tr key={index}>
                          <td>{acc.accumulatorID}</td>
                          <td>{acc.value}</td>
                          <td>{acc.startDate}</td>
                          <td>{acc.resetDate || 'N/A'}</td>
                          <td>{acc.description || 'Description non disponible'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5">No accumulators available</td></tr>
                    )}
                  </tbody>
                </>
              )}

              {activeTab === 'Offer' && (
                <>
                  <thead>
                    <tr>
                      <th>Offer ID</th>
                      <th>Expiry Date</th>
                      <th>Start Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(searchResults.offers, globalSearch).length > 0 ? (
                      filterData(searchResults.offers, globalSearch).map((offer, index) => (
                        <tr key={index}>
                          <td>{offer.offerID}</td>
                          <td>{offer.expiryDate}</td>
                          <td>{offer.startDate || ''}</td>
                          <td>{offer.description || ''}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4">No offers available</td></tr>
                    )}
                  </tbody>
                </>
              )}
              
              {activeTab === 'Usage Thresholds/Counters' && (
                <>
                  <thead className="counters-thead">
                    <tr>
                      <th colSpan="3" className="section-header">Counters</th>
                    </tr>
                    <tr>
                      <th>Counter ID</th>
                      <th>Description</th>
                      <th>Value (GB)</th>
                    </tr>
                  </thead>
                  <tbody className="counters-tbody">
                    {filterData(searchResults.usageThresholdsAndCounters, globalSearch).length > 0 ? (
                      filterData(searchResults.usageThresholdsAndCounters, globalSearch).map((counter, index) => (
                        <tr key={index}>
                          <td>{counter.usageCounterID}</td>
                          <td>{counter.description || 'Description non disponible'}</td>
                          <td>{bytesToGB(counter.usageCounterValue)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3">No counters available</td></tr>
                    )}
                  </tbody>
                  <thead className="thresholds-thead">
                    <tr>
                      <th colSpan="2" className="section-header">Thresholds</th>
                    </tr>
                    <tr>
                      <th>Threshold ID</th>
                      <th>Value (GB)</th>
                    </tr>
                  </thead>
                  <tbody className="thresholds-tbody">
                    {searchResults.usageThresholdsAndCounters.length > 0 && searchResults.usageThresholdsAndCounters
                      .flatMap(counter => counter.usageThresholdInformation)
                      .filter(threshold =>
                        filterData([threshold], globalSearch).length > 0
                      ).length > 0 ? (
                      searchResults.usageThresholdsAndCounters
                        .flatMap(counter => counter.usageThresholdInformation)
                        .filter(threshold =>
                          filterData([threshold], globalSearch).length > 0
                        )
                        .map((threshold, index) => (
                          <tr key={index}>
                            <td>{threshold.usageThresholdID}</td>
                            <td>{threshold.usageThresholdValue}</td>
                          </tr>
                        ))
                    ) : (
                      <tr><td colSpan="2">No thresholds available</td></tr>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing 1 to{' '}
              {activeTab === 'Dedicated Accounts'
                ? filterData(searchResults.dedicatedAccounts, globalSearch).length
                : activeTab === 'Accumulator'
                ? filterData(searchResults.accumulators || [], globalSearch).length
                : activeTab === 'Offer'
                ? filterData(searchResults.offers, globalSearch).length
                : activeTab === 'Usage Thresholds/Counters'
                ? filterData(searchResults.usageThresholdsAndCounters, globalSearch).length +
                  searchResults.usageThresholdsAndCounters
                    .flatMap(counter => counter.usageThresholdInformation)
                    .filter(threshold =>
                      filterData([threshold], globalSearch).length > 0
                    ).length
                : 0}{' '}
              of{' '}
              {activeTab === 'Dedicated Accounts'
                ? searchResults.dedicatedAccounts.length
                : activeTab === 'Accumulator'
                ? searchResults.accumulators?.length || 0
                : activeTab === 'Offer'
                ? searchResults.offers.length
                : activeTab === 'Usage Thresholds/Counters'
                ? searchResults.usageThresholdsAndCounters.length +
                  searchResults.usageThresholdsAndCounters.reduce(
                    (acc, counter) => acc + (counter.usageThresholdInformation?.length || 0),
                    0
                  )
                : 0}{' '}
              entries
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Ensure proper scrolling */
        html, body {
          overflow-x: auto;
          overflow-y: auto;
          height: auto;
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }

        .msisdn-content {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
          padding: 24px 24px 60px 24px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          width: 100%;
          box-sizing: border-box;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding: 20px;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
        }

        .header-icon {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 18px;
          backdrop-filter: blur(10px);
        }

        .content-header h1 {
          color: white;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .search-section {
          background: white;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 24px;
          border: 1px solid #e9ecef;
        }

        .search-field {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .search-field label {
          font-weight: 600;
          color: #495057;
          font-size: 16px;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          border: 2px solid #dee2e6;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .search-input-group:focus-within {
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .country-code {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .search-input-group input {
          border: none;
          outline: none;
          padding: 12px 16px;
          font-size: 16px;
          background: white;
          min-width: 200px;
          flex: 1;
        }

        .search-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-search, .btn-clear {
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          border: none;
          min-width: 120px;
        }

        .btn-search {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
        }

        .btn-search:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }

        .btn-clear {
          background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(108, 117, 125, 0.3);
        }

        .btn-clear:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
        }

        .error-message {
          color: #dc3545;
          background: #f8d7da;
          padding: 12px 16px;
          border-radius: 8px;
          margin-top: 16px;
          border: 1px solid #f5c6cb;
        }

        .boxes-container {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }

        .main-boxes {
          display: flex;
          gap: 20px;
          flex: 2;
        }

        .right-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-box {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e9ecef;
          flex: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .info-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
        }

        .solde-box {
          min-height: 180px;
        }

        .box-header {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          padding: 16px 20px;
          position: relative;
          overflow: hidden;
        }

        .box-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
          opacity: 0.3;
        }

        .header-title {
          color: white;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .box-body {
          padding: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #f8f9fa;
          font-size: 15px;
        }

        .info-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .info-label {
          font-weight: 600;
          color: #495057;
        }

        .info-value {
          color: #6c757d;
          font-weight: 500;
        }

        .status-active {
          color: #28a745;
          font-weight: 700;
          background: #d4edda;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #c3e6cb;
        }

        .balance-section {
          text-align: center;
          margin: 20px 0;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .balance-amount {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faf-cug-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
        }

        .faf-cug-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }

        .faf-cug-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e9ecef;
          animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .faf-cug-body {
          padding: 20px;
          max-height: 240px;
          overflow-y: auto;
        }

        .section-title {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 700;
          color: #ff6b35;
          border-bottom: 2px solid #ff6b35;
          padding-bottom: 8px;
        }

        .faf-section, .cug-section {
          margin-bottom: 20px;
        }

        .faf-section:last-child, .cug-section:last-child {
          margin-bottom: 0;
        }

        .faf-numbers {
          margin-bottom: 16px;
        }

        .faf-number {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 8px;
          border: 1px solid #dee2e6;
          transition: transform 0.2s ease;
        }

        .faf-number:hover {
          transform: translateX(4px);
        }

        .info-row-small {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
          padding: 8px 0;
          border-bottom: 1px solid #f8f9fa;
        }

        .info-label-small {
          font-weight: 600;
          color: #495057;
        }

        .info-value-small {
          color: #6c757d;
          font-weight: 500;
        }

        .info-small {
          font-size: 13px;
          color: #28a745;
          font-weight: 600;
          background: #d4edda;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          border: 1px solid #c3e6cb;
        }

        .tabs-section {
          background: white;
          border-radius: 16px;
          overflow: visible;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          margin-bottom: 40px;
          border: 1px solid #e9ecef;
        }

        .tabs-header {
          display: flex;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 1px solid #dee2e6;
          position: relative;
        }

        .tab {
          padding: 18px 24px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          flex: 1;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%);
          transition: left 0.3s ease;
        }

        .tab:hover::before {
          left: 0;
        }

        .tab.active {
          background: white;
          border-bottom-color: #ff6b35;
          color: #ff6b35;
          font-weight: 700;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.2);
        }

        .tab:hover:not(.active) {
          background: rgba(255, 107, 53, 0.05);
          color: #ff6b35;
        }

        .tab-content {
          padding: 32px;
        }

        .table-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 24px;
        }

        .global-search {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8f9fa;
          padding: 12px 20px;
          border-radius: 12px;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .global-search:focus-within {
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .global-search label {
          font-weight: 600;
          color: #495057;
          font-size: 14px;
        }

        .global-search input {
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          outline: none;
          background: white;
          font-size: 14px;
          min-width: 250px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .data-table {
          overflow-x: auto;
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid #e9ecef;
        }

        .data-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .data-table th {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 18px 20px;
          text-align: left;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
          position: relative;
        }

        .data-table th::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
        }

        .section-header {
          text-align: center;
          font-size: 16px;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ff6b35 0%, #dc3545 100%);
          position: relative;
        }

        .section-header::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 20px;
          right: 20px;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          z-index: 1;
        }

        .data-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f8f9fa;
          font-size: 14px;
          font-weight: 500;
          color: #495057;
          transition: background-color 0.2s ease;
        }

        .data-table tr:nth-child(even) {
          background: #f8f9fa;
        }

        .data-table tr:hover {
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(247, 147, 30, 0.05) 100%);
          transform: scale(1.01);
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.1);
        }

        .data-table tbody tr:last-child td {
          border-bottom: none;
        }

        .counters-thead, .thresholds-thead {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        }

        .counters-tbody, .thresholds-tbody {
          background: white;
        }

        .table-footer {
          margin-top: 24px;
          padding: 16px 20px;
          background: #f8f9fa;
          border-radius: 12px;
          color: #6c757d;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #e9ecef;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .msisdn-content {
            padding: 16px 16px 60px 16px;
            min-height: auto;
          }

          .search-section {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            padding: 20px;
          }

          .search-field {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .search-input-group {
            width: 100%;
          }

          .search-input-group input {
            min-width: auto;
          }

          .search-buttons {
            width: 100%;
            justify-content: center;
          }

          .boxes-container {
            flex-direction: column;
            gap: 16px;
          }

          .main-boxes {
            flex-direction: column;
            gap: 16px;
          }

          .right-column {
            width: 100%;
          }

          .tabs-header {
            flex-wrap: wrap;
          }

          .tab {
            flex: 1;
            min-width: 120px;
            padding: 14px 12px;
            font-size: 12px;
          }

          .tab-content {
            padding: 20px;
          }

          .global-search {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .global-search input {
            min-width: auto;
            width: 100%;
          }

          .data-table {
            font-size: 12px;
          }

          .data-table th,
          .data-table td {
            padding: 12px 8px;
          }

          .content-header h1 {
            font-size: 20px;
          }

          .balance-amount {
            font-size: 24px;
          }
        }

        /* Enhanced animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .data-table tbody tr {
          animation: fadeInUp 0.5s ease forwards;
        }

        .data-table tbody tr:nth-child(even) {
          animation-delay: 0.1s;
        }

        .data-table tbody tr:nth-child(odd) {
          animation-delay: 0.2s;
        }

        /* Scrollbar styling */
        .data-table::-webkit-scrollbar {
          height: 8px;
        }

        .data-table::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 4px;
        }

        .data-table::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border-radius: 4px;
        }

        .data-table::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #e55a2e 0%, #e8830c 100%);
        }

        .faf-cug-body::-webkit-scrollbar {
          width: 6px;
        }

        .faf-cug-body::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 3px;
        }

        .faf-cug-body::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default MSISDNContent;