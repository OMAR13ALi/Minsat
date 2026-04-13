import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { Shield, CreditCard, Settings, ChevronRight, ArrowRight } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('Accumulator');
  const [globalSearch, setGlobalSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateResult, setUpdateResult] = useState(null);
  const [modalInput, setModalInput] = useState({});
  const tabs = ['Accumulator', 'Offer', 'Usage Thresholds/Counters', 'Promotion'];

  const isValidMsisdn = msisdn.length === 8 && /^\d+$/.test(msisdn);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMsisdn(value.slice(0, 8));
  };

  // Auto-fetch when navigated from the search form with a MSISDN in the URL
  useEffect(() => {
    if (msisdnFromUrl && msisdnFromUrl.length === 8) {
      handleSearch();
    }
  }, [msisdnFromUrl]); // eslint-disable-line react-hooks/exhaustive-deps

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
        status: data.accountDetails?.temporaryBlockedFlag ? 'BARRED' : 'Active',
        barringStatus: data.accountDetails?.temporaryBlockedFlag ? 'BARRED' : 'NO BARRING',
        supervisionFee: data.accountDetails?.supervisionExpiryDate || '',
        serviceRemoval: data.accountDetails?.serviceRemovalDate || '',
        fafData: {
          fafNumbers: data.faFList || [],
          activationDate: (data.accountDetails?.activationDate || '').split('T')[0],
          status: 'Active'
        },
        cugData: {
          communityId: (data.accountDetails?.communityInformationCurrent || [])[0]?.communityID || '',
          groupName: '',
          memberCount: 0,
          activationDate: (data.accountDetails?.activationDate || '').split('T')[0],
          status: 'Active'
        },
        dedicatedAccounts: data.balance?.dedicatedAccounts || [],
        offers: data.accountDetails?.offerInformation || [],
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
      subscriberNumber: '', serviceClass: '', activationDate: '', balance: '',
      serviceFee: '', status: '', barringStatus: '', supervisionFee: '', serviceRemoval: '',
      fafData: null, cugData: null, dedicatedAccounts: [], offers: [],
      usageThresholdsAndCounters: [], accumulators: [], promotionCounters: null, promotionPlans: []
    });
    setError(null);
  };

  const toggleFafCug = () => setShowFafCug(!showFafCug);

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(val => val && val.toString().toLowerCase().includes(lowerSearch))
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const isBlocked = searchResults.barringStatus && searchResults.barringStatus !== 'NO BARRING';

  // Compute usage for progress bar
  const usageCounter = searchResults.usageThresholdsAndCounters?.[0];
  const usedBytes = usageCounter ? parseInt(usageCounter.usageCounterValue) || 0 : 0;
  const threshold = usageCounter?.usageThresholdInformation?.[0];
  const thresholdBytes = threshold ? parseInt(threshold.usageThresholdValue) || 0 : 0;
  const usagePercent = thresholdBytes > 0 ? Math.min((usedBytes / thresholdBytes) * 100, 100) : 0;

  const hasData = !!searchResults.subscriberNumber;

  return (
    <div style={{ fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)", color: '#101828' }}>
      {/* Page title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#101828', margin: 0, paddingLeft: '12px', borderLeft: '3px solid #ff6600', letterSpacing: '-0.01em' }}>
          MSISDN Information
        </h1>
        <p style={{ fontSize: '12px', color: '#667085', margin: '4px 0 0 15px' }}>
          Enter a subscriber number to view account details
        </p>
      </div>

      {/* Search card */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid #eaecf0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
        padding: '18px 22px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap'
      }}>
        <label style={{ fontWeight: 600, color: '#344054', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>
          MSISDN:
        </label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1.5px solid #eaecf0',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '42px',
          flex: '1',
          maxWidth: '360px',
          transition: 'border-color 0.2s'
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = '#ff6600'}
          onBlurCapture={e => e.currentTarget.style.borderColor = '#eaecf0'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 12px', background: '#f9fafb', height: '100%', borderRight: '1.5px solid #eaecf0', minWidth: '90px' }}>
            <span style={{ fontSize: '15px' }}>🇹🇳</span>
            <span style={{ fontWeight: 600, color: '#344054', fontSize: '13px', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>+216</span>
          </div>
          <input
            type="tel"
            value={msisdn}
            onChange={handleInputChange}
            placeholder="Enter 8-digit MSISDN"
            maxLength={8}
            style={{ flex: 1, padding: '0 14px', border: 'none', outline: 'none', fontSize: '15px', background: '#fff', color: '#101828', letterSpacing: '0.1em', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSearch}
            disabled={loading || !isValidMsisdn}
            style={{
              padding: '0 22px', height: '42px',
              background: (!loading && isValidMsisdn) ? '#ff6600' : '#d0d5dd',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontWeight: 600, fontSize: '13px',
              fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)",
              letterSpacing: '0.02em',
              cursor: (!loading && isValidMsisdn) ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s, box-shadow 0.2s',
              boxShadow: (!loading && isValidMsisdn) ? '0 1px 3px rgba(255,102,0,0.3)' : 'none'
            }}
          >
            {loading ? 'Loading...' : 'Envoyer'}
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            style={{
              padding: '0 16px', height: '42px',
              background: '#fff', color: '#667085',
              border: '1px solid #eaecf0', borderRadius: '8px',
              fontWeight: 500, fontSize: '13px', cursor: 'pointer',
              fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
            }}
          >
            Clear
          </button>
        </div>
        {error && <div style={{ color: '#b42318', fontSize: '13px', width: '100%', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>{error}</div>}
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '20px',
        alignItems: 'start'
      }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Orange balance hero card */}
          <div style={{
            background: 'linear-gradient(145deg, #ff6600 0%, #e85000 60%, #cc4400 100%)',
            borderRadius: '14px',
            padding: '24px 28px',
            boxShadow: '0 4px 20px rgba(255, 102, 0, 0.32)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute', right: '-20px', bottom: '-20px',
              width: '180px', height: '180px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)'
            }} />
            <div style={{
              position: 'absolute', right: '60px', bottom: '40px',
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)'
            }} />

            <div style={{ position: 'relative' }}>
              <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                MAIN BALANCE
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '38px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.5px', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                  {hasData ? searchResults.balance : '—'}
                </h2>
                {hasData && (
                  <div style={{
                    background: 'rgba(255,255,255,0.15)', borderRadius: '8px',
                    padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ opacity: 0.7, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)", fontWeight: 600 }}>MSISDN</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)", letterSpacing: '0.04em' }}>+{searchResults.subscriberNumber}</span>
                  </div>
                )}
              </div>
              {hasData && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openModal('refill')}
                    style={{
                      padding: '8px 16px', border: '1.5px solid rgba(255,255,255,0.6)',
                      background: 'transparent', color: 'white', borderRadius: '8px',
                      fontWeight: 600, fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >
                    Refill Account
                  </button>
                  <button
                    onClick={toggleFafCug}
                    style={{
                      padding: '8px 16px', border: 'none',
                      background: 'rgba(0,0,0,0.18)', color: 'white', borderRadius: '8px',
                      fontWeight: 600, fontSize: '12px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
                      fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.18)'}
                  >
                    {showFafCug ? 'Hide FAF' : 'FAF & Community'} <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => openModal('refill-barring')}
                    style={{
                      padding: '8px 16px', border: 'none',
                      background: 'rgba(0,0,0,0.18)', color: 'white', borderRadius: '8px',
                      fontWeight: 600, fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.28)'}
                    onMouseLeave={e => e.target.style.background = 'rgba(0,0,0,0.18)'}
                  >
                    Refill Barring
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FAF & Community expanded section */}
          {showFafCug && (searchResults.fafData || searchResults.cugData) && (
            <div style={{
              background: '#fff', borderRadius: '14px',
              border: '1px solid #eaecf0',
              boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
              padding: '18px 20px',
              animation: 'fadeIn 0.2s ease'
            }}>
              <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#101828', borderBottom: '1px solid #eaecf0', paddingBottom: '10px' }}>
                FAF & Community ID
              </h3>
              {searchResults.fafData && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#374151' }}>FAF Numbers</h4>
                    <button className="action-btn" style={{ fontSize: '12px', padding: '5px 12px' }} onClick={() => openModal('faf-add')}>+ Add FAF</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                    {searchResults.fafData.fafNumbers.map((faf, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', border: '1px solid #f2f4f7' }}>
                        <div>
                          <strong style={{ fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>{faf.fafNumber}</strong>
                          {faf.description && <span style={{ color: '#667085', marginLeft: '8px', fontSize: '12px' }}>{faf.description}</span>}
                        </div>
                        <button className="action-btn action-btn-danger" style={{ fontSize: '11px', padding: '3px 8px' }}
                          onClick={() => openModal('faf-remove', { fafNumber: faf.fafNumber, fafIndicator: faf.fafIndicator })}>✕</button>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: '#22c55e', background: '#dcfce7', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                    Status: {searchResults.fafData.status}
                  </span>
                </div>
              )}
              {searchResults.cugData && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#374151' }}>Community Group</h4>
                    <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => openModal('update-community-list')}>✏️ Edit</button>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                    ID: <strong style={{ color: '#1a1d23' }}>{searchResults.cugData.communityId || 'N/A'}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Dedicated Accounts card (permanent, not in tabs) */}
          <div style={{
            background: '#fff', borderRadius: '14px',
            border: '1px solid #eaecf0',
            boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f2f4f7' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#101828' }}>Dedicated Accounts</h3>
              <span style={{ fontSize: '11px', color: '#667085', fontWeight: 500, background: '#f2f4f7', padding: '3px 9px', borderRadius: '20px', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                {searchResults.dedicatedAccounts.length} entries
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#667085', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Account Name</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#667085', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Balance</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#667085', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Expiry Date</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#667085', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.dedicatedAccounts.length > 0 ? (
                  searchResults.dedicatedAccounts.map((da, i) => {
                    const isEmpty = !da.value || da.value === '0' || da.value === '0.000';
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f9fafb' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '12px 20px', fontSize: '13px', fontWeight: 600, color: '#101828', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>{da.description || `DA ${da.id}`}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: '#344054', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)", fontWeight: 500 }}>{da.value}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#667085', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>{formatDate(da.expiryDate)}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {isEmpty ? (
                            <span style={{ background: '#f2f4f7', color: '#98a2b3', padding: '3px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Empty</span>
                          ) : (
                            <span style={{ background: 'var(--sonic-green-bg, #ecfdf3)', color: 'var(--sonic-green-text, #027a48)', padding: '3px 9px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>Active</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '28px 20px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                      {hasData ? 'No dedicated accounts' : 'Search a subscriber to view dedicated accounts'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tabs section */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #eaecf0', boxShadow: '0 1px 4px rgba(16,24,40,0.06)', overflow: 'hidden' }}>
            {/* Tab bar */}
            <div style={{ display: 'flex', background: '#f9fafb', borderBottom: '1px solid #e8eaed', overflowX: 'auto' }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '13px 16px',
                    border: 'none',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    borderBottom: activeTab === tab ? '2px solid #ff6600' : '2px solid transparent',
                    color: activeTab === tab ? '#ff6600' : '#667085',
                    fontWeight: activeTab === tab ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)",
                    minWidth: '130px'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ padding: '20px 24px' }}>
              {/* Global search */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  border: '1.5px solid #eaecf0', borderRadius: '8px',
                  padding: '0 12px', height: '36px', background: '#f9fafb',
                  transition: 'border-color 0.2s'
                }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = '#ff6600'}
                  onBlurCapture={e => e.currentTarget.style.borderColor = '#e8eaed'}
                >
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>🔍</span>
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search..."
                    style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', color: '#101828', width: '180px', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}
                  />
                </div>
              </div>

              {/* Tab content */}
              <div style={{ overflowX: 'auto' }}>
                {activeTab === 'Accumulator' && (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {hasData && (
                          <th colSpan="5" style={{ padding: '8px 16px', textAlign: 'right', background: 'transparent', border: 'none', fontWeight: 'normal' }}>
                            <button className="action-btn action-btn-secondary" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => openModal('update-accumulators')}>📝 Update Accumulators</button>
                          </th>
                        )}
                      </tr>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Accumulator ID', 'Value', 'Start Date', 'Reset Date', 'Description'].map(h => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e8eaed' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(searchResults.accumulators || [], globalSearch).length > 0 ? (
                        filterData(searchResults.accumulators, globalSearch).map((acc, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={tdStyle}>{acc.accumulatorID}</td>
                            <td style={tdStyle}>{acc.accumulatorValue}</td>
                            <td style={tdStyle}>{formatDate(acc.accumulatorStartDate)}</td>
                            <td style={tdStyle}>{acc.accumulatorResetDate ? formatDate(acc.accumulatorResetDate) : 'N/A'}</td>
                            <td style={tdStyle}>{acc.description || '—'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="5" style={emptyTdStyle}>{hasData ? 'No accumulators available' : 'Search a subscriber first'}</td></tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === 'Offer' && (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Offer ID', 'Expiry Date', 'Start Date', 'Description'].map(h => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e8eaed' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(searchResults.offers, globalSearch).length > 0 ? (
                        filterData(searchResults.offers, globalSearch).map((offer, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={tdStyle}>{offer.offerID}</td>
                            <td style={tdStyle}>{formatDate(offer.expiryDate)}</td>
                            <td style={tdStyle}>{offer.startDate ? formatDate(offer.startDate) : '—'}</td>
                            <td style={tdStyle}>{offer.description || '—'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" style={emptyTdStyle}>{hasData ? 'No offers available' : 'Search a subscriber first'}</td></tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === 'Usage Thresholds/Counters' && (
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr><th colSpan="3" style={{ padding: '8px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#ff6600', background: '#fff5f0', borderRadius: '6px 6px 0 0', border: 'none' }}>Counters</th></tr>
                          <tr style={{ background: '#f9fafb' }}>
                            {['Counter ID', 'Description', 'Value (GB)'].map(h => (
                              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e8eaed' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filterData(searchResults.usageThresholdsAndCounters, globalSearch).length > 0 ? (
                            filterData(searchResults.usageThresholdsAndCounters, globalSearch).map((counter, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={tdStyle}>{counter.usageCounterID}</td>
                                <td style={tdStyle}>{counter.description || '—'}</td>
                                <td style={tdStyle}>{bytesToGB(counter.usageCounterValue)}</td>
                              </tr>
                            ))
                          ) : (
                            <tr><td colSpan="3" style={emptyTdStyle}>{hasData ? 'No counters available' : 'Search a subscriber first'}</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr><th colSpan="2" style={{ padding: '8px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#ff6600', background: '#fff5f0', borderRadius: '6px 6px 0 0', border: 'none' }}>Thresholds</th></tr>
                          <tr style={{ background: '#f9fafb' }}>
                            {['Threshold ID', 'Value (GB)'].map(h => (
                              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e8eaed' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.usageThresholdsAndCounters.flatMap(c => c.usageThresholdInformation || []).length > 0 ? (
                            searchResults.usageThresholdsAndCounters.flatMap(c => c.usageThresholdInformation || []).map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={tdStyle}>{t.usageThresholdID}</td>
                                <td style={tdStyle}>{t.usageThresholdValue}</td>
                              </tr>
                            ))
                          ) : (
                            <tr><td colSpan="2" style={emptyTdStyle}>No thresholds</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'Promotion' && (
                  <div>
                    {hasData && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                        <button className="action-btn action-btn-secondary" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => openModal('update-promotion-counters')}>🔄 Update Counters</button>
                      </div>
                    )}
                    {searchResults.promotionCounters && (
                      <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e8eaed' }}>
                        <strong style={{ fontSize: '13px', color: '#374151' }}>Promotion Counters</strong>
                        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {Object.entries(searchResults.promotionCounters).map(([k, v]) => (
                            <div key={k} style={{ fontSize: '13px' }}><span style={{ color: '#6b7280' }}>{k}:</span> <strong>{String(v)}</strong></div>
                          ))}
                        </div>
                      </div>
                    )}
                    <strong style={{ fontSize: '13px', color: '#374151' }}>Promotion Plans</strong>
                    {searchResults.promotionPlans.length > 0 ? (
                      <table style={{ width: '100%', marginTop: '8px', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: '#f9fafb' }}>
                            {['Plan ID', 'Start Date', 'End Date', 'Actions'].map(h => (
                              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e8eaed' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.promotionPlans.map((plan, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                              <td style={tdStyle}>{plan.promotionPlanID ?? plan.planId ?? plan.promotionPlanId}</td>
                              <td style={tdStyle}>{(plan.promotionStartDate || plan.startDate) ? formatDate(plan.promotionStartDate || plan.startDate) : 'N/A'}</td>
                              <td style={tdStyle}>{(plan.promotionEndDate || plan.endDate) ? formatDate(plan.promotionEndDate || plan.endDate) : 'N/A'}</td>
                              <td style={tdStyle}>
                                <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '3px 8px' }}
                                  onClick={() => openModal('update-promotion-plan', { planId: plan.promotionPlanID ?? plan.planId ?? plan.promotionPlanId, oldStartDate: plan.promotionStartDate || plan.startDate, oldEndDate: plan.promotionEndDate || plan.endDate })}>
                                  📋 Update
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ color: '#9ca3af', marginTop: '8px', fontSize: '13px' }}>{hasData ? 'No promotion plans available' : 'Search a subscriber first'}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Footer count */}
              <div style={{ marginTop: '14px', padding: '10px 0', borderTop: '1px solid #f2f4f7', color: '#98a2b3', fontSize: '11px', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                {activeTab === 'Accumulator' && `${filterData(searchResults.accumulators, globalSearch).length} of ${searchResults.accumulators.length} entries`}
                {activeTab === 'Offer' && `${filterData(searchResults.offers, globalSearch).length} of ${searchResults.offers.length} entries`}
                {activeTab === 'Usage Thresholds/Counters' && `${searchResults.usageThresholdsAndCounters.length} counters`}
                {activeTab === 'Promotion' && `${searchResults.promotionPlans.length} plans`}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Subscription Status */}
          <div style={cardStyle}>
            <p style={cardLabelStyle}>SUBSCRIPTION STATUS</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#101828', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                  {hasData ? `SC ${searchResults.serviceClass}` : '—'}
                </p>
                {hasData && searchResults.activationDate && (
                  <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#667085', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                    Since {formatDate(searchResults.activationDate)}
                  </p>
                )}
              </div>
              {hasData && (
                <span style={{ background: 'var(--sonic-green-bg, #ecfdf3)', color: 'var(--sonic-green-text, #027a48)', padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', flexShrink: 0, letterSpacing: '0.06em', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>
                  {searchResults.status || 'Active'}
                </span>
              )}
            </div>
            {hasData && (
              <>
                <div style={infoRowStyle}>
                  <span style={infoLabelStyle}>SUB NUMBER</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#101828', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>{searchResults.subscriberNumber}</span>
                </div>
                <div style={infoRowStyle}>
                  <span style={infoLabelStyle}>BARRING</span>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px',
                    background: isBlocked ? 'var(--sonic-red-bg, #fef3f2)' : 'var(--sonic-green-bg, #ecfdf3)',
                    color: isBlocked ? 'var(--sonic-red-text, #b42318)' : 'var(--sonic-green-text, #027a48)',
                    fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)",
                    letterSpacing: '0.05em', textTransform: 'uppercase'
                  }}>
                    {isBlocked ? 'BLOCKED' : 'NO BARRING'}
                  </span>
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 9px' }} onClick={() => openModal('update-account-details')}>USSD</button>
                  <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 9px' }} onClick={() => openModal('subscriber-segmentation')}>Segment</button>
                  <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 9px' }} onClick={() => openModal('link-subordinate')}>Link Sub</button>
                  <button className="action-btn action-btn-secondary" style={{ fontSize: '11px', padding: '4px 9px' }} onClick={() => openModal('install')}>Install</button>
                  <button className="action-btn action-btn-danger" style={{ fontSize: '11px', padding: '4px 9px' }} onClick={() => openModal('delete')}>Delete</button>
                </div>
              </>
            )}
            {!hasData && <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>Search a subscriber to view</p>}
          </div>

          {/* Data Usage */}
          <div style={cardStyle}>
            <p style={cardLabelStyle}>DATA USAGE PLAN</p>
            {hasData && usageCounter ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ background: '#f2f4f7', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${usagePercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff6600, #ff8533)',
                      borderRadius: '4px',
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 700, color: '#101828', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>{bytesToGB(usageCounter.usageCounterValue)} used</span>
                  {thresholdBytes > 0 && <span style={{ color: '#667085', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>{bytesToGB(thresholdBytes)} Total</span>}
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#98a2b3', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                  {usageCounter.usageCounterID} — {usageCounter.description || ''}
                </p>
              </>
            ) : (
              <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                {hasData ? 'No usage data available' : 'Search a subscriber to view'}
              </p>
            )}
          </div>

          {/* Quick Support (dark card) */}
          <div style={{ background: '#1a1d26', borderRadius: '14px', padding: '20px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, color: '#ffffff', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)", letterSpacing: '0.02em' }}>Quick Support</p>
            {[
              { icon: <Shield size={18} />, label: isBlocked ? 'Unblock Line' : 'Block Line', action: () => openModal('block') },
              { icon: <CreditCard size={18} />, label: 'Refill Account', action: () => openModal('refill') },
              { icon: <Settings size={18} />, label: 'Change Service Class', action: () => openModal('service-class') }
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 0',
                  background: 'none', border: 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ background: 'rgba(255,102,0,0.18)', color: '#ff6600', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: 500, color: '#e5e7eb', fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)" }}>{item.label}</span>
                <ChevronRight size={14} color="#6b7280" />
              </button>
            ))}
          </div>

          {/* Account Info (dates) */}
          <div style={cardStyle}>
            <p style={cardLabelStyle}>ACCOUNT INFO</p>
            {[
              { label: 'Service Fee', value: searchResults.serviceFee },
              { label: 'Supervision Fee', value: searchResults.supervisionFee },
              { label: 'Service Removal', value: searchResults.serviceRemoval }
            ].map((row, i) => (
              <div key={i} style={{ ...infoRowStyle, paddingBottom: i < 2 ? '10px' : 0, borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none', marginBottom: i < 2 ? '10px' : 0 }}>
                <span style={infoLabelStyle}>{row.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#101828', fontFamily: "var(--sonic-font-mono, 'IBM Plex Mono', monospace)" }}>
                  {row.value ? formatDate(row.value) : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .action-btn {
          background: #ff6600;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: background 0.2s, box-shadow 0.2s;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
          letter-spacing: 0.01em;
        }
        .action-btn:hover { background: #e05500; box-shadow: 0 1px 4px rgba(255,102,0,0.25); }
        .action-btn-secondary { background: #eaecf0; color: #344054; }
        .action-btn-secondary:hover { background: #d0d5dd; box-shadow: none; }
        .action-btn-danger { background: #fef3f2; color: #b42318; border: 1px solid #fecdca; }
        .action-btn-danger:hover { background: #fee4e2; box-shadow: none; }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(16, 24, 40, 0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 2000; backdrop-filter: blur(3px);
        }
        .modal-card {
          background: white; border-radius: 16px;
          width: 90%; max-width: 440px;
          box-shadow: 0 24px 48px rgba(16,24,40,0.22);
          overflow: hidden;
          animation: modalSlide 0.22s ease;
        }
        @keyframes modalSlide {
          from { opacity: 0; transform: translateY(-16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-header {
          background: #ffffff;
          border-top: 3px solid #ff6600;
          color: #101828;
          padding: 18px 24px;
          font-weight: 700; font-size: 15px;
          border-bottom: 1px solid #f2f4f7;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
        }
        .modal-body {
          padding: 20px 24px; font-size: 13px; color: #344054;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
        }
        .modal-body p { margin: 0 0 10px 0; line-height: 1.6; }
        .modal-field { margin-bottom: 14px; }
        .modal-field label {
          display: block; font-weight: 600; color: #344054;
          margin-bottom: 5px; font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.06em;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
        }
        .modal-field input, .modal-field select {
          width: 100%; padding: 8px 12px;
          border: 1.5px solid #eaecf0; border-radius: 8px;
          font-size: 13px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
          color: #101828; background: #fff;
        }
        .modal-field input:focus, .modal-field select:focus {
          border-color: #ff6600;
          box-shadow: 0 0 0 3px rgba(255,102,0,0.08);
        }
        .modal-result {
          padding: 9px 13px; border-radius: 8px;
          margin-bottom: 14px; font-weight: 600; font-size: 12px;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif);
        }
        .modal-result-success { background: #ecfdf3; color: #027a48; border: 1px solid #a9efc5; }
        .modal-result-error { background: #fef3f2; color: #b42318; border: 1px solid #fecdca; }
        .modal-footer {
          padding: 14px 24px; display: flex; gap: 10px;
          justify-content: flex-end; border-top: 1px solid #f2f4f7;
          background: #fafafa;
        }
        .modal-btn-cancel {
          padding: 8px 16px; border-radius: 8px;
          border: 1px solid #d0d5dd; background: white;
          color: #344054; font-weight: 600; cursor: pointer;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif); font-size: 13px;
          transition: all 0.2s;
        }
        .modal-btn-cancel:hover { background: #f9fafb; border-color: #98a2b3; }
        .modal-btn-confirm {
          padding: 8px 18px; border-radius: 8px; border: none;
          background: #ff6600; color: white;
          font-weight: 600; cursor: pointer;
          font-family: var(--sonic-font-ui, 'IBM Plex Sans', sans-serif); font-size: 13px;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(255,102,0,0.25);
        }
        .modal-btn-confirm:hover:not(:disabled) { background: #e05500; box-shadow: 0 2px 6px rgba(255,102,0,0.3); }
        .modal-btn-confirm:disabled, .modal-btn-cancel:disabled { opacity: 0.45; cursor: not-allowed; }

        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Modal Overlay */}
      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-card">
            <div className="modal-header">
              {modal.type === 'block' && (isBlocked ? 'Unblock Subscriber' : 'Block Subscriber')}
              {modal.type === 'service-class' && 'Change Service Class'}
              {modal.type === 'refill' && 'Refill Account'}
              {modal.type === 'faf-add' && 'Add FAF Entry'}
              {modal.type === 'faf-remove' && 'Remove FAF Entry'}
              {modal.type === 'install' && 'Install Subscriber'}
              {modal.type === 'delete' && 'Delete Subscriber'}
              {modal.type === 'link-subordinate' && 'Link Subordinate'}
              {modal.type === 'update-account-details' && 'Update USSD Notification'}
              {modal.type === 'subscriber-segmentation' && 'Update Segmentation'}
              {modal.type === 'update-community-list' && 'Update Community List'}
              {modal.type === 'update-accumulators' && 'Update Accumulators'}
              {modal.type === 'refill-barring' && 'Update Refill Barring'}
              {modal.type === 'update-promotion-counters' && 'Update Promotion Counters'}
              {modal.type === 'update-promotion-plan' && 'Update Promotion Plan'}
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
                  <p>{isBlocked ? 'This will unblock the subscriber and restore service.' : 'This will block the subscriber from using the service.'}</p>
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
                    <select value={modalInput.action || 'SetOriginal'}
                      onChange={e => setModalInput(p => ({ ...p, action: e.target.value }))}>
                      <option value="SetOriginal">SetOriginal — Set permanent service class</option>
                      <option value="SetTemporary">SetTemporary — Temporary override</option>
                      <option value="DeleteTemporary">DeleteTemporary — Remove temporary override</option>
                    </select>
                  </div>
                </div>
              )}

              {modal.type === 'refill' && (
                <div>
                  <div className="modal-field">
                    <label>Refill Type</label>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}>
                        <input type="radio" name="refillType" value="voucher"
                          checked={(modalInput.refillType || 'voucher') === 'voucher'}
                          onChange={() => setModalInput(p => ({ ...p, refillType: 'voucher' }))} />
                        Voucher Code
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}>
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
                        <input type="text" value={modalInput.currency || 'TND'}
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
                    <label htmlFor="tmpBlocked" style={{ margin: 0, textTransform: 'none', letterSpacing: 'normal', fontWeight: 500 }}>Temporarily Blocked</label>
                  </div>
                </div>
              )}

              {modal.type === 'delete' && (
                <div>
                  <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '6px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px' }}>
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
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0' }}>Will link 216{msisdn} as subordinate to 216{modalInput.masterAccountNumber || '????????'}</p>
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
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Current: {searchResults.cugData?.communityId || 'N/A'}</p>
                </div>
              )}

              {modal.type === 'update-accumulators' && (
                <div>
                  {searchResults.accumulators && searchResults.accumulators.length > 0 ? (
                    searchResults.accumulators.map((acc, i) => (
                      <div key={i} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '10px', marginBottom: '10px' }}>
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
                    <p style={{ color: '#9ca3af', fontSize: '13px' }}>No accumulators loaded. Search for a subscriber first.</p>
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
                    <select value={modalInput.action || 'ADD'}
                      onChange={e => setModalInput(p => ({ ...p, action: e.target.value }))}>
                      <option value="ADD">ADD — Add new plan</option>
                      <option value="SET">SET — Replace plan dates</option>
                      <option value="DELETE">DELETE — Remove plan</option>
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
                    handleUpdate('block', { blocked: !isBlocked });
                  } else if (modal.type === 'service-class') {
                    handleUpdate('service-class', { action: modalInput.action || 'SetOriginal', serviceClassNew: parseInt(modalInput.serviceClassNew) });
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
                      action: modalInput.action || 'ADD',
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

// Shared style objects
const cardStyle = {
  background: '#fff',
  borderRadius: '14px',
  border: '1px solid #eaecf0',
  boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
  padding: '18px 20px'
};

const cardLabelStyle = {
  margin: '0 0 12px',
  fontSize: '10px',
  fontWeight: 700,
  color: '#98a2b3',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
};

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const infoLabelStyle = {
  fontSize: '10px',
  fontWeight: 600,
  color: '#98a2b3',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '13px',
  color: '#344054',
  fontWeight: 400,
  fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
};

const emptyTdStyle = {
  padding: '24px 16px',
  textAlign: 'center',
  color: '#98a2b3',
  fontSize: '13px',
  fontFamily: "var(--sonic-font-ui, 'IBM Plex Sans', sans-serif)"
};

export default MSISDNContent;
