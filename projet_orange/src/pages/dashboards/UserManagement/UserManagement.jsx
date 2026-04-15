import React, { useState, useEffect } from 'react';
import { Edit2, Check, Ban, Users, AlertCircle, X } from 'lucide-react';
import axios from 'axios';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const serviceMeta = {
  DFI:   { bg: '#e8f4fd', color: '#1a6fa8' },
  IN:    { bg: '#ecfdf3', color: '#027a48' },
  DSC:   { bg: '#f5f0ff', color: '#6a1b9a' },
  ADMIN: { bg: '#fff3e0', color: '#e65100' },
};

const UserManagementAdmin = () => {
  const [showInactiveOnly, setShowInactiveOnly] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editService, setEditService] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const services = ['DFI', 'DSC', 'IN', 'ADMIN'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/users/all');
        const mappedUsers = data.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          service: user.class,
          validated: user.status > 0,
        }));
        setUsers(mappedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Unable to load users. Please check your connection or the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleValidateUserApi = async (email, name, service) => {
    if (!email || !name || !service) {
      setError("All fields are required for validation.");
      return;
    }
    try {
      const { data } = await axios.post("/users/validate", { correctClass: service, email, name });
      console.log("Validation successful:", data.message);
      setUsers(prev =>
        prev.map(u => u.email === email ? { ...u, validated: true, service } : u)
      );
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Validation failed.");
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(`/users/block/${userId}`);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, validated: false } : u));
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to block user.");
    }
  };

  const handleSaveService = async (userId) => {
    try {
      await axios.patch(`/users/update/${userId}`, { class: editService });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, service: editService } : u));
      setEditingUser(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to update user service.");
    }
  };

  const handleEditService = (user) => {
    setEditingUser(user.id);
    setEditService(user.service);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditService('');
  };

  const filteredUsers = showInactiveOnly
    ? users.filter(u => !u.validated)
    : users;

  const inactiveCount = users.filter(u => !u.validated).length;
  const activeCount = users.filter(u => u.validated).length;

  const getServiceStyle = (svc) =>
    serviceMeta[svc] || { bg: '#f5f6fa', color: '#667085' };

  const btnBase = {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    flexShrink: 0,
  };

  const btnStates = {
    edit:     { default: { bg: '#fff8f5', color: '#ff6600' }, hover: { bg: '#ff6600', color: '#fff' } },
    save:     { default: { bg: '#ecfdf3', color: '#027a48' }, hover: { bg: '#027a48', color: '#fff' } },
    cancel:   { default: { bg: '#f5f6fa', color: '#667085' }, hover: { bg: '#667085', color: '#fff' } },
    validate: { default: { bg: '#ecfdf3', color: '#027a48' }, hover: { bg: '#027a48', color: '#fff' } },
    block:    { default: { bg: '#fef3f2', color: '#b42318' }, hover: { bg: '#b42318', color: '#fff' } },
  };

  const getBtnStyle = (key, id) => {
    const isHovered = hoveredBtn === `${key}-${id}`;
    const s = isHovered ? btnStates[key].hover : btnStates[key].default;
    return { ...btnBase, backgroundColor: s.bg, color: s.color };
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ padding: '24px', backgroundColor: '#f5f6fa', minHeight: '100vh', fontFamily: "'IBM Plex Sans', sans-serif" }}>

        {/* Error Banner */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#fef3f2', border: '1px solid #fecdca', borderRadius: '10px',
            padding: '12px 16px', marginBottom: '20px', animation: 'fadeIn 0.2s ease',
            color: '#b42318', fontSize: '13px', fontWeight: '500',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              {error}
            </span>
            <button
              onClick={() => setError(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b42318', display: 'flex', padding: '2px' }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '22px', background: '#ff6600', borderRadius: '2px' }} />
            <h1 style={{ fontSize: '19px', fontWeight: '700', color: '#101828', margin: 0, fontFamily: "'IBM Plex Sans', sans-serif" }}>
              User Management
            </h1>
            <span style={{
              background: '#f5f6fa', color: '#667085', fontSize: '11px',
              fontWeight: '600', padding: '3px 10px', borderRadius: '20px',
              border: '1px solid #eaecf0', letterSpacing: '0.04em',
            }}>
              {users.length} total
            </span>
          </div>

          <button
            onClick={() => setShowInactiveOnly(!showInactiveOnly)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
              fontWeight: '600', border: '1px solid',
              cursor: 'pointer', transition: 'all 0.15s ease',
              fontFamily: "'IBM Plex Sans', sans-serif",
              backgroundColor: showInactiveOnly ? '#ff6600' : '#fff',
              color: showInactiveOnly ? '#fff' : '#667085',
              borderColor: showInactiveOnly ? '#ff6600' : '#eaecf0',
            }}
          >
            <Users size={15} />
            Inactive Users
            {inactiveCount > 0 && (
              <span style={{
                background: showInactiveOnly ? 'rgba(255,255,255,0.25)' : '#fef3f2',
                color: showInactiveOnly ? '#fff' : '#b42318',
                fontSize: '10px', fontWeight: '700',
                padding: '2px 7px', borderRadius: '12px', letterSpacing: '0.04em',
              }}>
                {inactiveCount}
              </span>
            )}
          </button>
        </div>

        {/* Table Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '14px',
          border: '1px solid #eaecf0',
          boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          {/* Column Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.8fr 1fr 0.9fr 0.8fr',
            gap: '12px',
            padding: '10px 20px',
            background: '#f9fafb',
            borderBottom: '1px solid #eaecf0',
          }}>
            {['Username', 'Email', 'Service', 'Status', 'Actions'].map((h, i) => (
              <div key={h} style={{
                fontSize: '10px', fontWeight: '700', color: '#667085',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                textAlign: i === 4 ? 'center' : 'left',
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Body */}
          <div>
            {loading ? (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{
                  width: '28px', height: '28px',
                  border: '3px solid #eaecf0',
                  borderTopColor: '#ff6600',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 12px',
                }} />
                <p style={{ color: '#667085', fontSize: '13px', margin: 0, fontWeight: '500' }}>Loading users…</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '56px 24px', textAlign: 'center' }}>
                <Users size={40} style={{ color: '#d1d5db', margin: '0 auto 12px' }} />
                <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0, fontWeight: '500' }}>
                  {showInactiveOnly ? 'No inactive users found' : 'No users found'}
                </p>
              </div>
            ) : (
              filteredUsers.map((user, idx) => (
                <div
                  key={user.id}
                  onMouseEnter={() => setHoveredRow(user.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.8fr 1fr 0.9fr 0.8fr',
                    gap: '12px',
                    padding: '13px 20px',
                    borderBottom: idx < filteredUsers.length - 1 ? '1px solid #f3f4f6' : 'none',
                    backgroundColor: hoveredRow === user.id ? '#fafafa' : '#fff',
                    alignItems: 'center',
                    transition: 'background-color 0.12s ease',
                  }}
                >
                  {/* Username */}
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px', fontWeight: '600', color: '#101828',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {user.username}
                  </div>

                  {/* Email */}
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px', color: '#667085',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {user.email}
                  </div>

                  {/* Service */}
                  <div>
                    {editingUser === user.id ? (
                      <select
                        value={editService}
                        onChange={(e) => setEditService(e.target.value)}
                        style={{
                          width: '100%', padding: '6px 10px',
                          background: '#fafafa', border: '1.5px solid #ff6600',
                          borderRadius: '8px', outline: 'none',
                          fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif",
                          fontWeight: '600', color: '#101828',
                          boxShadow: '0 0 0 3px rgba(255,102,0,0.08)',
                          cursor: 'pointer',
                        }}
                      >
                        {services.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '10px', fontWeight: '700',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        backgroundColor: getServiceStyle(user.service).bg,
                        color: getServiceStyle(user.service).color,
                      }}>
                        {user.service || '—'}
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '10px', fontWeight: '700',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      backgroundColor: user.validated ? '#ecfdf3' : '#fef3f2',
                      color: user.validated ? '#027a48' : '#b42318',
                    }}>
                      {user.validated ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {editingUser === user.id ? (
                      <>
                        <button
                          onClick={() => handleSaveService(user.id)}
                          onMouseEnter={() => setHoveredBtn(`save-${user.id}`)}
                          onMouseLeave={() => setHoveredBtn(null)}
                          style={getBtnStyle('save', user.id)}
                          title="Save changes"
                        >
                          <Check size={15} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          onMouseEnter={() => setHoveredBtn(`cancel-${user.id}`)}
                          onMouseLeave={() => setHoveredBtn(null)}
                          style={getBtnStyle('cancel', user.id)}
                          title="Cancel"
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditService(user)}
                          onMouseEnter={() => setHoveredBtn(`edit-${user.id}`)}
                          onMouseLeave={() => setHoveredBtn(null)}
                          style={getBtnStyle('edit', user.id)}
                          title="Edit service"
                        >
                          <Edit2 size={14} />
                        </button>
                        {user.validated ? (
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            onMouseEnter={() => setHoveredBtn(`block-${user.id}`)}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={getBtnStyle('block', user.id)}
                            title="Block user"
                          >
                            <Ban size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleValidateUserApi(user.email, user.username, user.service)}
                            onMouseEnter={() => setHoveredBtn(`validate-${user.id}`)}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={getBtnStyle('validate', user.id)}
                            title="Validate user"
                          >
                            <Check size={14} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Total Users',    value: users.length,   iconBg: '#fff3e0', iconColor: '#e65100', Icon: Users },
            { label: 'Active Users',   value: activeCount,    iconBg: '#ecfdf3', iconColor: '#027a48', Icon: Check },
            { label: 'Inactive Users', value: inactiveCount,  iconBg: '#fef3f2', iconColor: '#b42318', Icon: Ban   },
          ].map(({ label, value, iconBg, iconColor, Icon }) => (
            <div key={label} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #eaecf0',
              boxShadow: '0 1px 3px rgba(16,24,40,0.05)',
              padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                backgroundColor: iconBg, color: iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={18} />
              </div>
              <div>
                <p style={{
                  fontSize: '10px', fontWeight: '700', color: '#9ca3af',
                  textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px',
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: '24px', fontWeight: '700', color: '#101828',
                  margin: 0, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1,
                }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserManagementAdmin;
