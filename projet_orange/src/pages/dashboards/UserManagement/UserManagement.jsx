import React, { useState } from 'react';
import { Edit2, Check, Ban, Users, Filter } from 'lucide-react';

const UserManagementAdmin = () => {
  const [showInactiveOnly, setShowInactiveOnly] = useState(false);
  
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@orange.com',
      service: 'DFI',
      validated: true
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane.smith@orange.com',
      service: 'IN',
      validated: false
    },
    {
      id: 3,
      username: 'mike_wilson',
      email: 'mike.wilson@orange.com',
      service: 'DSI',
      validated: true
    },
    {
      id: 4,
      username: 'sarah_jones',
      email: 'sarah.jones@orange.com',
      service: 'DFI',
      validated: false
    },
    {
      id: 5,
      username: 'alex_brown',
      email: 'alex.brown@orange.com',
      service: 'IN',
      validated: false
    }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [editService, setEditService] = useState('');

  const services = ['DFI', 'IN', 'DSI'];

  const handleEditService = (user) => {
    setEditingUser(user.id);
    setEditService(user.service);
  };

  const handleSaveService = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, service: editService } : user
    ));
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditService('');
  };

  const handleValidateUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, validated: true } : user
    ));
  };

  const handleBlockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, validated: false } : user
    ));
  };

  const filteredUsers = showInactiveOnly 
    ? users.filter(user => !user.validated)
    : users;

  const styles = {
    container: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    inactiveButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: showInactiveOnly ? '#ea580c' : '#f3f4f6',
      color: showInactiveOnly ? 'white' : '#374151'
    },
    badge: {
      marginLeft: '8px',
      backgroundColor: '#c2410c',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '14px'
    },
    tableContainer: {
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '24px'
    },
    tableHeader: {
      backgroundColor: '#000000',
      color: 'white',
      padding: '20px 24px',
      fontSize: '18px'
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gap: '16px',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: '18px'
    },
    tableBody: {
      borderTop: '1px solid #e5e7eb'
    },
    tableRow: {
      padding: '20px 24px',
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.15s',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gap: '16px',
      alignItems: 'center',
      fontSize: '16px'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
    },
    username: {
      fontWeight: '500',
      color: '#1f2937',
      fontSize: '17px'
    },
    email: {
      color: '#6b7280',
      fontSize: '16px'
    },
    serviceSelect: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #f97316',
      borderRadius: '6px',
      outline: 'none',
      fontSize: '16px'
    },
    serviceBadge: {
      display: 'inline-flex',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '16px',
      fontWeight: '500'
    },
    statusBadge: {
      display: 'inline-flex',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500'
    },
    activeStatus: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    inactiveStatus: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    dfiService: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    inService: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    dsiService: {
      backgroundColor: '#e9d5ff',
      color: '#7c3aed'
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    actionButton: {
      padding: '10px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editButton: {
      backgroundColor: '#ea580c'
    },
    saveButton: {
      backgroundColor: '#16a34a'
    },
    cancelButton: {
      backgroundColor: '#6b7280'
    },
    validateButton: {
      backgroundColor: '#16a34a'
    },
    blockButton: {
      backgroundColor: '#dc2626'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    statIcon: {
      flexShrink: 0,
      marginRight: '16px'
    },
    statLabel: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#6b7280',
      margin: 0
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    emptyState: {
      padding: '48px 24px',
      textAlign: 'center'
    },
    emptyStateText: {
      color: '#6b7280',
      fontSize: '20px',
      marginTop: '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <button
          style={styles.inactiveButton}
          onClick={() => setShowInactiveOnly(!showInactiveOnly)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = showInactiveOnly ? '#c2410c' : '#e5e7eb';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = showInactiveOnly ? '#ea580c' : '#f3f4f6';
          }}
        >
          <Users style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          Users Inactive
          {showInactiveOnly && (
            <span style={styles.badge}>
              {users.filter(user => !user.validated).length}
            </span>
          )}
        </button>
      </div>

      {/* User Table */}
      <div style={styles.tableContainer}>
        {/* Table Header */}
        <div style={styles.tableHeader}>
          <div style={styles.tableHeaderRow}>
            <div>Username</div>
            <div>Email</div>
            <div>Service</div>
            <div>Status</div>
            <div style={{ textAlign: 'center' }}>Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div style={styles.tableBody}>
          {filteredUsers.length === 0 ? (
            <div style={styles.emptyState}>
              <Filter style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto' }} />
              <p style={styles.emptyStateText}>
                {showInactiveOnly ? 'No inactive users found' : 'No users found'}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                style={styles.tableRow}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {/* Username */}
                <div style={styles.username}>{user.username}</div>

                {/* Email */}
                <div style={styles.email}>{user.email}</div>

                {/* Service */}
                <div>
                  {editingUser === user.id ? (
                    <select
                      value={editService}
                      onChange={(e) => setEditService(e.target.value)}
                      style={styles.serviceSelect}
                    >
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                      style={{
                        ...styles.serviceBadge,
                        ...(user.service === 'DFI' ? styles.dfiService :
                           user.service === 'IN' ? styles.inService :
                           styles.dsiService)
                      }}
                    >
                      {user.service}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(user.validated ? styles.activeStatus : styles.inactiveStatus)
                    }}
                  >
                    {user.validated ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Actions */}
                <div style={styles.actionsContainer}>
                  {editingUser === user.id ? (
                    <>
                      <button
                        onClick={() => handleSaveService(user.id)}
                        style={{ ...styles.actionButton, ...styles.saveButton }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                        title="Save changes"
                      >
                        <Check style={{ width: '18px', height: '18px' }} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{ ...styles.actionButton, ...styles.cancelButton }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                        title="Cancel"
                      >
                        <Ban style={{ width: '18px', height: '18px' }} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditService(user)}
                        style={{ ...styles.actionButton, ...styles.editButton }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#c2410c'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ea580c'}
                        title="Edit service"
                      >
                        <Edit2 style={{ width: '18px', height: '18px' }} />
                      </button>
                      {user.validated ? (
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          style={{ ...styles.actionButton, ...styles.blockButton }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                          title="Block user"
                        >
                          <Ban style={{ width: '18px', height: '18px' }} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleValidateUser(user.id)}
                          style={{ ...styles.actionButton, ...styles.validateButton }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                          title="Validate user"
                        >
                          <Check style={{ width: '16px', height: '16px' }} />
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

      {/* Summary Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Users style={{ width: '32px', height: '32px', color: '#ea580c' }} />
          </div>
          <div>
            <p style={styles.statLabel}>Total Users</p>
            <p style={styles.statValue}>{users.length}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Check style={{ width: '32px', height: '32px', color: '#16a34a' }} />
          </div>
          <div>
            <p style={styles.statLabel}>Active Users</p>
            <p style={styles.statValue}>
              {users.filter(user => user.validated).length}
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Ban style={{ width: '32px', height: '32px', color: '#dc2626' }} />
          </div>
          <div>
            <p style={styles.statLabel}>Inactive Users</p>
            <p style={styles.statValue}>
              {users.filter(user => !user.validated).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementAdmin;