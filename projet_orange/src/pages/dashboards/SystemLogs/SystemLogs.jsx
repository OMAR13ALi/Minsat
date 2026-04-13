import { useState, useEffect, useCallback, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

const API = 'http://localhost:5000';

// ── Color maps ────────────────────────────────────────────────────────────────

const ACTION_COLORS = {
  MSISDN_QUERY:            { bg: '#e8f4fd', color: '#1a6fa8', label: 'MSISDN Query' },
  ACCOUNT_QUERY:           { bg: '#e8f4fd', color: '#1a6fa8', label: 'Account Query' },
  BALANCE_QUERY:           { bg: '#e8f4fd', color: '#1a6fa8', label: 'Balance Query' },
  FAF_QUERY:               { bg: '#e8f4fd', color: '#1a6fa8', label: 'FAF Query' },
  ACCUMULATOR_QUERY:       { bg: '#e8f4fd', color: '#1a6fa8', label: 'Accumulator Query' },
  PROMOTION_QUERY:         { bg: '#e8f4fd', color: '#1a6fa8', label: 'Promotion Query' },
  HLR_QUERY:               { bg: '#e8f4fd', color: '#1a6fa8', label: 'HLR Query' },
  SC_QUERY:                { bg: '#e8f4fd', color: '#1a6fa8', label: 'SC Query' },
  REFILL_OPTIONS_QUERY:    { bg: '#e8f4fd', color: '#1a6fa8', label: 'Refill Options' },
  UPDATE_BLOCK:            { bg: '#fff3e0', color: '#e65100', label: 'Block/Unblock' },
  UPDATE_SERVICE_CLASS:    { bg: '#fff3e0', color: '#e65100', label: 'Service Class' },
  UPDATE_REFILL:           { bg: '#e8f5e9', color: '#2e7d32', label: 'Refill' },
  UPDATE_FAF:              { bg: '#fce4ec', color: '#c62828', label: 'FAF Update' },
  UPDATE_BALANCE:          { bg: '#fce4ec', color: '#c62828', label: 'Balance Adjust' },
  UPDATE_ACCOUNT_DETAILS:  { bg: '#fff3e0', color: '#e65100', label: 'Account Details' },
  UPDATE_COMMUNITY:        { bg: '#fff3e0', color: '#e65100', label: 'Community' },
  UPDATE_SEGMENTATION:     { bg: '#fff3e0', color: '#e65100', label: 'Segmentation' },
  UPDATE_INSTALL:          { bg: '#f3e5f5', color: '#6a1b9a', label: 'Install' },
  UPDATE_DELETE:           { bg: '#ffebee', color: '#b71c1c', label: 'DELETE' },
  UPDATE_LINK_SUBORDINATE: { bg: '#fff3e0', color: '#e65100', label: 'Link Sub.' },
  UPDATE_REFILL_BARRING:   { bg: '#fff3e0', color: '#e65100', label: 'Refill Barring' },
  UPDATE_PROMOTION_COUNTERS:{ bg: '#fff3e0', color: '#e65100', label: 'Promo Counters' },
  UPDATE_PROMOTION_PLAN:   { bg: '#fff3e0', color: '#e65100', label: 'Promo Plan' },
  UPDATE_ACCUMULATORS:     { bg: '#fff3e0', color: '#e65100', label: 'Accumulators' },
  LOGIN_SUCCESS:           { bg: '#e8f5e9', color: '#1b5e20', label: 'Login ✓' },
  LOGIN_FAILURE:           { bg: '#ffebee', color: '#b71c1c', label: 'Login ✗' },
};

function ActionBadge({ type }) {
  const cfg = ACTION_COLORS[type] || { bg: '#f5f5f5', color: '#555', label: type };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 600,
      background: cfg.bg,
      color: cfg.color,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }) {
  const ok = status === 'SUCCESS';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 700,
      background: ok ? '#e8f5e9' : '#ffebee',
      color: ok ? '#2e7d32' : '#c62828',
    }}>
      {status}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${accent}`,
      minWidth: 0,
    }}>
      <div style={{ fontSize: '13px', color: '#888', fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: '#aaa', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ── Format helpers ────────────────────────────────────────────────────────────

function fmtTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    + ' ' + d.toLocaleDateString('fr-TN', { day: '2-digit', month: '2-digit' });
}

function fmtDetails(details) {
  if (!details) return '—';
  try {
    const obj = typeof details === 'string' ? JSON.parse(details) : details;
    return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(' · ') || '—';
  } catch {
    return details;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SystemLogs() {
  const [logs, setLogs]       = useState([]);
  const [stats, setStats]     = useState(null);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(0);
  const [loading, setLoading]     = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError]         = useState(null);

  const [filters, setFilters] = useState({
    userLogin:  '',
    actionType: '',
    msisdn:     '',
    status:     '',
    from:       '',
    to:         '',
  });

  const SIZE = 25;

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/logs/stats`);
      if (res.ok) setStats(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchLogs = useCallback(async (currentPage = 0, currentFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: currentPage, size: SIZE });
      if (currentFilters.userLogin)  params.set('userLogin',  currentFilters.userLogin);
      if (currentFilters.actionType) params.set('actionType', currentFilters.actionType);
      if (currentFilters.msisdn)     params.set('msisdn',     currentFilters.msisdn);
      if (currentFilters.status)     params.set('status',     currentFilters.status);
      if (currentFilters.from)       params.set('from',       currentFilters.from.replace('T', ' ') + ':00');
      if (currentFilters.to)         params.set('to',         currentFilters.to.replace('T', ' ')   + ':00');

      const res = await fetch(`${API}/admin/logs?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLogs(data.logs || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    fetchStats();
    fetchLogs(0, filters);
    // Auto-refresh stats every 30s
    const t = setInterval(fetchStats, 30000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setPage(0);
    fetchLogs(0, filters);
  };

  const handleClear = () => {
    const cleared = { userLogin: '', actionType: '', msisdn: '', status: '', from: '', to: '' };
    setFilters(cleared);
    setPage(0);
    fetchLogs(0, cleared);
  };

  const exportToExcel = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (filters.userLogin)  params.set('userLogin',  filters.userLogin);
      if (filters.actionType) params.set('actionType', filters.actionType);
      if (filters.msisdn)     params.set('msisdn',     filters.msisdn);
      if (filters.status)     params.set('status',     filters.status);
      if (filters.from)       params.set('from',       filters.from.replace('T', ' ') + ':00');
      if (filters.to)         params.set('to',         filters.to.replace('T', ' ')   + ':00');

      const res = await fetch(`${API}/admin/logs/export?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const rows = data.map(l => ({
        'Timestamp':  l.timestamp ? l.timestamp.replace('T', ' ').substring(0, 19) : '',
        'User':       l.userLogin    || '',
        'Role':       l.userRole     || '',
        'Action':     l.actionType   || '',
        'MSISDN':     l.targetMsisdn || '',
        'Details':    fmtDetails(l.details),
        'Status':     l.status       || '',
        'AIR Code':   l.airResponseCode || '',
        'IP Address': l.ipAddress    || '',
      }));

      const ws = XLSX.utils.json_to_sheet(rows);

      // Auto-fit column widths
      const colWidths = Object.keys(rows[0] || {}).map(key => ({
        wch: Math.min(50, Math.max(key.length, ...rows.map(r => String(r[key] || '').length)))
      }));
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'System Logs');

      // Build filename with active filters
      const today = new Date().toISOString().slice(0, 10);
      const parts = ['SystemLogs', today];
      if (filters.userLogin)  parts.push(`user-${filters.userLogin}`);
      if (filters.actionType) parts.push(filters.actionType);
      if (filters.status)     parts.push(filters.status);
      XLSX.writeFile(wb, parts.join('_') + '.xlsx');
    } catch (e) {
      alert('Export failed: ' + e.message);
    } finally {
      setExporting(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchLogs(newPage, filters);
  };

  const totalPages = Math.ceil(total / SIZE);

  // ── Styles ──────────────────────────────────────────────────────────────────

  const s = {
    container: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      color: '#1a1a2e',
    },
    header: {
      marginBottom: '24px',
    },
    title: {
      fontSize: '22px',
      fontWeight: 700,
      color: '#1a1a2e',
      margin: 0,
    },
    subtitle: {
      fontSize: '13px',
      color: '#888',
      marginTop: '4px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    filterCard: {
      background: '#fff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      marginBottom: '20px',
    },
    filterRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      alignItems: 'flex-end',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '11px',
      fontWeight: 600,
      color: '#888',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    input: {
      padding: '7px 10px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '13px',
      outline: 'none',
      width: '140px',
      background: '#fafafa',
    },
    select: {
      padding: '7px 10px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '13px',
      outline: 'none',
      background: '#fafafa',
      cursor: 'pointer',
    },
    btnSearch: {
      padding: '7px 18px',
      background: '#ff6600',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    btnClear: {
      padding: '7px 14px',
      background: '#f5f5f5',
      color: '#555',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '13px',
      cursor: 'pointer',
    },
    btnExcel: {
      padding: '7px 14px',
      background: '#1d6f42',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: exporting ? 0.7 : 1,
    },
    tableCard: {
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '140px 110px 60px 160px 100px 1fr 80px 80px',
      padding: '10px 16px',
      background: '#f8f9fb',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '11px',
      fontWeight: 700,
      color: '#888',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '140px 110px 60px 160px 100px 1fr 80px 80px',
      padding: '10px 16px',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '12px',
      alignItems: 'center',
    },
    cell: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    pager: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderTop: '1px solid #f0f0f0',
      fontSize: '13px',
      color: '#666',
    },
    pagerBtns: {
      display: 'flex',
      gap: '6px',
    },
    pagerBtn: {
      padding: '5px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      background: '#fff',
      cursor: 'pointer',
      fontSize: '13px',
    },
    clickableCell: {
      cursor: 'pointer',
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
      textDecorationColor: '#bbb',
    },
  };

  const topUsers = useMemo(() => {
    const map = {};
    logs.forEach(l => {
      if (!l.userLogin) return;
      if (!map[l.userLogin]) map[l.userLogin] = { queries: 0, updates: 0 };
      if (l.actionType?.endsWith('_QUERY'))    map[l.userLogin].queries++;
      if (l.actionType?.startsWith('UPDATE_')) map[l.userLogin].updates++;
    });
    return Object.entries(map)
      .map(([user, c]) => ({ user, ...c, total: c.queries + c.updates }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [logs]);

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>System Logs</h1>
        <p style={s.subtitle}>
          All user activity · Auto-refreshes stats every 30s
          {stats && <span style={{ marginLeft: 12, color: '#ff6600' }}>
            {stats.totalToday} actions today
          </span>}
        </p>
      </div>

      {/* Stats cards */}
      <div style={s.statsGrid}>
        <StatCard label="Total Today"    value={stats?.totalToday   ?? '—'} accent="#ff6600" />
        <StatCard label="All Queries"    value={stats?.queriesToday ?? '—'} accent="#1a6fa8" />
        <StatCard label="Updates"        value={stats?.updatesToday ?? '—'} accent="#e65100" />
        <StatCard label="Logins"         value={stats?.loginsToday  ?? '—'} accent="#2e7d32" />
        <StatCard label="Active Users"   value={stats?.activeUsers  ?? '—'} accent="#6a1b9a" />
        <StatCard label="Failures"       value={stats?.failuresToday ?? '—'} accent="#c62828" />
      </div>

      {/* Top Users panel */}
      {topUsers.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          marginBottom: '20px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, color: '#888',
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
          }}>
            Top Users (current view)
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {topUsers.map(u => (
              <div key={u.user}
                style={{
                  background: '#f8f9fb', borderRadius: '8px', padding: '8px 14px',
                  cursor: 'pointer', border: '1px solid #e2e8f0',
                  transition: 'border-color 0.15s',
                }}
                title={`Filter by ${u.user}`}
                onClick={() => {
                  const next = { ...filters, userLogin: u.user };
                  setFilters(next);
                  setPage(0);
                  fetchLogs(0, next);
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#1a1a2e' }}>{u.user}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: 2 }}>
                  {u.queries} queries · {u.updates} updates
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={s.filterCard}>
        <div style={s.filterRow}>
          <div style={s.filterGroup}>
            <span style={s.label}>User</span>
            <input
              style={s.input}
              placeholder="username..."
              value={filters.userLogin}
              onChange={e => handleFilterChange('userLogin', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div style={s.filterGroup}>
            <span style={s.label}>Action</span>
            <select style={s.select} value={filters.actionType}
              onChange={e => handleFilterChange('actionType', e.target.value)}>
              <option value="">All actions</option>
              <optgroup label="Queries">
                <option value="MSISDN_QUERY">MSISDN Query</option>
                <option value="ACCOUNT_QUERY">Account Query</option>
                <option value="BALANCE_QUERY">Balance Query</option>
                <option value="FAF_QUERY">FAF Query</option>
                <option value="ACCUMULATOR_QUERY">Accumulator Query</option>
                <option value="PROMOTION_QUERY">Promotion Query</option>
                <option value="HLR_QUERY">HLR Query</option>
              </optgroup>
              <optgroup label="Updates">
                <option value="UPDATE_BLOCK">Block/Unblock</option>
                <option value="UPDATE_SERVICE_CLASS">Service Class</option>
                <option value="UPDATE_REFILL">Refill</option>
                <option value="UPDATE_FAF">FAF Update</option>
                <option value="UPDATE_BALANCE">Balance Adjust</option>
                <option value="UPDATE_DELETE">Delete Subscriber</option>
                <option value="UPDATE_INSTALL">Install Subscriber</option>
              </optgroup>
              <optgroup label="Auth">
                <option value="LOGIN_SUCCESS">Login Success</option>
                <option value="LOGIN_FAILURE">Login Failure</option>
              </optgroup>
            </select>
          </div>
          <div style={s.filterGroup}>
            <span style={s.label}>MSISDN</span>
            <input
              style={s.input}
              placeholder="69xxxxxx..."
              value={filters.msisdn}
              onChange={e => handleFilterChange('msisdn', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div style={s.filterGroup}>
            <span style={s.label}>Status</span>
            <select style={s.select} value={filters.status}
              onChange={e => handleFilterChange('status', e.target.value)}>
              <option value="">All</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILURE">Failure</option>
            </select>
          </div>
          <div style={s.filterGroup}>
            <span style={s.label}>From</span>
            <input type="datetime-local" style={{ ...s.input, width: '160px' }}
              value={filters.from}
              onChange={e => handleFilterChange('from', e.target.value)} />
          </div>
          <div style={s.filterGroup}>
            <span style={s.label}>To</span>
            <input type="datetime-local" style={{ ...s.input, width: '160px' }}
              value={filters.to}
              onChange={e => handleFilterChange('to', e.target.value)} />
          </div>
          <button style={s.btnSearch} onClick={handleSearch}>Search</button>
          <button style={s.btnClear}  onClick={handleClear}>Clear</button>
          <button style={s.btnExcel} onClick={exportToExcel} disabled={exporting}>
            <Download size={14} />
            {exporting ? 'Exporting…' : 'Excel'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={s.tableCard}>
        {/* Header row */}
        <div style={s.tableHeader}>
          <span>Timestamp</span>
          <span>User</span>
          <span>Role</span>
          <span>Action</span>
          <span>MSISDN</span>
          <span>Details</span>
          <span>Status</span>
          <span>AIR Code</span>
        </div>

        {/* Rows */}
        {loading && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>
            Loading…
          </div>
        )}
        {!loading && error && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#c62828' }}>
            Error: {error}
          </div>
        )}
        {!loading && !error && logs.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>
            No log entries found.
          </div>
        )}
        {!loading && logs.map((log, i) => (
          <div key={log.id}
            style={{
              ...s.tableRow,
              background: i % 2 === 0 ? '#fff' : '#fafafa',
            }}>
            <span style={{ ...s.cell, color: '#555', fontSize: '11px' }}>{fmtTime(log.timestamp)}</span>
            <span
              style={{ ...s.cell, ...s.clickableCell, fontWeight: 600, color: '#1a1a2e' }}
              title={`Filter by user: ${log.userLogin}`}
              onClick={() => {
                const next = { ...filters, userLogin: log.userLogin };
                setFilters(next);
                setPage(0);
                fetchLogs(0, next);
              }}
            >{log.userLogin}</span>
            <span style={{ ...s.cell, color: '#888', fontSize: '11px' }}>{log.userRole || '—'}</span>
            <span style={s.cell}><ActionBadge type={log.actionType} /></span>
            <span
              style={{
                ...s.cell, fontFamily: 'monospace', color: '#444',
                ...(log.targetMsisdn ? s.clickableCell : {}),
              }}
              title={log.targetMsisdn ? `Filter by MSISDN: ${log.targetMsisdn}` : undefined}
              onClick={log.targetMsisdn ? () => {
                const next = { ...filters, msisdn: log.targetMsisdn };
                setFilters(next);
                setPage(0);
                fetchLogs(0, next);
              } : undefined}
            >{log.targetMsisdn || '—'}</span>
            <span style={{ ...s.cell, color: '#666', fontSize: '11px' }} title={fmtDetails(log.details)}>
              {fmtDetails(log.details)}
            </span>
            <span style={s.cell}><StatusBadge status={log.status} /></span>
            <span style={{ ...s.cell, fontFamily: 'monospace', color: '#888', fontSize: '11px' }}>
              {log.airResponseCode || '—'}
            </span>
          </div>
        ))}

        {/* Pagination */}
        <div style={s.pager}>
          <span>{total} total entries · page {page + 1} of {Math.max(totalPages, 1)}</span>
          <div style={s.pagerBtns}>
            <button style={{ ...s.pagerBtn, opacity: page === 0 ? 0.4 : 1 }}
              disabled={page === 0} onClick={() => handlePageChange(0)}>«</button>
            <button style={{ ...s.pagerBtn, opacity: page === 0 ? 0.4 : 1 }}
              disabled={page === 0} onClick={() => handlePageChange(page - 1)}>‹</button>
            <button style={{ ...s.pagerBtn, opacity: page >= totalPages - 1 ? 0.4 : 1 }}
              disabled={page >= totalPages - 1} onClick={() => handlePageChange(page + 1)}>›</button>
            <button style={{ ...s.pagerBtn, opacity: page >= totalPages - 1 ? 0.4 : 1 }}
              disabled={page >= totalPages - 1} onClick={() => handlePageChange(totalPages - 1)}>»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
