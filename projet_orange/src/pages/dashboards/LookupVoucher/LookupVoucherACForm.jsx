import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const LookupVoucherACForm = () => {
  const [msisdn, setMsisdn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this hook
  
  const handleSend = () => {
    if (msisdn.length !== 14) {
      setError("Le numéro de série doit contenir exactement 14 chiffres.");
    } else {
      setError("");
      console.log("Sending Activation Code:", msisdn);
      
      // Navigate to vs/info page with activation code as parameter
      navigate(`/vs/info?activation=${msisdn}`);
      
      // Alternative: If you want to pass it as a route parameter
      // navigate(`/vs/info/${msisdn}`);
      
      // Alternative: If you want to pass it as state
      // navigate('/vs/info', { state: { activation: msisdn, type: 'activation' } });
    }
  };
  
  const handleClear = () => {
    setMsisdn("");
    setError(""); // Clear error too
  };
  
  return (
    <div className="main-content">
      <div className="content-header">
        <div className="header-icon">
          <span>🎫</span>
        </div>
        <h1>Lookup Voucher Information</h1>
      </div>
      
      <div className="msisdn-card">
        <label htmlFor="serial">Activation Code :</label>
        <div className="msisdn-input">
          <input
            id="serial"
            type="text"
            placeholder="14-digit Activation Code"
            value={msisdn}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              if (onlyNumbers.length <= 14) {
                setMsisdn(onlyNumbers);
                setError(""); // Clear error on input
              }
            }}
            maxLength={14}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button
            className="send"
            onClick={handleSend}
            disabled={msisdn.length !== 14}
          >
            Send
          </button>
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <style jsx>{`
        .main-content {
          margin-left: 0;
          flex: 1;
          background-color: #f5f2f8;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          padding-top: 2rem;
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

        .msisdn-card {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 4rem;
          width: 100%;
          max-width: 800px;
        }

        label {
          font-weight: bold;
          margin-bottom: 1.5rem;
          display: block;
          color: #333;
          font-size: 1.4rem;
        }

        .msisdn-input {
          display: flex;
          align-items: center;
          margin-bottom: 2.5rem;
          border: 3px solid #ddd;
          border-radius: 12px;
          height: 70px;
          overflow: hidden;
        }

        .msisdn-input input {
          flex: 1;
          padding: 0 1.5rem;
          border: none;
          font-size: 1.4rem;
          outline: none;
          height: 100%;
          background: transparent;
        }

        .msisdn-input input::placeholder {
          color: #999;
          font-size: 1.4rem;
        }

        .msisdn-input input:focus {
          background-color: #fafafa;
        }

        .button-group {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .button-group button {
          min-width: 150px;
          padding: 1.2rem 2.5rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.2rem;
          transition: all 0.2s ease;
          text-align: center;
          line-height: 1;
        }

        .button-group button:hover {
          opacity: 0.95;
        }

        .button-group button:active {
          transform: translateY(1px);
        }

        .send {
          background-color: #ff6600;
          color: #fff;
        }

        .send:hover {
          background-color: #e65c00;
        }

        .send:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          color: #666;
        }

        .clear {
          background-color: #333;
          color: #fff;
        }

        .clear:hover {
          background-color: #555;
        }

        .error-message {
          color: #e63946;
          font-size: 1.1rem;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
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

          .msisdn-card {
            padding: 2.5rem;
            max-width: 100%;
          }

          label {
            font-size: 1.2rem;
          }

          .msisdn-input {
            height: 60px;
          }

          .msisdn-input input {
            font-size: 1.2rem;
          }

          .button-group button {
            font-size: 1.1rem;
            padding: 1rem 2rem;
            min-width: 130px;
          }
        }
      `}</style>
    </div>
  );
};

export default LookupVoucherACForm;