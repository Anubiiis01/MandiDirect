"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    otp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (loginMethod === 'password' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (loginMethod === 'password' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    if (showOTP && !formData.otp) {
      newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 // Simulate login attempt
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setIsLoading(true);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate failed login (for demo - first attempt fails) - ONLY on Login
  if (loginMethod === 'password' && failedAttempts === 0 && isLogin) {
    setFailedAttempts(prev => prev + 1);
    setErrors({ password: 'Invalid credentials. Try OTP instead?' });
    setIsLoading(false);
    return;
  }

  // Success
  alert(isLogin ? 'Login successful! 🎉' : 'Account created successfully! 🎉');
  setIsLoading(false);
};

  // Send OTP
  const handleSendOTP = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email first' });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
    setShowOTP(true);
    setLoginMethod('otp');
    setIsLoading(false);
    alert('OTP sent to your email! 📧');
  };

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp) {
      setErrors({ otp: 'Please enter OTP' });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('OTP verified! Login successful! 🎉');
    setIsLoading(false);
  };

  return (
    <>
      <style jsx global>{`
        /* ============================================
           MANDIDIRECT 2.0 THEME VARIABLES
           ============================================ */
        :root {
          --md-green-dark: #2E7D32;
          --md-green-bright: #64DD17;
          --md-green-light: #E8F5E9;
          --md-green-50: #F1F8E9;
          
          --md-slate-900: #0F172A;
          --md-slate-800: #1E293B;
          --md-slate-600: #475569;
          --md-slate-500: #64748B;
          --md-slate-400: #94A3B8;
          --md-slate-100: #F1F5F9;
          --md-slate-50: #F8FAFC;
          
          --md-accent-red: #DC2626;
          --md-accent-orange: #F59E0B;
          
          --md-radius-xl: 1.5rem;
          --md-radius-2xl: 2rem;
          --md-radius-3xl: 2.5rem;
          
          --md-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --md-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          --md-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          
          --md-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ============================================
           FORCE LIGHT THEME
           ============================================ */
        .auth-page-container,
        .auth-page-container * {
          color-scheme: light;
        }

        /* ============================================
           BASE STYLES
           ============================================ */
        .auth-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--md-green-50) 0%, #FFFFFF 50%, var(--md-green-light) 100%);
          color: var(--md-slate-900);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ============================================
           NAVIGATION (Matching Site)
           ============================================ */
        .auth-nav {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .auth-logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--md-green-dark);
          letter-spacing: -0.05em;
          text-decoration: none;
        }

        .auth-logo:hover {
          color: var(--md-green-bright);
        }

        .auth-back-link {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-600);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color var(--md-transition);
        }

        .auth-back-link:hover {
          color: var(--md-green-dark);
        }

        /* ============================================
           MAIN CONTENT
           ============================================ */
        .auth-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .auth-card {
          background: #FFFFFF;
          border-radius: var(--md-radius-3xl);
          box-shadow: var(--md-shadow-2xl);
          padding: 3rem;
          width: 100%;
          max-width: 28rem;
          border: 2px solid var(--md-slate-100);
        }

        @media (min-width: 640px) {
          .auth-card {
            padding: 3.5rem;
          }
        }

        /* ============================================
           HEADER
           ============================================ */
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-icon {
          width: 4rem;
          height: 4rem;
          background: var(--md-green-light);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }

        .auth-title {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--md-slate-900);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .auth-subtitle {
          font-size: 0.875rem;
          color: var(--md-slate-500);
          font-weight: 600;
        }

        /* ============================================
           TOGGLE (Login/Signup)
           ============================================ */
        .auth-toggle {
          display: flex;
          background: var(--md-slate-100);
          border-radius: var(--md-radius-2xl);
          padding: 0.25rem;
          margin-bottom: 2rem;
        }

        .auth-toggle-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-600);
          cursor: pointer;
          border-radius: calc(var(--md-radius-2xl) - 4px);
          transition: all var(--md-transition);
        }

        .auth-toggle-btn.active {
          background: #FFFFFF;
          color: var(--md-green-dark);
          box-shadow: var(--md-shadow-lg);
        }

        .auth-toggle-btn:hover:not(.active) {
          color: var(--md-green-dark);
        }

        /* ============================================
           FORM STYLES
           ============================================ */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--md-slate-700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input {
          padding: 1rem 1.25rem;
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--md-slate-900);
          background: var(--md-slate-50);
          transition: all var(--md-transition);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--md-green-dark);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px var(--md-green-light);
        }

        .form-input.error {
          border-color: var(--md-accent-red);
          background: #FEF2F2;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 3px #FEE2E2;
        }

        .form-error {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-accent-red);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* ============================================
           OTP SECTION
           ============================================ */
        .otp-section {
          background: var(--md-green-50);
          border: 2px dashed var(--md-green-dark);
          border-radius: var(--md-radius-xl);
          padding: 1.25rem;
          margin-top: 0.5rem;
        }

        .otp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .otp-title {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--md-green-dark);
        }

        .otp-resend {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-green-dark);
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: underline;
        }

        .otp-resend:hover {
          color: var(--md-green-bright);
        }

        .otp-inputs {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .otp-input {
          width: 3rem;
          height: 3.5rem;
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          font-size: 1.25rem;
          font-weight: 800;
          text-align: center;
          background: #FFFFFF;
          transition: all var(--md-transition);
        }

        .otp-input:focus {
          outline: none;
          border-color: var(--md-green-dark);
          box-shadow: 0 0 0 3px var(--md-green-light);
        }

        /* ============================================
           BUTTONS
           ============================================ */
        .btn-primary {
          width: 100%;
          padding: 1rem 1.5rem;
          background: var(--md-green-bright);
          color: #000000;
          border: none;
          border-radius: var(--md-radius-2xl);
          font-size: 0.9375rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all var(--md-transition);
          box-shadow: var(--md-shadow-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: var(--md-shadow-xl);
          background: #74E529;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          width: 100%;
          padding: 1rem 1.5rem;
          background: var(--md-slate-100);
          color: var(--md-slate-700);
          border: 2px solid var(--md-slate-200);
          border-radius: var(--md-radius-2xl);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--md-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-secondary:hover {
          background: var(--md-slate-200);
          border-color: var(--md-slate-300);
        }

        /* ============================================
           DIVIDER
           ============================================ */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .auth-divider-line {
          flex: 1;
          height: 2px;
          background: var(--md-slate-100);
        }

        .auth-divider-text {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-slate-400);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ============================================
           ALTERNATIVE METHODS
           ============================================ */
        .alternative-method {
          background: var(--md-slate-50);
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all var(--md-transition);
        }

        .alternative-method:hover {
          border-color: var(--md-green-dark);
          background: var(--md-green-light);
        }

        .alt-method-info {
          display: flex;
          align-items: center;
          gap: 0.10 rem;
        }

        .alt-method-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: #FFFFFF;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .alt-method-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-700);
        }

        .alt-method-arrow {
          font-size: 1.25rem;
          color: var(--md-green-dark);
        }

        /* ============================================
           FOOTER LINKS
           ============================================ */
        .auth-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .auth-footer-text {
          font-size: 0.875rem;
          color: var(--md-slate-500);
          font-weight: 600;
        }

        .auth-footer-link {
          color: var(--md-green-dark);
          font-weight: 800;
          text-decoration: none;
        }

        .auth-footer-link:hover {
          color: var(--md-green-bright);
          text-decoration: underline;
        }

        /* ============================================
           LOADING SPINNER
           ============================================ */
        .loading-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #FFFFFF;
          border-top-color: transparent;
          border-radius: 9999px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ============================================
           ALERT BOX
           ============================================ */
        .alert-box {
          background: var(--md-green-light);
          border: 2px solid var(--md-green-dark);
          border-radius: var(--md-radius-xl);
          padding: 1rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-box.error {
          background: #FEF2F2;
          border-color: var(--md-accent-red);
        }

        .alert-icon {
          font-size: 1.25rem;
        }

        .alert-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-700);
        }

        .alert-box.error .alert-text {
          color: var(--md-accent-red);
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 640px) {
          .auth-card {
            padding: 2rem;
            border-radius: var(--md-radius-2xl);
          }

          .auth-title {
            font-size: 1.5rem;
          }

          .otp-input {
            width: 2.5rem;
            height: 3rem;
          }
        }

        /* ============================================
           ACCESSIBILITY
           ============================================ */
        .auth-page-container *:focus {
          outline: 3px solid var(--md-green-bright);
          outline-offset: 2px;
        }

        .auth-page-container *:focus:not(:focus-visible) {
          outline: none;
        }

        .auth-page-container *:focus-visible {
          outline: 3px solid var(--md-green-bright);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-page-container *,
          .auth-page-container *::before,
          .auth-page-container *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="auth-page-container">
        {/* Navigation */}
        <nav className="auth-nav">
          <Link href="/" className="auth-logo">MandiDirect 2.0</Link>
          <Link href="/" className="auth-back-link">
            ← Back to Home
          </Link>
        </nav>

        {/* Main Content */}
        <main className="auth-main">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <div className="auth-icon">🌿</div>
              <h1 className="auth-title">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="auth-subtitle">
                {isLogin 
                  ? 'Sign in to continue your journey' 
                  : 'Join the fresh produce revolution'}
              </p>
            </div>

            {/* Login/Signup Toggle */}
            <div className="auth-toggle">
              <button
                className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(true);
                  setLoginMethod('password');
                  setShowOTP(false);
                  setErrors({});
                }}
              >
                Login
              </button>
              <button
                className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(false);
                  setLoginMethod('password');
                  setShowOTP(false);
                  setErrors({});
                }}
              >
                Sign Up
              </button>
            </div>

            
            {/* Alert for Failed Login - ONLY on Login Page */}
{failedAttempts > 0 && loginMethod === 'password' && isLogin && (
  <div className="alert-box error">
    <span className="alert-icon">⚠️</span>
    <span className="alert-text">
      Login failed. Try using OTP instead!
    </span>
  </div>
)}

            {/* Form */}
            {showOTP && loginMethod === 'otp' ? (
              <form onSubmit={handleVerifyOTP} className="auth-form">
                <div className="otp-section">
                  <div className="otp-header">
                    <span className="otp-title">📧 Enter OTP</span>
                    <button
                      type="button"
                      className="otp-resend"
                      onClick={handleSendOTP}
                    >
                      Resend
                    </button>
                  </div>
                  <p className="auth-subtitle" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    Sent to {formData.email}
                  </p>
                  <div className="otp-inputs">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="otp-input"
                        value={formData.otp[i] || ''}
                        onChange={(e) => {
                          const newOtp = formData.otp.split('');
                          newOtp[i] = e.target.value;
                          setFormData(prev => ({ ...prev, otp: newOtp.join('') }));
                          if (e.target.value && i < 5) {
                            (e.target.nextElementSibling as HTMLInputElement)?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !formData.otp[i] && i > 0) {
                            ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="form-error" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                      ⚠️ {errors.otp}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      ✓ Verify & Login
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowOTP(false);
                    setLoginMethod('password');
                  }}
                >
                  ← Back to Password
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="auth-form">
                {/* Name Field (Signup Only) */}
                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <span className="form-error">⚠️ {errors.name}</span>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="form-error">⚠️ {errors.email}</span>
                  )}
                </div>

                {/* Password Field (Only for Password Method) */}
                {loginMethod === 'password' && (
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
  <span className="form-error">⚠️ {errors.password}</span>
)}
{isLogin && failedAttempts > 0 && (
  <p style={{ fontSize: '0.75rem', color: 'var(--md-slate-500)', marginTop: '0.25rem' }}>
    💡 Having trouble? Try OTP login below!
  </p>
)}
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? '🔐 Sign In' : '🚀 Create Account'}
                    </>
                  )}
                </button>

                {/* Forgot Password (Login Only) */}
                {isLogin && loginMethod === 'password' && (
                  <div style={{ textAlign: 'center' }}>
                    <Link
                      href="#"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: 'var(--md-slate-500)',
                        textDecoration: 'none'
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}
              </form>
            )}

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line"></div>
            </div>

            {/* Alternative Login Method (OTP) */}
            {/* Alternative Login Method (OTP) - ONLY on Login Page */}
{loginMethod === 'password' && isLogin && (
  <button
    type="button"
    className="alternative-method"
    onClick={handleSendOTP}
    disabled={isLoading || !formData.email}
  >
    <div className="alt-method-info">
      <div className="alt-method-icon">📧</div>
      <span className="alt-method-text">
        {failedAttempts > 0 ? 'Try Login with OTP' : 'Login with OTP'}
      </span>
    </div>
    <span className="alt-method-arrow">→</span>
  </button>
)}

            {/* Footer */}
            <div className="auth-footer">
              <p className="auth-footer-text">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setLoginMethod('password');
                    setShowOTP(false);
                    setErrors({});
                  }}
                  className="auth-footer-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}