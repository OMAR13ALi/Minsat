import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from "react-router-dom";

    const MSISDNContent = () => {
      const [searchParams] = useSearchParams();
      const msisdnFromUrl = searchParams.get("msisdn");
      const [msisdn, setMsisdn] = useState(msisdnFromUrl || "");
      const [showFafCug, setShowFafCug] = useState(false);
      const [searchResults, setSearchResults] = useState({
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
        cugData: null,
        dedicatedAccounts: [],
        offers: [],
        usageThresholdsAndCounters: [],
        accumulators: [],
        promotionCounters: null,
        promotionPlans: []
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [activeTab, setActiveTab] = useState('Dedicated Accounts');
      const [globalSearch, setGlobalSearch] = useState('');
      const [modal, setModal] = useState(null);
      const [updateLoading, setUpdateLoading] = useState(false);
      const [updateResult, setUpdateResult] = useState(null);
      const [modalInput, setModalInput] = useState({});
      const tabs = ['Dedicated Accounts', 'Accumulator', 'Offer', 'Usage Thresholds/Counters', 'Promotion'];

      const isValidMsisdn = msisdn.length === 8 && /^\d+$/.test(msisdn);

      const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setMsisdn(value.slice(0, 8));
      };

      const handleSearch = async () => {
        if (!isValidMsisdn) return;

        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/msisdn/${msisdn}`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();

          setSearchResults({
            subscriberNumber: `216${msisdn}`,
            serviceClass: data.accountDetails?.serviceClassCurrent?.toString() || '',
            activationDate: data.accountDetails?.activationDate || '',
            balance: data.balance?.balance || '',
            serviceFee: data.accountDetails?.supervisionExpiryDate || '',
            status: data.accountDetails?.status || 'Active',
            barringStatus: data.accountDetails?.barringStatus || 'NO BARRING',
            supervisionFee: data.accountDetails?.supervisionExpiryDate || '',
            serviceRemoval: data.accountDetails?.serviceRemovalDate || '',
            fafData: {
              fafNumbers: data.faFList || [],
              activationDate: (data.accountDetails?.activationDate || '').split('T')[0],
              status: data.accountDetails?.fafStatus || 'Active'
            },
            cugData: {
              communityId: (data.accountDetails?.communityIDs || [])[0] || '',
              groupName: data.accountDetails?.groupName || '',
              memberCount: data.accountDetails?.memberCount || 0,
              activationDate: (data.accountDetails?.activationDate || '').split('T')[0],
              status: data.accountDetails?.cugStatus || 'Active'
            },
            dedicatedAccounts: data.balance?.dedicatedAccounts || [],
            offers: data.accountDetails?.offers || [],
            usageThresholdsAndCounters: data.usageThresholdsAndCounters || [],
            accumulators: data.accumulators || [],
            promotionCounters: data.promotionCounters?.data || null,
            promotionPlans: (() => {
              const d = data.promotionPlans?.data;
              if (!d) return [];
              const p = d.promotionPlanInformation;
              if (Array.isArray(p)) return p;
              if (p && typeof p === 'object') return [p];
              return [];
            })()
          });
        } catch (err) {
          setError("Failed to fetch MSISDN data. Check the MSISDN or server connection.");
          console.error(err);
        } finally {
          setLoading(false);
        }
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
          cugData: null,
          dedicatedAccounts: [],
          offers: [],
          usageThresholdsAndCounters: [],
          accumulators: [],
          promotionCounters: null,
          promotionPlans: []
        });
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

      const openModal = (type, extra = {}) => {
        setModal({ type, ...extra });
        setModalInput({});
        setUpdateResult(null);
      };

      const closeModal = () => {
        setModal(null);
        setUpdateResult(null);
        setModalInput({});
      };

      const handleUpdate = async (type, payload) => {
        setUpdateLoading(true);
        setUpdateResult(null);
        try {
          const response = await fetch(`/api/update/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msisdn, ...payload })
          });
          const data = await response.json();
          if (data.success !== false) {
            setUpdateResult({ success: true, message: 'Updated successfully' });
            setTimeout(() => { closeModal(); handleSearch(); }, 1500);
          } else {
            setUpdateResult({ success: false, message: data.responseMessage || 'Update failed' });
          }
        } catch (err) {
          setUpdateResult({ success: false, message: err.message });
        } finally {
          setUpdateLoading(false);
        }
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
                  type="tel"
                  value={msisdn}
                  onChange={handleInputChange}
                  placeholder="Enter 8-digit MSISDN"
                  pattern="[0-9]*"
                  maxLength={8}
                  style={{ maxWidth: '200px', width: '100%' }}
                />
              </div>
            </div>
            <div className="search-buttons">
              <button 
                className="btn-search" 
                onClick={handleSearch} 
                disabled={loading || !isValidMsisdn}
              >
                {loading ? 'Loading...' : 'Envoyer'}
              </button>
              <button 
                className="btn-clear" 
                onClick={handleClear} 
                disabled={loading}
              >
                Clear
              </button>
            </div>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </div>

          <div className="boxes-container">
            <div className="main-boxes">
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
                  {searchResults.subscriberNumber && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <button className="action-btn" onClick={() => openModal('block')}>
                          {searchResults.barringStatus && searchResults.barringStatus !== 'NO BARRING' ? '🔓 Unblock' : '🔒 Block'}
                        </button>
                        <button className="action-btn action-btn-secondary" onClick={() => openModal('service-class')}>✏️ Change SC</button>
                        <button className="action-btn action-btn-secondary" onClick={() => openModal('update-account-details')}>⚙️ USSD</button>
                        <button className="action-btn action-btn-secondary" onClick={() => openModal('subscriber-segmentation')}>📊 Segment</button>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button className="action-btn action-btn-secondary" onClick={() => openModal('link-subordinate')}>🔗 Link Sub</button>
                        <button className="action-btn action-btn-secondary" onClick={() => openModal('install')}>📲 Install</button>
                        <button className="action-btn action-btn-danger" onClick={() => openModal('delete')}>🗑️ Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
              <div className="single-box solde-box">
                <div className="box-header">SOLDE</div>
                <div className="box-body">
                  <div className="balance-section">
                    <div className="balance-amount">{searchResults.balance}</div>
                  </div>
                  {searchResults.subscriberNumber && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                      <button className="action-btn" style={{ width: '100%' }} onClick={() => openModal('refill')}>💳 Refill</button>
                      <button className="action-btn action-btn-secondary" style={{ width: '100%' }} onClick={() => openModal('refill-barring')}>🚫 Refill Barring</button>
                    </div>
                  )}
                  {(searchResults.fafData || searchResults.cugData) && (
                    <button className="faf-cug-btn" onClick={toggleFafCug}>
                      {showFafCug ? 'Hide' : 'Reveal'} FAF & Community ID
                    </button>
                  )}
                </div>
              </div>

              {showFafCug && (searchResults.fafData || searchResults.cugData) && (
                <div className="faf-cug-container">
                  <div className="box-header">FAF & COMMUNITY ID</div>
                  <div className="box-body faf-cug-body">
                    {searchResults.fafData && (
                      <div className="faf-section">
                        <h4 className="section-title">FAF Numbers</h4>
                        <div className="faf-numbers">
                          {searchResults.fafData.fafNumbers.map((faf, index) => (
                            <div key={index} className="faf-number" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div><strong>Number:</strong> {faf.fafNumber}</div>
                                <div><strong>fafIndicator:</strong> {faf.fafIndicator}</div>
                                <div><strong>Description:</strong> {faf.description || "N/A"}</div>
                              </div>
                              <button className="action-btn action-btn-danger" style={{ fontSize: '11px', padding: '4px 8px', marginLeft: '8px', flexShrink: 0 }}
                                onClick={() => openModal('faf-remove', { fafNumber: faf.fafNumber, fafIndicator: faf.fafIndicator })}>
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="info-small">Status: {searchResults.fafData.status}</span>
                          <button className="action-btn" style={{ fontSize: '12px', padding: '6px 12px' }} onClick={() => openModal('faf-add')}>
                            + Add FAF
                          </button>
                        </div>
                      </div>
                    )}
                    {searchResults.cugData && (
                      <div className="cug-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 className="section-title">Community Group</h4>
                          <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => openModal('update-community-list')}>✏️ Edit</button>
                        </div>
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
                    style={{ maxWidth: '250px', width: '100%' }}
                  />
                </div>
              </div>

              <div className="data-table">
                <table>
                  <tbody>
                    {activeTab === 'Dedicated Accounts' && (
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
                      </table>
                    )}
                    {activeTab === 'Accumulator' && (
                      <table>
                        <thead>
                          <tr>
                            <th colSpan="5" style={{ textAlign: 'right', padding: '4px 8px', background: 'transparent', border: 'none' }}>
                              {searchResults.subscriberNumber && (
                                <button className="action-btn action-btn-secondary" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => openModal('update-accumulators')}>📝 Update Accumulators</button>
                              )}
                            </th>
                          </tr>
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
                      </table>
                    )}
                    {activeTab === 'Offer' && (
                      <table>
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
                      </table>
                    )}
                    {activeTab === 'Usage Thresholds/Counters' && (
                      <div className="counters-thresholds-container">
                        <div className="counters-table">
                          <table>
                            <thead className="counters-thead">
                              <tr>
                                <th colSpan="3">Counters</th>
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
                          </table>
                        </div>
                        <div className="thresholds-table">
                          <table>
                            <thead className="thresholds-thead">
                              <tr>
                                <th colSpan="2">Thresholds</th>
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
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === 'Promotion' && (
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan="5" style={{ padding: '0', border: 'none' }}>
                              <div style={{ padding: '12px 0' }}>
                                {searchResults.subscriberNumber && (
                                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <button className="action-btn action-btn-secondary" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => openModal('update-promotion-counters')}>🔄 Update Counters</button>
                                  </div>
                                )}
                                {searchResults.promotionCounters && (
                                  <div style={{ marginBottom: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <strong>Promotion Counters</strong>
                                    <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                      {Object.entries(searchResults.promotionCounters).map(([k, v]) => (
                                        <div key={k} style={{ fontSize: '13px' }}><span style={{ color: '#666' }}>{k}:</span> <strong>{String(v)}</strong></div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <strong>Promotion Plans</strong>
                                {searchResults.promotionPlans.length > 0 ? (
                                  <table style={{ width: '100%', marginTop: '8px', borderCollapse: 'collapse' }}>
                                    <thead>
                                      <tr style={{ background: '#f0f0f0' }}>
                                        <th style={{ padding: '6px 8px', textAlign: 'left' }}>Plan ID</th>
                                        <th style={{ padding: '6px 8px', textAlign: 'left' }}>Start Date</th>
                                        <th style={{ padding: '6px 8px', textAlign: 'left' }}>End Date</th>
                                        <th style={{ padding: '6px 8px', textAlign: 'left' }}>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {searchResults.promotionPlans.map((plan, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                          <td style={{ padding: '6px 8px' }}>{plan.planId || plan.promotionPlanId || JSON.stringify(plan)}</td>
                                          <td style={{ padding: '6px 8px' }}>{plan.startDate || 'N/A'}</td>
                                          <td style={{ padding: '6px 8px' }}>{plan.endDate || 'N/A'}</td>
                                          <td style={{ padding: '6px 8px' }}>
                                            <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '3px 8px' }}
                                              onClick={() => openModal('update-promotion-plan', { planId: plan.planId || plan.promotionPlanId, oldStartDate: plan.startDate, oldEndDate: plan.endDate })}>
                                              📋 Update
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <div style={{ color: '#999', marginTop: '8px', fontSize: '13px' }}>No promotion plans available</div>
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <span>
                  Showing 1 to{' '}
                  {activeTab === 'Dedicated Accounts'
                    ? filterData(searchResults.dedicatedAccounts, globalSearch).length
                    : activeTab === 'Offer'
                    ? filterData(searchResults.offers, globalSearch).length
                    : activeTab === 'Usage Thresholds/Counters'
                    ? filterData(searchResults.usageThresholdsAndCounters, globalSearch).length +
                      searchResults.usageThresholdsAndCounters
                        .flatMap(counter => counter.usageThresholdInformation)
                        .filter(threshold =>
                          filterData([threshold], globalSearch).length > 0
                        ).length
                    : activeTab === 'Accumulator'
                    ? filterData(searchResults.accumulators, globalSearch).length
                    : 0}{' '
                  }of{' '
                  }{activeTab === 'Dedicated Accounts'
                    ? searchResults.dedicatedAccounts.length
                    : activeTab === 'Offer'
                    ? searchResults.offers.length
                    : activeTab === 'Usage Thresholds/Counters'
                    ? searchResults.usageThresholdsAndCounters.length +
                      searchResults.usageThresholdsAndCounters.reduce(
                        (acc, counter) => acc + (counter.usageThresholdInformation?.length || 0),
                        0
                      )
                    : activeTab === 'Accumulator'
                    ? searchResults.accumulators.length
                    : 0}{' '
                  }entries
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
              padding: 24px;
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

            .btn-search:hover:enabled {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
            }

            .btn-search:disabled {
              background: #cccccc;
              cursor: not-allowed;
              box-shadow: none;
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

            .boxes-container {
              display: flex;
              gap: 20px;
              margin-bottom: 32px;
            }

            .main-boxes {
              display: flex;
              gap: 20px;
              flex: 1;
            }

            .single-box {
              background: white;
              border-radius: 16px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
              overflow: hidden;
              border: 1px solid #e9ecef;
              flex: 1;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .single-box:hover {
              transform: translateY(-4px);
              box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
            }

            .right-column {
              width: 300px;
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .solde-box {
              min-height: 180px;
            }

            .box-header {
              background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
              padding: 16px 20px;
              position: relative;
              overflow: hidden;
              color: white;
              font-weight: 700;
              font-size: 16px;
              text-transform: uppercase;
              letter-spacing: 1px;
              text-align: center;
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
              width: 100%;
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
              width: 100%;
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
              width: 100%;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
              border: 1px solid #e9ecef;
              overflow: visible;
            }

            .data-table > table {
              width: 100%;
              border-collapse: collapse;
              background: white;
              table-layout: auto;
            }

            .data-table table {
              width: 100%;
              border-collapse: collapse;
            }

            .counters-thresholds-container {
              display: flex;
              gap: 20px;
              width: 100%;
            }

            .counters-table, .thresholds-table {
              flex: 1;
              width: 100%;
              background: white;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
              border: 1px solid #e9ecef;
              overflow-x: auto;
            }

            .counters-table > table, .thresholds-table > table {
              width: 100%;
              border-collapse: collapse;
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
              word-wrap: break-word;
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

            .data-table td {
              padding: 16px 20px;
              border-bottom: 1px solid #f8f9fa;
              font-size: 14px;
              font-weight: 500;
              color: #495057;
              transition: background-color 0.2s ease;
              word-wrap: break-word;
              overflow-wrap: break-word;
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
              width: 100%;
            }

            /* Mobile Responsiveness */
            @media (max-width: 768px) {
              .msisdn-content {
                padding: 16px;
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
                overflow-x: auto;
              }

              .data-table th,
              .data-table td {
                padding: 12px 8px;
                min-width: 100px;
              }

              .counters-thresholds-container {
                flex-direction: column;
                gap: 16px;
              }

              .counters-table, .thresholds-table {
                width: 100%;
              }

              .content-header h1 {
                font-size: 20px;
              }

              .balance-amount {
                font-size: 24px;
              }
            }

            /* Desktop specific styles for larger screens */
            @media (min-width: 1200px) {
              .boxes-container {
                max-width: none;
              }

              .main-boxes {
                flex: 2;
              }

              .right-column {
                width: 350px;
              }

              .tabs-section {
                max-width: none;
              }

              .tab-content {
                padding: 40px;
              }

              .data-table {
                font-size: 15px;
              }

              .data-table th,
              .data-table td {
                padding: 20px 24px;
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

            /* Action buttons */
            .action-btn {
              background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
              color: white;
              border: none;
              padding: 8px 14px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 13px;
              font-weight: 600;
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
            }
            .action-btn:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 14px rgba(255, 107, 53, 0.4);
            }
            .action-btn-secondary {
              background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
              box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
            }
            .action-btn-secondary:hover {
              box-shadow: 0 4px 14px rgba(108, 117, 125, 0.4);
            }
            .action-btn-danger {
              background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
              box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
            }
            .action-btn-danger:hover {
              box-shadow: 0 4px 14px rgba(220, 53, 69, 0.4);
            }

            /* Modal */
            .modal-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              backdrop-filter: blur(4px);
            }
            .modal-card {
              background: white;
              border-radius: 16px;
              width: 90%;
              max-width: 440px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
              overflow: hidden;
              animation: slideDown 0.3s ease;
            }
            .modal-header {
              background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
              color: white;
              padding: 20px 24px;
              font-weight: 700;
              font-size: 18px;
            }
            .modal-body {
              padding: 24px;
              font-size: 14px;
              color: #495057;
            }
            .modal-body p { margin: 0 0 10px 0; line-height: 1.6; }
            .modal-field { margin-bottom: 16px; }
            .modal-field label {
              display: block;
              font-weight: 600;
              color: #495057;
              margin-bottom: 6px;
              font-size: 13px;
            }
            .modal-field input, .modal-field select {
              width: 100%;
              padding: 10px 14px;
              border: 2px solid #dee2e6;
              border-radius: 8px;
              font-size: 14px;
              outline: none;
              transition: border-color 0.2s;
              box-sizing: border-box;
            }
            .modal-field input:focus, .modal-field select:focus {
              border-color: #ff6b35;
              box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
            }
            .modal-result {
              padding: 12px 16px;
              border-radius: 8px;
              margin-bottom: 16px;
              font-weight: 600;
              font-size: 14px;
            }
            .modal-result-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .modal-result-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
            .modal-footer {
              padding: 16px 24px;
              display: flex;
              gap: 12px;
              justify-content: flex-end;
              border-top: 1px solid #e9ecef;
            }
            .modal-btn-cancel {
              padding: 10px 20px;
              border-radius: 8px;
              border: 2px solid #dee2e6;
              background: white;
              color: #6c757d;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            }
            .modal-btn-cancel:hover { background: #f8f9fa; border-color: #adb5bd; }
            .modal-btn-confirm {
              padding: 10px 20px;
              border-radius: 8px;
              border: none;
              background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
              color: white;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(255, 107, 53, 0.3);
              transition: all 0.2s;
            }
            .modal-btn-confirm:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
            }
            .modal-btn-confirm:disabled, .modal-btn-cancel:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      {/* Update Modal Overlay */}
      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-card">
            <div className="modal-header">
              {modal.type === 'block' && (searchResults.barringStatus && searchResults.barringStatus !== 'NO BARRING' ? '🔓 Unblock Subscriber' : '🔒 Block Subscriber')}
              {modal.type === 'service-class' && '✏️ Change Service Class'}
              {modal.type === 'refill' && '💳 Refill'}
              {modal.type === 'faf-add' && '+ Add FAF Entry'}
              {modal.type === 'faf-remove' && '✕ Remove FAF Entry'}
              {modal.type === 'install' && '📲 Install Subscriber'}
              {modal.type === 'delete' && '🗑️ Delete Subscriber'}
              {modal.type === 'link-subordinate' && '🔗 Link Subordinate'}
              {modal.type === 'update-account-details' && '⚙️ Update USSD Notification'}
              {modal.type === 'subscriber-segmentation' && '📊 Update Segmentation'}
              {modal.type === 'update-community-list' && '✏️ Update Community List'}
              {modal.type === 'update-accumulators' && '📝 Update Accumulators'}
              {modal.type === 'refill-barring' && '🚫 Update Refill Barring'}
              {modal.type === 'update-promotion-counters' && '🔄 Update Promotion Counters'}
              {modal.type === 'update-promotion-plan' && '📋 Update Promotion Plan'}
            </div>
            <div className="modal-body">
              {updateResult && (
                <div className={`modal-result ${updateResult.success ? 'modal-result-success' : 'modal-result-error'}`}>
                  {updateResult.success ? `✓ ${updateResult.message}` : `✗ ${updateResult.message}`}
                </div>
              )}

              {modal.type === 'block' && (
                <div>
                  <p>Subscriber: <strong>216{msisdn}</strong></p>
                  <p>Current barring: <strong>{searchResults.barringStatus || 'NO BARRING'}</strong></p>
                  <p>{searchResults.barringStatus && searchResults.barringStatus !== 'NO BARRING'
                    ? 'This will unblock the subscriber and restore service.'
                    : 'This will block the subscriber from using the service.'}</p>
                </div>
              )}

              {modal.type === 'service-class' && (
                <div>
                  <div className="modal-field">
                    <label>New Service Class</label>
                    <input type="number" placeholder="e.g. 104"
                      value={modalInput.serviceClassNew || ''}
                      onChange={e => setModalInput(p => ({ ...p, serviceClassNew: e.target.value }))} />
                  </div>
                  <div className="modal-field">
                    <label>Action</label>
                    <select value={modalInput.action || 'CHANGE'}
                      onChange={e => setModalInput(p => ({ ...p, action: e.target.value }))}>
                      <option value="CHANGE">CHANGE</option>
                      <option value="ACTIVATE">ACTIVATE</option>
                      <option value="DEACTIVATE">DEACTIVATE</option>
                    </select>
                  </div>
                </div>
              )}

              {modal.type === 'refill' && (
                <div>
                  <div className="modal-field">
                    <label>Refill Type</label>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <input type="radio" name="refillType" value="voucher"
                          checked={(modalInput.refillType || 'voucher') === 'voucher'}
                          onChange={() => setModalInput(p => ({ ...p, refillType: 'voucher' }))} />
                        Voucher Code
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <input type="radio" name="refillType" value="amount"
                          checked={modalInput.refillType === 'amount'}
                          onChange={() => setModalInput(p => ({ ...p, refillType: 'amount' }))} />
                        Amount
                      </label>
                    </div>
                  </div>
                  {(modalInput.refillType || 'voucher') === 'voucher' ? (
                    <div className="modal-field">
                      <label>Voucher Code</label>
                      <input type="text" placeholder="Enter voucher code"
                        value={modalInput.voucherCode || ''}
                        onChange={e => setModalInput(p => ({ ...p, voucherCode: e.target.value }))} />
                    </div>
                  ) : (
                    <div>
                      <div className="modal-field">
                        <label>Amount (millimes)</label>
                        <input type="number" placeholder="e.g. 5000"
                          value={modalInput.amount || ''}
                          onChange={e => setModalInput(p => ({ ...p, amount: e.target.value }))} />
                      </div>
                      <div className="modal-field">
                        <label>Currency</label>
                        <input type="text"
                          value={modalInput.currency || 'TND'}
                          onChange={e => setModalInput(p => ({ ...p, currency: e.target.value }))} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {modal.type === 'faf-add' && (
                <div>
                  <div className="modal-field">
                    <label>FAF Number</label>
                    <input type="text" placeholder="e.g. 21669000002"
                      value={modalInput.fafNumber || ''}
                      onChange={e => setModalInput(p => ({ ...p, fafNumber: e.target.value }))} />
                  </div>
                  <div className="modal-field">
                    <label>Owner</label>
                    <select value={modalInput.owner || 'Subscriber'}
                      onChange={e => setModalInput(p => ({ ...p, owner: e.target.value }))}>
                      <option value="Subscriber">Subscriber</option>
                      <option value="Operator">Operator</option>
                    </select>
                  </div>
                </div>
              )}

              {modal.type === 'faf-remove' && (
                <div>
                  <p>Remove FAF number <strong>{modal.fafNumber}</strong> from subscriber <strong>216{msisdn}</strong>?</p>
                </div>
              )}

              {modal.type === 'install' && (
                <div>
                  <div className="modal-field">
                    <label>Service Class</label>
                    <input type="number" placeholder="e.g. 104" value={modalInput.serviceClassNew || ''}
                      onChange={e => setModalInput(p => ({ ...p, serviceClassNew: e.target.value }))} />
                  </div>
                  <div className="modal-field">
                    <label>Language ID</label>
                    <input type="number" placeholder="e.g. 1" value={modalInput.languageId || ''}
                      onChange={e => setModalInput(p => ({ ...p, languageId: e.target.value }))} />
                  </div>
                  <div className="modal-field">
                    <label>USSD EOCN ID</label>
                    <input type="number" placeholder="e.g. 0" value={modalInput.ussdEocnId || ''}
                      onChange={e => setModalInput(p => ({ ...p, ussdEocnId: e.target.value }))} />
                  </div>
                  <div className="modal-field" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" id="tmpBlocked" checked={!!modalInput.temporaryBlockedFlag}
                      onChange={e => setModalInput(p => ({ ...p, temporaryBlockedFlag: e.target.checked }))} />
                    <label htmlFor="tmpBlocked" style={{ margin: 0 }}>Temporarily Blocked</label>
                  </div>
                </div>
              )}

              {modal.type === 'delete' && (
                <div>
                  <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '6px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px' }}>
                    ⚠️ This will permanently delete subscriber <strong>216{msisdn}</strong> from AIR. This action cannot be undone.
                  </div>
                  <div className="modal-field">
                    <label>Operator ID</label>
                    <input type="text" placeholder="e.g. 1" value={modalInput.originOperatorId || ''}
                      onChange={e => setModalInput(p => ({ ...p, originOperatorId: e.target.value }))} />
                  </div>
                </div>
              )}

              {modal.type === 'link-subordinate' && (
                <div>
                  <div className="modal-field">
                    <label>Master Account MSISDN (8 digits)</label>
                    <input type="text" placeholder="e.g. 69000001" maxLength={8} value={modalInput.masterAccountNumber || ''}
                      onChange={e => setModalInput(p => ({ ...p, masterAccountNumber: e.target.value.replace(/\D/g, '').slice(0, 8) }))} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0' }}>Will link 216{msisdn} as subordinate to 216{modalInput.masterAccountNumber || '????????'}</p>
                </div>
              )}

              {modal.type === 'update-account-details' && (
                <div>
                  <div className="modal-field">
                    <label>USSD End-of-Call Notification ID</label>
                    <input type="number" placeholder="e.g. 0" value={modalInput.ussdEndOfCallNotificationId ?? ''}
                      onChange={e => setModalInput(p => ({ ...p, ussdEndOfCallNotificationId: e.target.value }))} />
                  </div>
                </div>
              )}

              {modal.type === 'subscriber-segmentation' && (
                <div>
                  <div className="modal-field">
                    <label>Account Group ID</label>
                    <input type="number" placeholder="e.g. 1" value={modalInput.accountGroupId ?? ''}
                      onChange={e => setModalInput(p => ({ ...p, accountGroupId: e.target.value }))} />
                  </div>
                </div>
              )}

              {modal.type === 'update-community-list' && (
                <div>
                  <div className="modal-field">
                    <label>Community IDs (comma-separated)</label>
                    <input type="text" placeholder="e.g. 1,2,3" value={modalInput.communityIds || ''}
                      onChange={e => setModalInput(p => ({ ...p, communityIds: e.target.value }))} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Current: {searchResults.cugData?.communityId || 'N/A'}</p>
                </div>
              )}

              {modal.type === 'update-accumulators' && (
                <div>
                  {searchResults.accumulators && searchResults.accumulators.length > 0 ? (
                    searchResults.accumulators.map((acc, i) => (
                      <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}>Accumulator {acc.accumulatorID} — {acc.description || ''}</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <div className="modal-field" style={{ flex: 1 }}>
                            <label>Relative Value</label>
                            <input type="text" placeholder="e.g. +500" value={(modalInput[`acc_${i}_rel`]) || ''}
                              onChange={e => setModalInput(p => ({ ...p, [`acc_${i}_rel`]: e.target.value, [`acc_${i}_id`]: acc.accumulatorID }))} />
                          </div>
                          <div className="modal-field" style={{ flex: 1 }}>
                            <label>Absolute Value</label>
                            <input type="text" placeholder="e.g. 1000" value={(modalInput[`acc_${i}_abs`]) || ''}
                              onChange={e => setModalInput(p => ({ ...p, [`acc_${i}_abs`]: e.target.value, [`acc_${i}_id`]: acc.accumulatorID }))} />
                          </div>
                          <div className="modal-field" style={{ flex: 1 }}>
                            <label>Start Date (YYYYMMDDTHHmmss)</label>
                            <input type="text" placeholder="e.g. 20250101T000000" value={(modalInput[`acc_${i}_start`]) || ''}
                              onChange={e => setModalInput(p => ({ ...p, [`acc_${i}_start`]: e.target.value }))} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#999', fontSize: '13px' }}>No accumulators loaded. Search for a subscriber first.</p>
                  )}
                </div>
              )}

              {modal.type === 'refill-barring' && (
                <div>
                  <div className="modal-field">
                    <label>Action</label>
                    <select value={modalInput.action || 'BAR'}
                      onChange={e => setModalInput(p => ({ ...p, action: e.target.value }))}>
                      <option value="BAR">BAR — Enable refill barring</option>
                      <option value="CLEAR">CLEAR — Remove refill barring</option>
                      <option value="STEP">STEP — Step refill barring counter</option>
                    </select>
                  </div>
                </div>
              )}

              {modal.type === 'update-promotion-counters' && (
                <div>
                  <div className="modal-field">
                    <label>Transaction Currency</label>
                    <input type="text" placeholder="e.g. TND" value={modalInput.transactionCurrency || 'TND'}
                      onChange={e => setModalInput(p => ({ ...p, transactionCurrency: e.target.value }))} />
                  </div>
                  <div className="modal-field">
                    <label>Promotion Refill Amount (relative)</label>
                    <input type="text" placeholder="e.g. +1000" value={modalInput.promotionRefillAmountRelative || ''}
                      onChange={e => setModalInput(p => ({ ...p, promotionRefillAmountRelative: e.target.value }))} />
                  </div>
                </div>
              )}

              {modal.type === 'update-promotion-plan' && (
                <div>
                  <div className="modal-field">
                    <label>Action</label>
                    <select value={modalInput.action || 'ACTIVATE'}
                      onChange={e => setModalInput(p => ({ ...p, action: e.target.value }))}>
                      <option value="ACTIVATE">ACTIVATE</option>
                      <option value="DEACTIVATE">DEACTIVATE</option>
                      <option value="MODIFY">MODIFY</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Plan ID</label>
                    <input type="text" placeholder="Plan ID" value={modalInput.planId || modal.planId || ''}
                      onChange={e => setModalInput(p => ({ ...p, planId: e.target.value }))} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="modal-field" style={{ flex: 1 }}>
                      <label>Old Start Date</label>
                      <input type="text" placeholder="YYYYMMDDTHHmmss" value={modalInput.oldStartDate || modal.oldStartDate || ''}
                        onChange={e => setModalInput(p => ({ ...p, oldStartDate: e.target.value }))} />
                    </div>
                    <div className="modal-field" style={{ flex: 1 }}>
                      <label>Old End Date</label>
                      <input type="text" placeholder="YYYYMMDDTHHmmss" value={modalInput.oldEndDate || modal.oldEndDate || ''}
                        onChange={e => setModalInput(p => ({ ...p, oldEndDate: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="modal-field" style={{ flex: 1 }}>
                      <label>New Start Date</label>
                      <input type="text" placeholder="YYYYMMDDTHHmmss" value={modalInput.startDate || ''}
                        onChange={e => setModalInput(p => ({ ...p, startDate: e.target.value }))} />
                    </div>
                    <div className="modal-field" style={{ flex: 1 }}>
                      <label>New End Date</label>
                      <input type="text" placeholder="YYYYMMDDTHHmmss" value={modalInput.endDate || ''}
                        onChange={e => setModalInput(p => ({ ...p, endDate: e.target.value }))} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={closeModal} disabled={updateLoading}>Cancel</button>
              <button className="modal-btn-confirm" disabled={updateLoading}
                onClick={() => {
                  if (modal.type === 'block') {
                    handleUpdate('block', { blocked: !(searchResults.barringStatus && searchResults.barringStatus !== 'NO BARRING') });
                  } else if (modal.type === 'service-class') {
                    handleUpdate('service-class', { action: modalInput.action || 'CHANGE', serviceClassNew: parseInt(modalInput.serviceClassNew) });
                  } else if (modal.type === 'refill') {
                    const p = (modalInput.refillType || 'voucher') === 'voucher'
                      ? { voucherCode: modalInput.voucherCode }
                      : { amount: parseInt(modalInput.amount), currency: modalInput.currency || 'TND' };
                    handleUpdate('refill', p);
                  } else if (modal.type === 'faf-add') {
                    handleUpdate('faf', { action: 'ADD', entries: [{ fafNumber: modalInput.fafNumber, owner: modalInput.owner || 'Subscriber' }] });
                  } else if (modal.type === 'faf-remove') {
                    handleUpdate('faf', { action: 'DELETE', entries: [{ fafNumber: modal.fafNumber }] });
                  } else if (modal.type === 'install') {
                    handleUpdate('install', {
                      serviceClassNew: parseInt(modalInput.serviceClassNew) || 0,
                      temporaryBlockedFlag: !!modalInput.temporaryBlockedFlag,
                      languageId: parseInt(modalInput.languageId) || 0,
                      ussdEocnId: parseInt(modalInput.ussdEocnId) || 0
                    });
                  } else if (modal.type === 'delete') {
                    handleUpdate('delete', { originOperatorId: modalInput.originOperatorId || '' });
                  } else if (modal.type === 'link-subordinate') {
                    handleUpdate('link-subordinate', { masterAccountNumber: '216' + (modalInput.masterAccountNumber || '') });
                  } else if (modal.type === 'update-account-details') {
                    handleUpdate('account-details', { ussdEndOfCallNotificationId: parseInt(modalInput.ussdEndOfCallNotificationId) || 0 });
                  } else if (modal.type === 'subscriber-segmentation') {
                    handleUpdate('subscriber-segmentation', { accountGroupId: parseInt(modalInput.accountGroupId) || 0 });
                  } else if (modal.type === 'update-community-list') {
                    const ids = (modalInput.communityIds || '').split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                    handleUpdate('community-list', { communityIds: ids });
                  } else if (modal.type === 'update-accumulators') {
                    const accs = (searchResults.accumulators || []).map((acc, i) => ({
                      accumulatorId: acc.accumulatorID,
                      relativeValue: modalInput[`acc_${i}_rel`] || '',
                      absoluteValue: modalInput[`acc_${i}_abs`] || '',
                      startDate: modalInput[`acc_${i}_start`] || ''
                    })).filter(a => a.relativeValue || a.absoluteValue);
                    handleUpdate('accumulators', { accumulators: accs });
                  } else if (modal.type === 'refill-barring') {
                    handleUpdate('refill-barring', { action: modalInput.action || 'BAR' });
                  } else if (modal.type === 'update-promotion-counters') {
                    handleUpdate('promotion-counters', {
                      transactionCurrency: modalInput.transactionCurrency || 'TND',
                      promotionRefillAmountRelative: modalInput.promotionRefillAmountRelative || ''
                    });
                  } else if (modal.type === 'update-promotion-plan') {
                    handleUpdate('promotion-plan', {
                      action: modalInput.action || 'ACTIVATE',
                      planId: modalInput.planId || modal.planId || '',
                      oldStartDate: modalInput.oldStartDate || modal.oldStartDate || '',
                      oldEndDate: modalInput.oldEndDate || modal.oldEndDate || '',
                      startDate: modalInput.startDate || '',
                      endDate: modalInput.endDate || ''
                    });
                  }
                }}>
                {updateLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MSISDNContent;