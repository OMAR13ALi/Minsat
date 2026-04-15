import { Link, Navigate } from "react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiBriefcase, FiAlertCircle } from "react-icons/fi";

const ROLES = [
  { value: "IN",  label: "Agent IN",  desc: "IN network operations" },
  { value: "DFI", label: "Agent DFI", desc: "DFI subscriber management" },
  { value: "DSC", label: "Agent DSC", desc: "DSC service configuration" },
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", { username, email, password, class: type });
      setError(false);
      setErrorMsg("");
      setRedirect(true);
    } catch (err) {
      setError(true);
      setErrorMsg(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="auth-page">
      {/* ── LEFT — form ── */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form__header">
            <h2 className="auth-form__title">Create account</h2>
            <p className="auth-form__sub">Register to access the MINSAT platform</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Username</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><FiUser size={16} /></span>
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><FiMail size={16} /></span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><FiLock size={16} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label>Role</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><FiBriefcase size={16} /></span>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="auth-error">
                <FiAlertCircle size={15} />
                {errorMsg}
              </div>
            )}

            <button type="submit" className="auth-btn">
              Create Account
              <FiArrowRight size={16} />
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      {/* ── RIGHT — visual ── */}
      <div className="auth-left">
        <div className="auth-left__logo">
          <div className="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="logo-text">MINSAT</span>
        </div>

        <div className="auth-left__body">
          <div className="auth-left__badge">
            <span className="badge-dot" />
            <span>Telecom Admin Platform</span>
          </div>
          <h1 className="auth-left__headline">
            Join the team<br />managing <em>real networks</em>
          </h1>
          <p className="auth-left__sub">
            Access is granted per role — your account will be reviewed
            by an administrator before you can sign in.
          </p>
        </div>

        <div className="auth-left__roles">
          {[
            { color: "#ff6600", name: "ADMIN", desc: "Full platform access" },
            { color: "#3b82f6", name: "Agent DFI", desc: "Subscriber & voucher management" },
            { color: "#10b981", name: "Agent DSC", desc: "Service class operations" },
            { color: "#8b5cf6", name: "Agent IN", desc: "IN network operations" },
          ].map(r => (
            <div className="auth-role-item" key={r.name}>
              <div className="role-dot" style={{ background: r.color, boxShadow: `0 0 6px ${r.color}80` }} />
              <div className="role-info">
                <div className="role-name">{r.name}</div>
                <div className="role-desc">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
