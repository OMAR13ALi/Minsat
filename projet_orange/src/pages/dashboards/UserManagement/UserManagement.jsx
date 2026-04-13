import React, { useState, useEffect } from 'react';
import { Edit2, Check, Ban, Users, Filter } from 'lucide-react';

const UserManagementAdmin = () => {
  const [showInactiveOnly, setShowInactiveOnly] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editService, setEditService] = useState('');

  const services = ['DFI', 'DSC', 'IN', 'ADMIN'];

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
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

  // Validate user via API
  const handleValidateUserApi = async (email, name, service) => {
    if (!email || !name || !service) {
      console.error("Missing fields:", { email, name, service });
      setError("All fields are required for validation.");
      return;
    }

    try {
      const response = await fetch("/users/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correctClass: service,
          email,
          name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Validation successful:", result.message);

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === email
            ? { ...user, validated: true, service }
            : user
        )
      );
    } catch (err) {
      console.error("Error validating user:", err);
      setError(err.message || "Validation failed.");
    }
  };

  // Block user via API
  const handleBlockUser = async (userId) => {
    try {
      const response = await fetch(`/users/block/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 0 }), // Assuming status: 0 means blocked
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("User blocked successfully:", result.message);

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, validated: false } : user
        )
      );
    } catch (err) {
      console.error("Error blocking user:", err);
      setError(err.message || "Failed to block user.");
    }
  };

  // Update user service via API
  const handleSaveService = async (userId) => {
    try {
      const response = await fetch(`/users/update/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: editService }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("User service updated successfully:", result.message);

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, service: editService } : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user service:", err);
      setError(err.message || "Failed to update user service.");
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
      marginBottom: '24px',
      height: '700px', // Fixed height for scrolling
      overflowY: 'auto'
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
    },
    loading: {
      textAlign: 'center',
      padding: '24px',
      color: '#6b7280'
    },
    error: {
      textAlign: 'center',
      padding: '24px',
      color: '#dc2626',
      fontWeight: '500'
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
          onMouseOver={(e) => { e.target.style.backgroundColor = showInactiveOnly ? '#c2410c' : '#e5e7eb'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = showInactiveOnly ? '#ea580c' : '#f3f4f6'; }}
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
          {loading ? (
            <div style={styles.loading}>Loading...</div>
          ) : error ? (
            <div style={styles.error}>{error}</div>
          ) : filteredUsers.length === 0 ? (
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
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
              >
                <div style={styles.username}>{user.username}</div>
                <div style={styles.email}>{user.email}</div>
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
                          onClick={() => handleValidateUserApi(user.email, user.username, user.service)}                        
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