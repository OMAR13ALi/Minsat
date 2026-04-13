import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetMsisdnInfoForm = () => {
  const [rawMsisdn, setRawMsisdn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatMsisdn = (value) => {
    return value.replace(/(\d{2})(\d{3})(\d{0,3})/, (_, a, b, c) => {
      return [a, b, c].filter(Boolean).join(" ");
    });
  };

  const handleChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    if (onlyDigits.length <= 8) {
      setRawMsisdn(onlyDigits);
      setError("");
    }
  };

  const handleSend = () => {
    if (rawMsisdn.length !== 8) {
      setError("Le numéro doit contenir exactement 8 chiffres.");
    } else {
      setError("");
      navigate(`/customer/msisdn-info?msisdn=${rawMsisdn}`);
    }
  };

  const handleClear = () => {
    setRawMsisdn("");
    setError("");
  };

  return (
    <div style={{ padding: '8px 0' }}>
      {/* Page title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1a1d23',
          margin: 0,
          paddingLeft: '14px',
          borderLeft: '3px solid #ff6600',
          fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
          MSISDN Information
        </h1>
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          margin: '6px 0 0 17px',
          fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
          Enter a subscriber number to view account details
        </p>
      </div>

      {/* Search card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e8eaed',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        padding: '32px 36px',
        maxWidth: '680px'
      }}>
        <label htmlFor="msisdn" style={{
          display: 'block',
          fontWeight: 600,
          color: '#374151',
          fontSize: '13px',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
          MSISDN
        </label>

        {/* Input row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1.5px solid #e8eaed',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '48px',
          marginBottom: '16px',
          transition: 'border-color 0.2s ease',
          background: '#fff'
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = '#ff6600'}
          onBlurCapture={e => e.currentTarget.style.borderColor = '#e8eaed'}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 16px',
            background: '#f5f6fa',
            height: '100%',
            borderRight: '1.5px solid #e8eaed',
            minWidth: '100px'
          }}>
            <img src="/assets/tunisia_flag.webp" alt="Tunisia" style={{ width: '22px', height: '15px', objectFit: 'cover' }} />
            <span style={{ fontWeight: 600, color: '#374151', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>+216</span>
          </div>
          <input
            id="msisdn"
            type="text"
            placeholder="55 123 456"
            value={formatMsisdn(rawMsisdn)}
            onChange={handleChange}
            maxLength={11}
            style={{
              flex: 1,
              padding: '0 16px',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              background: 'transparent',
              color: '#1a1d23',
              fontFamily: "'Inter', -apple-system, sans-serif",
              letterSpacing: '0.04em'
            }}
          />
        </div>

        {error && (
          <div style={{
            color: '#dc2626',
            fontSize: '13px',
            marginBottom: '12px',
            fontFamily: "'Inter', sans-serif"
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSend}
            disabled={rawMsisdn.length !== 8}
            style={{
              padding: '0 28px',
              height: '44px',
              background: rawMsisdn.length === 8 ? '#ff6600' : '#d1d5db',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: rawMsisdn.length === 8 ? 'pointer' : 'not-allowed',
              fontFamily: "'Inter', -apple-system, sans-serif",
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => { if (rawMsisdn.length === 8) e.target.style.background = '#e05500'; }}
            onMouseLeave={e => { if (rawMsisdn.length === 8) e.target.style.background = '#ff6600'; }}
          >
            Envoyer
          </button>
          <button
            onClick={handleClear}
            style={{
              padding: '0 20px',
              height: '44px',
              background: '#f5f6fa',
              color: '#6b7280',
              border: '1px solid #e8eaed',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Inter', -apple-system, sans-serif",
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.target.style.background = '#e8eaed'; e.target.style.color = '#374151'; }}
            onMouseLeave={e => { e.target.style.background = '#f5f6fa'; e.target.style.color = '#6b7280'; }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetMsisdnInfoForm;
