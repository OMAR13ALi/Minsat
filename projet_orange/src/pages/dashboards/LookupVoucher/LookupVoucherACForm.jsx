import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LookupVoucherForm = () => {
  const [choice, setChoice] = useState("serial"); // default: serial number
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    const expectedLength = choice === "serial" ? 12 : 14;

    if (inputValue.length !== expectedLength) {
      setError(
        `Le ${choice === "serial" ? "numéro de série" : "code d'activation"} doit contenir exactement ${expectedLength} chiffres.`
      );
    } else {
      setError("");
      console.log(
        `Sending ${choice === "serial" ? "Serial Number" : "Activation Code"}:`,
        inputValue
      );

      // Navigation avec paramètre
      navigate(
        choice === "serial"
          ? `/vs/info?serial=${inputValue}`
          : `/vs/info?activation=${inputValue}`
      );
    }
  };

  const handleClear = () => {
    setInputValue("");
    setError("");
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
        <label htmlFor="choice">LookupVoucher</label>
        <select
          id="choice"
          value={choice}
          onChange={(e) => {
            setChoice(e.target.value);
            setInputValue("");
            setError("");
          }}
        >
          <option value="serial">Serial Number (12-Digit)</option>
          <option value="activation">Activation Code (14-Digit)</option>
        </select>

        <label htmlFor="inputField">
          {choice === "serial" ? "Serial Number  :" : "Activation Code :"}
        </label>
        <div className="msisdn-input">
          <input
            id="inputField"
            type="text"
            placeholder={
              choice === "serial"
                ? "12-digit Serial Number"
                : "14-digit Activation Code"
            }
            value={inputValue}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              const maxLen = choice === "serial" ? 12 : 14;
              if (onlyNumbers.length <= maxLen) {
                setInputValue(onlyNumbers);
                setError("");
              }
            }}
            maxLength={choice === "serial" ? 12 : 14}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button
            className="send"
            onClick={handleSend}
            disabled={
              inputValue.length !== (choice === "serial" ? 12 : 14)
            }
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
          margin-top: 1rem;
          margin-bottom: 1rem;
          display: block;
          color: #333;
          font-size: 1.2rem;
        }

        select {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          margin-bottom: 2rem;
          font-size: 1.2rem;
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
      `}</style>
    </div>
  );
};

export default LookupVoucherForm;
