import React, { useEffect, useState } from 'react';

const LookupVoucherInfo = () => {
  // Mock URL parameters for demonstration
  const urlParams = new URLSearchParams(window.location.search);
  const serialNumber = urlParams.get('serial');
  const activationCode = urlParams.get('activation');
 
  const lookupType = serialNumber ? 'Serial Number' : 'Activation Code';
  const lookupValue = serialNumber || activationCode;
  
  // State pour stocker la réponse API
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock voucher data for demonstration
  useEffect(() => {
    if (!lookupValue) return;
    
    const fetchVoucher = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock response with lots of data to test scrolling
        const mockVoucher = {
          id: lookupValue,
          status: 'Active',
          type: lookupType,
          createdDate: '2024-01-15',
          expiryDate: '2024-12-31',
          value: '$50.00',
          usedCount: '2/5',
          lastUsed: '2024-03-20',
          createdBy: 'System Admin',
          category: 'Promotional',
          discountType: 'Percentage',
          discountValue: '25%',
          minimumPurchase: '$100.00',
          maximumDiscount: '$50.00',
          usageLimit: '5',
          currentUsage: '2',
          remainingUses: '3',
          validFrom: '2024-01-01',
          validUntil: '2024-12-31',
          applicableProducts: 'All Products',
          customerSegment: 'Premium Members',
          generatedAt: '2024-01-15 10:30:00',
          lastModified: '2024-03-20 14:25:00'
        };
        
        setVoucher(mockVoucher);
      } catch (err) {
        setError('Impossible de récupérer les informations du voucher.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVoucher();
  }, [lookupValue, serialNumber, activationCode]);

  return (
    <div style={{ 
      width: '100%', 
      height: 'auto', // Explicitly allow height to grow
      margin: 0, 
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      display: 'flex',
      justifyContent: 'center',
      overflowY: 'auto' // Explicitly allow vertical scrolling
    }}>
      <div style={{ 
        maxWidth: '900px', 
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '2rem',
          padding: '2rem',
          borderBottom: '3px solid #e68231',
          background: 'linear-gradient(135deg, rgba(230, 130, 49, 0.05) 0%, rgba(230, 130, 49, 0.02) 100%)',
          borderRadius: '12px 12px 0 0',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>🎫</div>
          <h1 style={{
            margin: '0.5rem 0 0.25rem 0',
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50',
            background: 'linear-gradient(135deg, #2c3e50 0%, #e68231 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Voucher Information</h1>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '1.1rem',
            fontWeight: '400'
          }}>View detailed voucher information and status</p>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(230, 130, 49, 0.1)',
          overflow: 'auto' // Allow scrolling within the card if needed
        }}>
          {/* Card Header */}
          <div style={{
            background: 'linear-gradient(135deg, #e68231 0%, #d4741f 100%)',
            color: 'white',
            padding: '1.5rem 2rem'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>Lookup Results</h2>
          </div>
          
          {lookupValue ? (
            <div style={{ padding: '2rem', minHeight: 'auto' }}>
              {/* Lookup Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(230, 130, 49, 0.05) 0%, rgba(230, 130, 49, 0.02) 100%)',
                borderRadius: '12px',
                borderLeft: '4px solid #e68231'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#6c757d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem'
                  }}>Lookup Type</div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: '#2c3e50'
                  }}>{lookupType}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#6c757d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem'
                  }}>Search Value</div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: '#2c3e50',
                    fontFamily: 'Courier New, monospace',
                    background: 'rgba(230, 130, 49, 0.1)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(230, 130, 49, 0.2)',
                    display: 'inline-block'
                  }}>{lookupValue}</div>
                </div>
              </div>
              
              {/* Loading State */}
              {loading && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  margin: '1rem 0',
                  fontWeight: '500',
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  color: '#1565c0',
                  border: '1px solid #90caf9'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #90caf9',
                    borderTop: '2px solid #1565c0',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Loading voucher information...</span>
                </div>
              )}
              
              {/* Error State */}
              {error && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  margin: '1rem 0',
                  fontWeight: '500',
                  background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
                  color: '#c62828',
                  border: '1px solid #ef9a9a'
                }}>
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              
              {/* Voucher Details */}
              {voucher && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{
                    margin: '0 0 1.5rem 0',
                    fontSize: '1.375rem',
                    fontWeight: '600',
                    color: '#2c3e50',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid rgba(230, 130, 49, 0.2)'
                  }}>Voucher Details</h3>
                  
                  <div style={{
                    borderRadius: '12px',
                    overflow: 'auto', // Ensure table can scroll if needed
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(230, 130, 49, 0.1)',
                    maxHeight: '600px' // Optional: limit table height for internal scrolling
                  }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      background: 'white'
                    }}>
                      <thead>
                        <tr>
                          <th style={{
                            background: 'linear-gradient(135deg, #e68231 0%, #d4741f 100%)',
                            color: 'white',
                            textAlign: 'left',
                            padding: '1rem 1.5rem',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Attribute</th>
                          <th style={{
                            background: 'linear-gradient(135deg, #e68231 0%, #d4741f 100%)',
                            color: 'white',
                            textAlign: 'left',
                            padding: '1rem 1.5rem',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(voucher).map(([key, value], index) => (
                          <tr key={key} style={{
                            backgroundColor: index % 2 === 0 ? 'white' : 'rgba(230, 130, 49, 0.02)'
                          }}>
                            <td style={{
                              padding: '1rem 1.5rem',
                              fontWeight: '600',
                              color: '#495057',
                              borderBottom: '1px solid rgba(230, 130, 49, 0.1)',
                              background: 'rgba(230, 130, 49, 0.03)'
                            }}>{key}</td>
                            <td style={{
                              padding: '1rem 1.5rem',
                              color: '#2c3e50',
                              borderBottom: '1px solid rgba(230, 130, 49, 0.1)'
                            }}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: '3rem 2rem' }}>
              <div style={{
                textAlign: 'center',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  opacity: '0.6'
                }}>📋</div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#495057'
                }}>No Voucher Selected</h3>
                <p style={{
                  margin: '0 0 2rem 0',
                  color: '#6c757d',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>Please use the lookup forms to search for a voucher and view its detailed information.</p>
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button 
                    onClick={() => window.location.search = '?serial=ABC123XYZ'}
                    style={{
                      background: 'linear-gradient(135deg, #e68231 0%, #d4741f 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(230, 130, 49, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Demo Serial Lookup
                  </button>
                  <button 
                    onClick={() => window.location.search = '?activation=ACT789DEF'}
                    style={{
                      background: 'linear-gradient(135deg, #e68231 0%, #d4741f 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(230, 130, 49, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Demo Activation Lookup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        html, body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          min-height: 100%; /* Allow body to grow */
          overflow-y: auto; /* Explicitly enable vertical scrolling */
          overflow-x: hidden; /* Prevent horizontal scrolling unless needed */
        }
        
        #root {
          min-height: 100%; /* Ensure root container can grow */
          overflow-y: auto; /* Allow scrolling */
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(230, 130, 49, 0.4) !important;
        }
        
        button:active {
          transform: translateY(0);
        }
        
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          
          button {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default LookupVoucherInfo;