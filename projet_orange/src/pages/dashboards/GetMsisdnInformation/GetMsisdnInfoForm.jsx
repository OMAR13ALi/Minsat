import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const GetMsisdnInfoForm = () => {
  const [rawMsisdn, setRawMsisdn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this hook
  
  const formatMsisdn = (value) => {
    // Format like: 55 666 666
    return value.replace(/(\d{2})(\d{3})(\d{0,3})/, (_, a, b, c) => {
      return [a, b, c].filter(Boolean).join(" ");
    });
  };
  
  const handleChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (onlyDigits.length <= 8) {
      setRawMsisdn(onlyDigits);
      setError(""); // Clear error on input
    }
  };
  
  const handleSend = () => {
    if (rawMsisdn.length !== 8) {
      setError("Le numéro doit contenir exactement 8 chiffres.");
    } else {
      setError("");
      console.log("Sending raw MSISDN:", rawMsisdn);
      
      // Navigate to customer/msisdn-info page with the MSISDN as a parameter
      navigate(`/customer/msisdn-info?msisdn=${rawMsisdn}`);
      
      // Alternative: If you want to pass it as a route parameter
      // navigate(`/customer/msisdn-info/${rawMsisdn}`);
      
      // Alternative: If you want to pass it as state
      // navigate('/customer/msisdn-info', { state: { msisdn: rawMsisdn } });
    }
  };
  
  const handleClear = () => {
    setRawMsisdn("");
    setError("");
  };
  
  return (
    <div className="main-content">
      <div className="content-header">
        <div className="header-icon">
          <span>📱</span>
        </div>
        <h1>MSISDN Information</h1>
      </div>
      
      <div className="msisdn-card">
        <label htmlFor="msisdn">MSISDN :</label>
        <div className="msisdn-input">
          <div className="prefix">
            <img src="/assets/tunisia_flag.webp" alt="Tunisia Flag" />
            <span>+216</span>
          </div>
          <input
            id="msisdn"
            type="text"
            placeholder="MSISDN"
            value={formatMsisdn(rawMsisdn)}
            onChange={handleChange}
            maxLength={11} // 8 digits = max 2+1+3+1+3 => 11 characters with spaces
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button
            className="send"
            onClick={handleSend}
            disabled={rawMsisdn.length !== 8}
          >
            Envoyer
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
          overflow: hidden;
          height: 70px;
        }

        .prefix {
          display: flex;
          align-items: center;
          background-color: #f8f8f8;
          padding: 0 1.5rem;
          height: 100%;
          border-right: 3px solid #ddd;
          min-width: 120px;
          justify-content: center;
        }

        .prefix img {
          width: 28px;
          height: 20px;
          margin-right: 12px;
        }

        .prefix span {
          font-weight: 600;
          color: #333;
          font-size: 1.2rem;
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

          .label {
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

export default GetMsisdnInfoForm;