/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", { email, password });
      setError(false);
      setErrorMsg("");

      if (data.user.status === 0) {
        setError(true);
        setErrorMsg("Your account has been blocked or is inactive.");
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setCurrentUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(true);
      setErrorMsg(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-page">
      {/* ── LEFT PANEL ── */}
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
            Subscriber management<br />at the <em>speed of light</em>
          </h1>
          <p className="auth-left__sub">
            Secure access to AIR subscriber data, service class management,
            voucher lookup, and real-time transaction monitoring.
          </p>
        </div>

        <div className="auth-left__stats">
          <div className="auth-stat">
            <div className="stat-value">23</div>
            <div className="stat-label">AIR Methods</div>
          </div>
          <div className="auth-stat">
            <div className="stat-value">4</div>
            <div className="stat-label">Role Levels</div>
          </div>
          <div className="auth-stat">
            <div className="stat-value">100%</div>
            <div className="stat-label">UCIP/ACIP</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form__header">
            <h2 className="auth-form__title">Welcome back</h2>
            <p className="auth-form__sub">Sign in to your MINSAT account</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
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
              <div className="auth-row">
                <label>Password</label>
                <Link to="/forgetpassword" className="auth-forgot">Forgot password?</Link>
              </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><FiLock size={16} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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

            {error && (
              <div className="auth-error">
                <FiAlertCircle size={15} />
                {errorMsg}
              </div>
            )}

            <button type="submit" className="auth-btn">
              Sign In
              <FiArrowRight size={16} />
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
