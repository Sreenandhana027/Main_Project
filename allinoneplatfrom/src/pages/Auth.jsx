import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUserAPI, registerUserAPI, googleLoginUserAPI } from "../services/AllAPI";
import { successToast, errorToast } from "../toastHelper";
import { Camera, User as UserIcon, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState("");
    const [userData, setUserData] = useState({ username: "", email: "", password: "", profile: "" });

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const validatePasswordStrong = (p) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(p);

    const HandleFileUpload = (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setPreview(URL.createObjectURL(image));
        setUserData({ ...userData, profile: image });
    };

    const handleRegister = async () => {
        if (!userData.username || !userData.email || !userData.password) { errorToast("Please fill all fields"); return; }
        if (!validateEmail(userData.email)) { errorToast("Please enter a valid email address"); return; }
        if (!validatePasswordStrong(userData.password)) { errorToast("Min 6 chars · 1 uppercase · 1 number · 1 special character"); return; }
        const reqBody = new FormData();
        reqBody.append("username", userData.username);
        reqBody.append("email", userData.email);
        reqBody.append("password", userData.password);
        if (userData.profile) reqBody.append("profile", userData.profile);
        try {
            setLoading(true);
            const res = await registerUserAPI(reqBody);
            if (res.status === 200) { successToast("Registration successful"); setIsLogin(true); setUserData({ username: "", email: "", password: "", profile: "" }); setPreview(""); }
        } catch (err) { errorToast(err?.response?.data || "Registration failed"); }
        finally { setLoading(false); }
    };

    const handleLogin = async () => {
        const { email, password } = userData;
        if (!email || !password) { errorToast("Please fill all fields"); return; }
        if (!validateEmail(email)) { errorToast("Please enter a valid email address"); return; }
        try {
            setLoading(true);
            const response = await loginUserAPI({ email, password });
            if (response.status === 200) {
                localStorage.setItem("userToken", response.data.token);
                successToast("Login successful");
                if (response.data.existingUser.role === "admin") navigate("/adminpre");
                else navigate("/home");
            }
        } catch { errorToast("Login failed. Please check your credentials."); }
        finally { setLoading(false); }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        if (!credentialResponse?.credential) { errorToast("Google credential missing"); return; }
        const decoded = jwtDecode(credentialResponse.credential);
        try {
            const res = await googleLoginUserAPI({ username: decoded.name, email: decoded.email, password: "googlepsswrd", profile: decoded.picture });
            if (res.status === 200) {
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.existingUser));
                successToast("Logged in with Google");
                navigate("/home");
            }
        } catch { errorToast("Google login failed"); }
    };

    useEffect(() => {
        setUserData({ username: "", email: "", password: "", profile: "" });
        setPreview("");
    }, [isLogin]);

    const inp = (hasErr) => ({
        width: "100%",
        padding: "11px 14px",
        borderRadius: 8,
        border: `1.5px solid ${hasErr ? "#f87171" : "#ebebeb"}`,
        fontSize: 14,
        background: "#fafafa",
        color: "#0f0f0f",
        outline: "none",
        fontFamily: "inherit",
        transition: "border-color 0.18s, background 0.18s",
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        .auth-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .auth-field:focus { border-color: #0f0f0f !important; background: #fff !important; outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spinIt { to { transform: rotate(360deg); } }
        .auth-card { animation: fadeUp 0.4s ease both; }
        .g-btn-wrap > div { width: 100% !important; border-radius: 8px !important; }
        .profile-ring:hover .cam-icon { opacity: 1 !important; }
        .profile-ring:hover { border-color: #0f0f0f !important; }
      `}</style>

            <div className="auth-wrap" style={{
                minHeight: "100vh",
                display: "flex",
                background: "linear-gradient(135deg, #e8f4fd 0%, #f0e8fd 50%, #fde8f0 100%)",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                fontFamily: "'Nunito', sans-serif",
            }}>

                {/* Decorative blobs */}
                <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.08)", top: -100, left: -100, pointerEvents: "none", filter: "blur(60px)" }} />
                <div style={{ position: "fixed", width: 300, height: 300, borderRadius: "50%", background: "rgba(236,72,153,0.07)", bottom: -80, right: -80, pointerEvents: "none", filter: "blur(50px)" }} />

                <div className="auth-card" style={{
                    width: "100%",
                    maxWidth: 420,
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 24,
                    padding: "36px 32px 32px",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.6)",
                    position: "relative",
                    zIndex: 1,
                }}>

                    {/* Top accent bar */}
                    <div style={{
                        position: "absolute", top: 0, left: "10%", right: "10%", height: 3,
                        background: "linear-gradient(90deg, #6366f1, #ec4899)",
                        borderRadius: "0 0 8px 8px",
                    }} />

                    {/* Avatar (register only) */}
                    {!isLogin && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                            <label className="profile-ring" style={{
                                width: 80, height: 80, borderRadius: "50%",
                                border: "2px dashed #d1d5db",
                                background: "#f9fafb",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", overflow: "hidden", position: "relative",
                                transition: "border-color 0.2s",
                            }}>
                                <input type="file" hidden onChange={HandleFileUpload} accept="image/*" />
                                {preview
                                    ? <img src={preview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <UserIcon size={28} color="#d1d5db" />
                                }
                                <div className="cam-icon" style={{
                                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    opacity: preview ? 0 : 0, transition: "opacity 0.2s",
                                }}>
                                    <Camera size={18} color="#fff" />
                                </div>
                            </label>
                            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, letterSpacing: "0.05em" }}>Click to upload photo</p>
                        </div>
                    )}

                    {/* Logo + heading */}
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <div style={{
                            width: 42, height: 42, borderRadius: 12,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 12,
                            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                        }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L3 6v4c0 4 3.1 7.7 7 8.9C13.9 17.7 17 14 17 10V6l-7-4z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.4px" }}>
                            {isLogin ? "Welcome back" : "Join PrepVault"}
                        </h1>
                        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                            {isLogin ? "Sign in to your account" : "Create your free account today"}
                        </p>
                    </div>

                    {/* Tab toggle */}
                    <div style={{
                        display: "flex", background: "#f3f4f6", borderRadius: 10, padding: 4, marginBottom: 24,
                    }}>
                        {["Sign In", "Register"].map((t, i) => (
                            <button key={i} onClick={() => setIsLogin(i === 0)} style={{
                                flex: 1, padding: "8px 0", borderRadius: 8, border: "none",
                                fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
                                transition: "all 0.2s",
                                background: (isLogin ? i === 0 : i === 1) ? "#fff" : "transparent",
                                color: (isLogin ? i === 0 : i === 1) ? "#0f0f0f" : "#9ca3af",
                                boxShadow: (isLogin ? i === 0 : i === 1) ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                            }}>{t}</button>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                        {/* Username */}
                        {!isLogin && (
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Username</label>
                                <input
                                    type="text" placeholder="Your name" className="auth-field"
                                    value={userData.username} style={inp(false)}
                                    onChange={e => setUserData({ ...userData, username: e.target.value })}
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Email</label>
                            <input
                                type="email" placeholder="you@email.com" className="auth-field"
                                value={userData.email} style={inp(false)}
                                onChange={e => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Password</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"} placeholder="••••••••" className="auth-field"
                                    value={userData.password} style={{ ...inp(false), paddingRight: 42 }}
                                    onChange={e => setUserData({ ...userData, password: e.target.value })}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                    background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 0,
                                }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
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
                                width: "100%", padding: "12px", borderRadius: 10, border: "none",
                                background: loading ? "#c7d2fe" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                                cursor: loading ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                marginTop: 4,
                                boxShadow: loading ? "none" : "0 4px 14px rgba(99,102,241,0.4)",
                                transition: "all 0.2s",
                            }}
                            onMouseOver={e => { if (!loading) e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.5)"; }}
                            onMouseOut={e => { if (!loading) e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.4)"; }}
                        >
                            {loading
                                ? <><Loader2 size={16} style={{ animation: "spinIt 0.8s linear infinite" }} />{isLogin ? "Signing in..." : "Creating..."}</>
                                : <>{isLogin ? "Sign In" : "Create Account"}<ArrowRight size={15} /></>
                            }
                        </button>

                        {/* Divider */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "2px 0" }}>
                            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                            <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.06em" }}>OR</span>
                            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                        </div>

                        {/* Google */}
                        <div className="g-btn-wrap" style={{ display: "flex", justifyContent: "center" }}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => errorToast("Google Login Failed")}
                            />
                        </div>
                    </div>

                    {/* Switch */}
                    <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setPreview(""); }}
                            style={{ background: "none", border: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#6366f1", cursor: "pointer", padding: 0 }}
                        >
                            {isLogin ? "Create one" : "Sign in"}
                        </button>
                    </p>

                </div>
            </div>
        </>
    );
}