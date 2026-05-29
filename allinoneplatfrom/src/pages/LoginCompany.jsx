import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyLoginAPI, companyRegisterAPI } from "../services/AllAPI";
import { successToast, errorToast } from "../toastHelper";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";

const FREE_EMAIL_DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com",
  "mail.com","protonmail.com","yandex.com","aol.com","zoho.com",
  "temp-mail.org","guerrillamail.com","mailinator.com","sharklasers.com",
  "throwaway.email","trashmail.com","fakeinbox.com","dispostable.com"
];
const FAKE_COMPANY_NAMES = [
  "test","testing","abc","xyz","fake","dummy","sample","demo",
  "company","business","corp","firm","asdf","qwerty","hello","temp"
];

export default function LoginCompany() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
  const [confirmedBusiness, setConfirmedBusiness] = useState(false);
  const [userData, setUserData] = useState({ companyName: "", email: "", password: "" });

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isBusinessEmail = (e) => { const d = e.split("@")[1]?.toLowerCase(); return d && !FREE_EMAIL_DOMAINS.includes(d); };
  const isDisposableEmail = (e) => { const d = e.split("@")[1]?.toLowerCase(); return ["mailinator","guerrilla","throwaway","trashmail","fakeinbox","dispost","tempmail","yopmail"].some(k => d?.includes(k)); };

  const validateCompanyName = (n) => {
    if (!n || n.trim().length < 3) return "At least 3 characters required";
    if (/[^a-zA-Z0-9\s&.,'-]/.test(n)) return "Invalid characters in name";
    if (FAKE_COMPANY_NAMES.includes(n.trim().toLowerCase())) return "Please enter your real company name";
    return null;
  };

  const getPasswordStrength = (p) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p) && /\d/.test(p)) s++;
    if (/[@$!%*?&]/.test(p) && p.length >= 10) s++;
    return s;
  };

  const validatePasswordStrong = (p) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(p);
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e"];
  const strengthLabel = ["", "Weak", "Medium", "Strong"];

  const handleChange = (field, value) => {
    setUserData(p => ({ ...p, [field]: value }));
    setFieldErrors(p => ({ ...p, [field]: null }));
    if (field === "password") setPasswordStrength(getPasswordStrength(value));
  };

  const handleRegister = async () => {
    const errors = {};
    const nameErr = validateCompanyName(userData.companyName);
    if (nameErr) errors.companyName = nameErr;
    if (!userData.email) errors.email = "Email is required";
    else if (!validateEmail(userData.email)) errors.email = "Enter a valid email";
    else if (isDisposableEmail(userData.email)) errors.email = "Disposable emails not allowed";
    else if (!isBusinessEmail(userData.email) && !confirmedBusiness) errors.email = "warning";
    if (!userData.password) errors.password = "Password is required";
    else if (!validatePasswordStrong(userData.password)) errors.password = "Min 6 chars · 1 uppercase · 1 number · 1 special char";
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    try {
      setLoading(true);
      const res = await companyRegisterAPI({ companyName: userData.companyName, email: userData.email, password: userData.password });
      if (res.status === 200) { successToast("Company registered!"); setIsLogin(true); }
    } catch (err) {
      const msg = err?.response?.data;
      if (typeof msg === "string" && msg.toLowerCase().includes("exist")) setFieldErrors({ email: "Email already registered" });
      else errorToast(msg || "Registration failed");
    } finally { setLoading(false); }
  };

  const handleLogin = async () => {
    const errors = {};
    if (!userData.email) errors.email = "Email is required";
    else if (!validateEmail(userData.email)) errors.email = "Enter a valid email";
    else if (!isBusinessEmail(userData.email)) errors.email = "Use your registered business email";
    if (!userData.password) errors.password = "Password is required";
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    try {
      setLoading(true);
      const response = await companyLoginAPI({ email: userData.email, password: userData.password });
      if (response.status === 200) {
        localStorage.setItem("companyToken", response.data.token);
        successToast("Welcome back!");
        const role = response.data.existingCompany.role;
        if (role === "admin") navigate("/adminpre");
        else if (role === "user") navigate("/home");
        else navigate("/companyDash");
      }
    } catch (error) {
      if (error?.response?.status === 401) setFieldErrors({ password: "Incorrect password" });
      else if (error?.response?.status === 404) setFieldErrors({ email: "No account with this email" });
      else errorToast(error?.response?.data || "Login failed");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    setFieldErrors({});
    setUserData({ companyName: "", email: "", password: "" });
    setPasswordStrength(0);
    setConfirmedBusiness(false);
  }, [isLogin]);

  const inputBase = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 14,
    background: "#fff",
    color: "#111",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };
  const inputErr = { ...inputBase, border: "1.5px solid #ef4444" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f4f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        borderRadius: 20,
        padding: "36px 32px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
      }}>

        {/* Logo mark */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "#111", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="white" fillOpacity="0.9"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="white" fillOpacity="0.5"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="white" fillOpacity="0.5"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 4 }}>
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginBottom: 28 }}>
          {isLogin ? "Sign in to your company portal" : "Register your company on PrepVault"}
        </p>

        {/* Toggle tabs */}
        <div style={{
          display: "flex",
          background: "#f4f4f5",
          borderRadius: 10,
          padding: 4,
          marginBottom: 24,
        }}>
          {["Sign In", "Register"].map((t, i) => (
            <button key={i} onClick={() => setIsLogin(i === 0)} style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.2s",
              background: (isLogin ? i === 0 : i === 1) ? "#fff" : "transparent",
              color: (isLogin ? i === 0 : i === 1) ? "#111" : "#9ca3af",
              boxShadow: (isLogin ? i === 0 : i === 1) ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Company name */}
          {!isLogin && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Technologies"
                value={userData.companyName}
                style={fieldErrors.companyName ? inputErr : inputBase}
                onChange={e => handleChange("companyName", e.target.value)}
                onFocus={e => { if (!fieldErrors.companyName) e.target.style.borderColor = "#111"; }}
                onBlur={e => { if (!fieldErrors.companyName) e.target.style.borderColor = "#e5e7eb"; }}
              />
              {fieldErrors.companyName && (
                <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                  <XCircle size={12} />{fieldErrors.companyName}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
              Business Email
            </label>
            <input
              type="email"
              placeholder="you@yourcompany.com"
              value={userData.email}
              style={fieldErrors.email ? inputErr : inputBase}
              onChange={e => handleChange("email", e.target.value)}
              onFocus={e => { if (!fieldErrors.email) e.target.style.borderColor = "#111"; }}
              onBlur={e => { if (!fieldErrors.email) e.target.style.borderColor = "#e5e7eb"; }}
            />
            {fieldErrors.email === "warning" ? (
              <div style={{
                marginTop: 8, padding: "10px 12px",
                background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8,
              }}>
                <p style={{ fontSize: 12, color: "#92400e", marginBottom: 6, display: "flex", gap: 5, alignItems: "center" }}>
                  <AlertCircle size={12} color="#d97706" /> Personal email detected — that's fine for small businesses.
                </p>
                <button
                  onClick={() => { setConfirmedBusiness(true); setFieldErrors(p => ({ ...p, email: null })); }}
                  style={{ fontSize: 12, fontWeight: 600, color: "#92400e", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                >
                  Confirm — this is my real company email
                </button>
              </div>
            ) : fieldErrors.email ? (
              <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                <XCircle size={12} />{fieldErrors.email}
              </p>
            ) : !isLogin && userData.email && validateEmail(userData.email) && isBusinessEmail(userData.email) ? (
              <p style={{ fontSize: 12, color: "#16a34a", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                <CheckCircle size={12} /> Business email verified
              </p>
            ) : null}
            {isLogin && userData.email && validateEmail(userData.email) && !isBusinessEmail(userData.email) && (
              <div style={{ marginTop: 8, padding: "9px 11px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, display: "flex", gap: 7, alignItems: "flex-start" }}>
                <AlertCircle size={13} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#92400e" }}>Only business email accounts can access this portal.</p>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={userData.password}
                style={{ ...(fieldErrors.password ? inputErr : inputBase), paddingRight: 42 }}
                onChange={e => handleChange("password", e.target.value)}
                onFocus={e => { if (!fieldErrors.password) e.target.style.borderColor = "#111"; }}
                onBlur={e => { if (!fieldErrors.password) e.target.style.borderColor = "#e5e7eb"; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                <XCircle size={12} />{fieldErrors.password}
              </p>
            )}
            {/* Strength bar */}
            {!isLogin && userData.password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 999,
                      background: passwordStrength >= i ? strengthColor[passwordStrength] : "#e5e7eb",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
                {passwordStrength > 0 && (
                  <p style={{ fontSize: 11, color: strengthColor[passwordStrength] }}>
                    {strengthLabel[passwordStrength]} password
                  </p>
                )}
              </div>
            )}
            {!isLogin && (
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>
                Min 6 chars · 1 uppercase · 1 number · 1 special character
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            onClick={isLogin ? handleLogin : handleRegister}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              border: "none",
              background: loading ? "#d1d5db" : "#111",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 4,
              transition: "background 0.2s",
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.background = "#222"; }}
            onMouseOut={e => { if (!loading) e.currentTarget.style.background = "#111"; }}
          >
            {loading
              ? <><Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />{isLogin ? "Signing in..." : "Registering..."}</>
              : <>{isLogin ? "Sign In" : "Create Account"}<ArrowRight size={15} /></>
            }
          </button>
        </div>

        {/* Switch */}
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
          {isLogin ? "New to PrepVault? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: "none", border: "none", color: "#111", fontWeight: 600, fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
          >
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}