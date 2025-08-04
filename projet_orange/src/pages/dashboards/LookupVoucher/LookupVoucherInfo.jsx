import React from 'react';
import { useSearchParams } from 'react-router-dom';

const LookupVoucherInfo = () => {
  const [searchParams] = useSearchParams();
  
  // Get the serial number or activation code from URL parameters
  const serialNumber = searchParams.get('serial');
  const activationCode = searchParams.get('activation');
  
  // Determine which type of lookup this is
  const lookupType = serialNumber ? 'Serial Number' : 'Activation Code';
  const lookupValue = serialNumber || activationCode;

  return (
    <div className="main-content" style={{ marginTop: '25px', height: '100vh', overflowY: 'auto' }}>
      <div className="content-header">
        <div className="header-icon">
          <span>🎫</span>
        </div>
        <h1>Voucher Information</h1>
      </div>
      
      <div className="info-card">
        <h2>Lookup Results</h2>
        
        {lookupValue ? (
          <div className="lookup-details">
            <div className="detail-row">
              <span className="label">Lookup Type:</span>
              <span className="value">{lookupType}</span>
            </div>
            <div className="detail-row">
              <span className="label">Value:</span>
              <span className="value">{lookupValue}</span>
            </div>
            
            {/* Add your voucher information display logic here */}
            <div className="voucher-info">
              <h3>Voucher Details</h3>
              <p>Information for {lookupType}: {lookupValue}</p>
              {/* This is where you'll add your API call and display the actual voucher data */}
            </div>
          </div>
        ) : (
          <div className="no-data">
            <p>No voucher information to display. Please use the lookup forms to search for a voucher.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .main-content {
          margin-left: 0;
          margin-bottom: 100px;
          padding: 0px 0px 100px 0px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .header-icon {
          background: #ff6b35;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          font-size: 24px;
        }

        .content-header h1 {
          color: #333;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }

        .info-card {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 4rem;
          width: 100%;
          max-width: 800px;
        }

        .info-card h2 {
          color: #333;
          margin-bottom: 2rem;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .lookup-details {
          margin-bottom: 2rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 600;
          color: #555;
          font-size: 1.2rem;
        }

        .value {
          font-size: 1.2rem;
          color: #333;
          font-family: monospace;
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }

        .voucher-info {
          margin-top: 2rem;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .voucher-info h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .no-data {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
            padding-top: 1rem;
          }

          .content-header h1 {
            font-size: 24px;
          }

          .header-icon {
            font-size: 20px;
            padding: 12px 16px;
          }

          .info-card {
            padding: 2.5rem;
            max-width: 100%;
          }

          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LookupVoucherInfo;