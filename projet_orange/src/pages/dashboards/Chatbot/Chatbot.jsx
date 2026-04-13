import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiZap, FiCpu, FiUser, FiChevronRight, FiCheck } from 'react-icons/fi';
import { IoChatbubblesOutline } from 'react-icons/io5';

/* ─── Injected CSS ─────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @keyframes cb-fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  @keyframes cb-dot {
    0%, 60%, 100% { transform: translateY(0);    opacity: 0.35; }
    30%           { transform: translateY(-5px); opacity: 1;    }
  }
  @keyframes cb-pulse-ring {
    0%   { transform: scale(1);    opacity: 0.5; }
    100% { transform: scale(1.65); opacity: 0;   }
  }
  @keyframes cb-shimmer {
    from { background-position: -400px 0; }
    to   { background-position:  400px 0; }
  }

  .cb-root * { box-sizing: border-box; }
  .cb-root { font-family: 'Plus Jakarta Sans', sans-serif; }

  .cb-msg { animation: cb-fade-up 0.28s ease both; }

  .cb-dot-1 { animation: cb-dot 1.2s infinite ease-in-out; }
  .cb-dot-2 { animation: cb-dot 1.2s 0.16s infinite ease-in-out; }
  .cb-dot-3 { animation: cb-dot 1.2s 0.32s infinite ease-in-out; }

  .cb-qcmd {
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
    cursor: pointer;
    text-align: left; width: 100%; border: none;
  }
  .cb-qcmd:hover {
    background: #fff5f0 !important;
    border-color: rgba(255,102,0,0.25) !important;
    transform: translateX(3px);
  }
  .cb-qcmd:hover .cb-cmd-lbl { color: #ff6600 !important; }
  .cb-qcmd:hover .cb-cmd-arr { opacity: 1 !important; }

  .cb-send {
    transition: all 0.18s ease;
  }
  .cb-send:hover:not(:disabled) {
    background: #e85c00 !important;
    box-shadow: 0 6px 18px rgba(255,102,0,0.38) !important;
    transform: translateY(-1px);
  }
  .cb-send:active:not(:disabled) { transform: translateY(0) scale(0.97); }
  .cb-send:disabled { opacity: 0.4; cursor: not-allowed; }

  .cb-textarea::placeholder { color: #b0b8cc; font-family: 'Plus Jakarta Sans', sans-serif; }
  .cb-textarea:focus { outline: none; }

  .cb-scroll::-webkit-scrollbar       { width: 5px; }
  .cb-scroll::-webkit-scrollbar-track { background: #f1f3f7; border-radius: 3px; }
  .cb-scroll::-webkit-scrollbar-thumb { background: #dde2ec; border-radius: 3px; }
  .cb-scroll::-webkit-scrollbar-thumb:hover { background: #c8cfe0; }

  .cb-input-wrap:focus-within {
    border-color: #ff6600 !important;
    box-shadow: 0 0 0 3px rgba(255,102,0,0.1) !important;
  }

  .cb-svc-row { transition: opacity 0.2s; }
  .cb-svc-row:hover { opacity: 0.8; }
`;

/* ─── Mock responses ───────────────────────────────────────────────────────── */
const getResponse = (text) => {
  const q = text.toLowerCase().trim();

  if (q.match(/\/status|system.*status|status.*system/))
    return `System Status — ${new Date().toLocaleTimeString('fr-TN')}\n\n✓  AIR Server      ONLINE   10.13.96.38:10010\n✓  MySQL Database   ONLINE   :3306\n✓  UCIP Wrapper     ONLINE   :8080\n✓  History API      ONLINE   :5002\n✓  Voucher Admin    ONLINE   10.13.0.49:10020\n—  HLR Telnet       STANDBY  10.23.69.209:7776\n\nAll critical services are operational.`;

  if (q.match(/\/query|query.*subscriber|get.*subscriber|msisdn.*info/)) {
    const m = text.match(/\b6\d{7}\b/)?.[0] || '6XXXXXXX';
    return `Querying subscriber ${m}...\n\nEndpoint:  GET /api/subscriber/msisdn-info\nPayload:   { "msisdn": "${m}" }\n\nThe backend prepends country code 216 automatically\nbefore forwarding to the UCIP wrapper.\n\nNavigate to  Customer Care → Account  for the full UI.`;
  }

  if (q.match(/\/balance|balance|solde|credit/))
    return `Balance Query Flow\n\n  Frontend  →  Spring Boot :5000\n            →  UCIP Wrapper :8080\n            →  Ericsson AIR TCP :10010\n\nEndpoint:  POST /ucip/balance-and-date\nResponse:  currentBalance, currency, expiryDate, ...\n\nIn the UI: Subscriber Info → SOLDE panel`;

  if (q.match(/\/voucher|voucher|serial|activation/))
    return `Voucher Lookup\n\nEndpoint:  POST /api/subscriber/lookup-voucher\nPayload:   { "voucherCode": "XXXXXXXXXXXX" }\n        or { "serialNumber": "XXXXXXXXXX" }\n\nNavigate to  Lookup Vouchers → Activation Code`;

  if (q.match(/\/ucip|ucip|acip|air.*protocol/))
    return `AIR Protocol — UCIP/ACIP over raw TCP\n\nTransport:  HTTP/1.0 POST to port 10010\nAuth:       Basic kade:kade123\nFormat:     XML-RPC with <n> tags\nMandatory:  originNodeType, originHostName,\n            originTransactionID, originTimeStamp,\n            subscriberNumber\n\nUCIP (13):  balance-and-date, account-details,\n            accumulators, faf-list, refill, update-*\n\nACIP (10):  install, delete, link-subordinate,\n            update-blocked, promotion-*, update-accumulators`;

  if (q.match(/\/faf|faf|friend.*family/))
    return `FAF — Friend & Family Management\n\nQuery:   POST /ucip/get-faf-list\nAdd:     POST /ucip/update-faf-list  { action: "ADD",    ... }\nRemove:  POST /ucip/update-faf-list  { action: "REMOVE", ... }\n\nEach entry:  { fafNumber, fafIndicator, description }\nMax entries: defined by subscriber's service class`;

  if (q.match(/\/logs|logs|activity|audit/))
    return `System Logs  (Admin only)\n\nRoute:  /admin/logs\nAPI:    GET /admin/logs?page=0&size=25&...\n        GET /admin/logs/stats\n        GET /admin/logs/action-types\n\nLogged events:\n  MSISDN_QUERY, ACCOUNT_QUERY, UPDATE_BLOCK,\n  UPDATE_SERVICE_CLASS, UPDATE_FAF, UPDATE_REFILL,\n  LOGIN_SUCCESS, LOGIN_FAILURE, ...\n\nAll log writes are @Async — zero request-thread impact.`;

  if (q.match(/\/help|help|commands|commandes|what can/))
    return `MINSAT Assistant — Command Reference\n\n  /query   [msisdn]   Subscriber info & balance\n  /balance [msisdn]   Account balance flow\n  /voucher [code]     Lookup voucher / serial\n  /ucip               AIR protocol overview\n  /faf                FAF management guide\n  /logs               System audit logs\n  /status             Live service health\n  /help               Show this reference\n\nOr ask in plain language — I understand telecom\noperations, UCIP/ACIP, and system navigation.`;

  if (q.match(/hello|hi|bonjour|salam|hey/))
    return `Hello! I'm the MINSAT Assistant.\n\nI can help you with:\n\n  • Subscriber queries & account management\n  • UCIP / ACIP protocol operations\n  • Voucher & serial number lookups\n  • System status & health monitoring\n  • Navigation & workflow guidance\n\nType /help to see all available commands.`;

  if (q.match(/service.?class|classe.*service/))
    return `Service Class Operations\n\nQuery:   POST /ucip/get-service-class-info\nUpdate:  POST /api/update/service-class\n         { msisdn, action: "ADD"|"REMOVE", serviceClassNew }\n\nService classes control offer eligibility,\nDA group assignments, and traffic case routing.\n\nReference table: Help → SC / DA Group / UA`;

  if (q.match(/refill|recharge|top.?up/))
    return `Refill Operations\n\nVia voucher:  POST /api/update/refill\n              { msisdn, voucherCode }\n\nVia amount:   POST /api/update/refill\n              { msisdn, amount, currency: "TND" }\n\nRoutes through UCIP wrapper → AIR refill.\nIn the UI: Subscriber Info → SOLDE → Refill`;

  return `I received: "${text.slice(0, 55)}${text.length > 55 ? '…' : ''}"\n\nI can assist with subscriber management, AIR protocol\noperations (UCIP/ACIP), voucher lookups, and system\nnavigation. Type /help to see all available commands.`;
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const CMDS = [
  { label: '/query',   desc: 'Subscriber info'  },
  { label: '/balance', desc: 'Account balance'  },
  { label: '/voucher', desc: 'Lookup voucher'   },
  { label: '/ucip',    desc: 'Protocol guide'   },
  { label: '/faf',     desc: 'FAF management'   },
  { label: '/status',  desc: 'System health'    },
  { label: '/logs',    desc: 'Audit logs'       },
  { label: '/help',    desc: 'All commands'     },
];

const SERVICES = [
  { name: 'AIR Server',   up: true  },
  { name: 'MySQL DB',     up: true  },
  { name: 'UCIP Wrapper', up: true  },
  { name: 'History API',  up: true  },
  { name: 'HLR Telnet',   up: false },
];

const INIT = {
  id: 0, role: 'bot', ts: new Date(),
  text: 'MINSAT Assistant initialized.\n\nI can help you with subscriber queries, AIR protocol operations (UCIP/ACIP), voucher lookups, and system navigation.\n\nType /help to see all available commands.',
};

/* ─── Helper ───────────────────────────────────────────────────────────────── */
const fmt = (d) => d.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' });

/* ─── Component ────────────────────────────────────────────────────────────── */
export default function Chatbot() {
  const [messages, setMessages] = useState([INIT]);
  const [input,    setInput]    = useState('');
  const [typing,   setTyping]   = useState(false);
  const [idSeq,    setIdSeq]    = useState(1);

  const endRef   = useRef(null);
  const inputRef = useRef(null);

  /* Inject CSS */
  useEffect(() => {
    if (document.getElementById('cb-css')) return;
    const s = document.createElement('style');
    s.id = 'cb-css'; s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.getElementById('cb-css')?.remove();
  }, []);

  /* Scroll */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = useCallback(() => {
    const txt = input.trim();
    if (!txt || typing) return;
    const uid = idSeq, bid = idSeq + 1;
    setIdSeq(n => n + 2);
    setMessages(p => [...p, { id: uid, role: 'user', text: txt, ts: new Date() }]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: bid, role: 'bot', text: getResponse(txt), ts: new Date() }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }, [input, typing, idSeq]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const insertCmd = (cmd) => {
    setInput(cmd + ' ');
    inputRef.current?.focus();
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <div className="cb-root" style={{
      margin: '-24px',
      height: 'calc(100vh - 64px)',
      background: '#f4f6fb',
      display: 'flex',
      overflow: 'hidden',
    }}>

      {/* ── Left Panel ────────────────────────────────────────────────────── */}
      <div style={{
        width: '230px', flexShrink: 0,
        background: '#ffffff',
        borderRight: '1px solid #e8ecf4',
        display: 'flex', flexDirection: 'column',
        boxShadow: '2px 0 12px rgba(0,0,0,0.04)',
      }}>

        {/* Brand */}
        <div style={{
          padding: '22px 20px 16px',
          borderBottom: '1px solid #eef0f6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6600, #e04d00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,102,0,0.3)',
              color: '#fff', fontSize: '17px', flexShrink: 0,
            }}>
              <IoChatbubblesOutline />
            </div>
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px', fontWeight: 800,
                color: '#1a2235', letterSpacing: '-0.3px',
              }}>
                MINSAT<span style={{ color: '#ff6600' }}>.ai</span>
              </div>
              <div style={{ fontSize: '10px', color: '#9ba3b8', fontWeight: 500, marginTop: '1px' }}>
                Telecom Assistant
              </div>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div style={{ padding: '16px 14px 8px', flex: 1, overflowY: 'auto' }}>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#b0b8cc', marginBottom: '10px',
            paddingLeft: '4px',
          }}>
            Quick Commands
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {CMDS.map(c => (
              <button
                key={c.label}
                className="cb-qcmd"
                onClick={() => insertCmd(c.label)}
                style={{
                  background: '#fafbfd',
                  border: '1px solid #eef0f6',
                  borderRadius: '9px',
                  padding: '9px 11px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className="cb-cmd-lbl" style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11.5px', fontWeight: 600,
                    color: '#4a5568',
                    transition: 'color 0.15s',
                  }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '10px', color: '#9ba3b8', marginTop: '2px' }}>
                    {c.desc}
                  </div>
                </div>
                <FiChevronRight
                  className="cb-cmd-arr"
                  size={13}
                  style={{ color: '#ff6600', opacity: 0, transition: 'opacity 0.15s', flexShrink: 0 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Service status */}
        <div style={{
          padding: '12px 18px 18px',
          borderTop: '1px solid #eef0f6',
        }}>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#b0b8cc', marginBottom: '10px',
          }}>
            Services
          </div>
          {SERVICES.map(s => (
            <div key={s.name} className="cb-svc-row" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{ fontSize: '11.5px', color: '#4a5568', fontWeight: 500 }}>
                {s.name}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: 600,
                padding: '2px 7px', borderRadius: '20px',
                background: s.up ? '#f0fdf4' : '#f9fafb',
                color: s.up ? '#16a34a' : '#9ca3af',
                border: `1px solid ${s.up ? '#bbf7d0' : '#e5e7eb'}`,
              }}>
                {s.up ? '● ON' : '○ OFF'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat Area ─────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
      }}>

        {/* Header */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e8ecf4',
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', gap: '14px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        }}>
          {/* Avatar + status ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff6600, #e04d00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '19px',
              boxShadow: '0 4px 14px rgba(255,102,0,0.28)',
            }}>
              <FiCpu />
            </div>
            <div style={{
              position: 'absolute', bottom: '-2px', right: '-2px',
              width: '12px', height: '12px', borderRadius: '50%',
              background: '#22c55e', border: '2px solid #fff',
            }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '15px', fontWeight: 700,
              color: '#1a2235', letterSpacing: '-0.2px',
            }}>
              MINSAT Assistant
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '1px', fontWeight: 500 }}>
              Telecom AI · Powered by MINSAT v3
            </div>
          </div>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              background: '#fff5f0', border: '1px solid #ffd6bb',
              borderRadius: '20px', padding: '5px 12px',
              fontSize: '11px', fontWeight: 600, color: '#ff6600',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <FiZap size={11} />
              {messages.length - 1} messages
            </div>
            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: '20px', padding: '5px 12px',
              fontSize: '11px', fontWeight: 600, color: '#16a34a',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <FiCheck size={11} />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="cb-scroll" style={{
          flex: 1, overflowY: 'auto',
          padding: '28px 32px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="cb-msg"
              style={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: '10px',
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: msg.role === 'bot'
                  ? 'linear-gradient(135deg, #ff6600, #e04d00)'
                  : '#e8ecf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: msg.role === 'bot' ? '#fff' : '#6b7280',
                fontSize: msg.role === 'bot' ? '15px' : '14px',
                boxShadow: msg.role === 'bot'
                  ? '0 3px 10px rgba(255,102,0,0.22)'
                  : '0 2px 6px rgba(0,0,0,0.07)',
              }}>
                {msg.role === 'bot' ? <IoChatbubblesOutline /> : <FiUser />}
              </div>

              {/* Bubble */}
              <div style={{
                maxWidth: '62%',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #ff6600, #e04d00)'
                  : '#ffffff',
                borderRadius: msg.role === 'user'
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                padding: '13px 17px',
                boxShadow: msg.role === 'user'
                  ? '0 4px 16px rgba(255,102,0,0.28)'
                  : '0 2px 12px rgba(0,0,0,0.06)',
                border: msg.role === 'bot' ? '1px solid #e8ecf4' : 'none',
              }}>
                <pre style={{
                  margin: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11.5px',
                  lineHeight: '1.8',
                  color: msg.role === 'user' ? '#fff' : '#1a2235',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                </pre>
                <div style={{
                  marginTop: '8px', fontSize: '10px', fontWeight: 500,
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : '#b0b8cc',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {fmt(msg.ts)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing */}
          {typing && (
            <div className="cb-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #ff6600, #e04d00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '15px', flexShrink: 0,
                boxShadow: '0 3px 10px rgba(255,102,0,0.22)',
              }}>
                <IoChatbubblesOutline />
              </div>
              <div style={{
                background: '#ffffff', border: '1px solid #e8ecf4',
                borderRadius: '18px 18px 18px 4px',
                padding: '16px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#ff6600',
                  }} className={`cb-dot-${i+1}`} />
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid #e8ecf4',
          padding: '16px 28px 20px',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
        }}>
          <div
            className="cb-input-wrap"
            style={{
              display: 'flex', gap: '10px', alignItems: 'flex-end',
              background: '#f8faff',
              border: '1.5px solid #e0e6f0',
              borderRadius: '16px',
              padding: '6px 6px 6px 18px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            <textarea
              ref={inputRef}
              className="cb-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a command or ask a question… (Enter to send)"
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                resize: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13.5px', fontWeight: 500,
                color: '#1a2235', lineHeight: '1.55',
                padding: '8px 0', maxHeight: '100px', overflowY: 'auto',
              }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
            />
            <button
              className="cb-send"
              onClick={send}
              disabled={!input.trim() || typing}
              style={{
                background: input.trim() && !typing
                  ? 'linear-gradient(135deg, #ff6600, #e04d00)'
                  : '#e8ecf4',
                border: 'none', borderRadius: '11px',
                width: '42px', height: '42px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: input.trim() && !typing ? '#fff' : '#9ba3b8',
                cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                boxShadow: input.trim() && !typing
                  ? '0 4px 14px rgba(255,102,0,0.32)'
                  : 'none',
                flexShrink: 0, alignSelf: 'flex-end', marginBottom: '2px',
              }}
            >
              <FiSend size={16} />
            </button>
          </div>
          <div style={{
            marginTop: '9px', textAlign: 'center',
            fontSize: '11px', color: '#b0b8cc', fontWeight: 500,
          }}>
            Press <kbd style={{
              background: '#f0f2f8', border: '1px solid #dde2ec',
              borderRadius: '4px', padding: '1px 5px', fontSize: '10px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>Enter</kbd> to send &nbsp;·&nbsp; <kbd style={{
              background: '#f0f2f8', border: '1px solid #dde2ec',
              borderRadius: '4px', padding: '1px 5px', fontSize: '10px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>Shift+Enter</kbd> for new line &nbsp;·&nbsp; /help for all commands
          </div>
        </div>
      </div>
    </div>
  );
}