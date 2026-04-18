import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUserAPI, registerUserAPI, googleLoginUserAPI } from "../services/AllAPI";
import { successToast, errorToast } from "../toastHelper";
import { Camera, User as UserIcon } from "lucide-react";

export default function Auth() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({ 
        username: "", 
        email: "", 
        password: "",
        profile: "" 
    });
    const [preview, setPreview] = useState("");

    const HandleFileUpload = (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setPreview(URL.createObjectURL(image));
        setUserData({
            ...userData,
            profile: image
        });
    };

    const handleRegister = async () => {
        if (!userData.username || !userData.email || !userData.password) { 
            errorToast("Please fill all fields"); 
            return; 
        }

        const reqBody = new FormData();
        reqBody.append("username", userData.username);
        reqBody.append("email", userData.email);
        reqBody.append("password", userData.password);
        if (userData.profile) {
            reqBody.append("profile", userData.profile);
        }

        try {
            setLoading(true);
            const res = await registerUserAPI(reqBody);
            if (res.status === 200) { 
                successToast("Registration successful");
                setIsLogin(true); 
                setUserData({ username: "", email: "", password: "", profile: "" });
                setPreview("");
            }
        } catch (err) { 
            errorToast(err?.response?.data || "Registration failed"); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleLogin = async () => {
        const { email, password } = userData;
        if (!email || !password) { 
            errorToast("Please fill all fields"); 
            return; 
        }
        try {
            setLoading(true);
            const response = await loginUserAPI({ email, password });
            if (response.status === 200) {
                localStorage.setItem("userToken", response.data.token);
                successToast("Login successful");
                if (response.data.existingUser.role === "admin") { 
                    navigate("/adminpre"); 
                } else { 
                    navigate("/home"); 
                }
            }
        } catch (error) { 
            errorToast("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        if (!credentialResponse?.credential) { 
            errorToast("Google credential missing"); 
            return; 
        }
        const decoded = jwtDecode(credentialResponse.credential);
        try {
            const res = await googleLoginUserAPI({ 
                username: decoded.name, 
                email: decoded.email, 
                password: "googlepsswrd", 
                profile: decoded.picture 
            });
            if (res.status === 200) {
                localStorage.setItem("userToken", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.existingUser));
                successToast("Successfully logged in with Google");
                navigate("/home");
            }
        } catch (err) { 
            errorToast("Google login failed"); 
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("userToken");
        if (savedToken) setToken(savedToken);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .auth-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f5f5f5;
                    font-family: 'DM Sans', sans-serif;
                    padding: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .auth-root::before {
                    content: '';
                    position: absolute;
                    width: 700px;
                    height: 700px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
                    top: -200px; left: -200px;
                    pointer-events: none;
                }

                .auth-root::after {
                    content: '';
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
                    bottom: -100px; right: -100px;
                    pointer-events: none;
                }

                .auth-card {
                    width: 100%;
                    max-width: 900px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 620px;
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                    z-index: 1;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08);
                    animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) both;
                }

                @keyframes cardReveal {
                    from { opacity: 0; transform: translateY(24px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* LEFT PANEL */
                .auth-left {
                    background: #0a0a0a;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 3rem;
                    position: relative;
                    overflow: hidden;
                }

                .auth-left::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background:
                        repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px),
                        repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px);
                    pointer-events: none;
                }

                .auth-left-top { position: relative; z-index: 1; }

                .brand-mark {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 3rem;
                }

                .brand-icon {
                    width: 36px;
                    height: 36px;
                    border: 1.5px solid rgba(255,255,255,0.3);
                    border-radius: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .brand-icon svg {
                    width: 18px;
                    height: 18px;
                    stroke: #fff;
                    fill: none;
                    stroke-width: 1.5;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }

                .brand-name {
                    font-size: 0.72rem;
                    font-weight: 500;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.6);
                }

                .left-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 3rem;
                    font-weight: 300;
                    line-height: 1.15;
                    color: #ffffff;
                    letter-spacing: -0.01em;
                }

                .left-headline em {
                    font-style: italic;
                    color: rgba(255,255,255,0.5);
                }

                .left-sub {
                    margin-top: 1rem;
                    font-size: 0.82rem;
                    font-weight: 300;
                    color: rgba(255,255,255,0.3);
                    line-height: 1.75;
                    letter-spacing: 0.02em;
                }

                .auth-left-bottom { position: relative; z-index: 1; }

                .feature-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }

                .feature-list li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.76rem;
                    color: rgba(255,255,255,0.28);
                    letter-spacing: 0.03em;
                }

                .feature-dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.35);
                    flex-shrink: 0;
                }

                /* RIGHT PANEL */
                .auth-right {
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 2.5rem 3.5rem;
                }

                .tab-switcher {
                    display: flex;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #e8e8e8;
                }

                .tab-btn {
                    flex: 1;
                    background: none;
                    border: none;
                    padding: 0.6rem 0;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    cursor: pointer;
                    color: #c0c0c0;
                    border-bottom: 2px solid transparent;
                    margin-bottom: -1px;
                    transition: all 0.22s ease;
                }

                .tab-btn.active {
                    color: #0a0a0a;
                    border-bottom-color: #0a0a0a;
                }

                .tab-btn:hover:not(.active) { color: #666; }

                .form-fields { display: flex; flex-direction: column; gap: 1rem; }

                /* Profile Upload Styles */
                .profile-upload-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    animation: fieldIn 0.35s ease both;
                }

                .profile-circle {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background: #fafafa;
                    border: 1px solid #e8e8e8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .profile-circle:hover {
                    border-color: #0a0a0a;
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .profile-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .upload-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .profile-circle:hover .upload-overlay {
                    opacity: 1;
                }

                .upload-text {
                    font-size: 0.65rem;
                    color: #aaa;
                    margin-top: 0.6rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    font-weight: 500;
                }

                .field-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                    animation: fieldIn 0.35s ease both;
                }

                @keyframes fieldIn {
                    from { opacity: 0; transform: translateY(7px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .field-label {
                    font-size: 0.67rem;
                    font-weight: 500;
                    letter-spacing: 0.13em;
                    text-transform: uppercase;
                    color: #999;
                }

                .field-input {
                    width: 100%;
                    background: #fafafa;
                    border: 1px solid #e8e8e8;
                    border-radius: 2px;
                    padding: 0.78rem 1rem;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.88rem;
                    color: #0a0a0a;
                    outline: none;
                    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
                }

                .field-input::placeholder { color: #ccc; }

                .field-input:focus {
                    border-color: #0a0a0a;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
                }

                .submit-btn {
                    width: 100%;
                    background: #0a0a0a;
                    color: #fff;
                    border: none;
                    border-radius: 2px;
                    padding: 0.88rem 1rem;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 500;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    cursor: pointer;
                    margin-top: 0.4rem;
                    transition: all 0.22s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .submit-btn:hover:not(:disabled) {
                    background: #222;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                }

                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .divider-line { flex: 1; height: 1px; background: #ebebeb; }

                .divider-text {
                    font-size: 0.68rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #ccc;
                    font-weight: 500;
                }

                .google-wrapper { display: flex; justify-content: center; }
                .google-wrapper > div { width: 100% !important; }

                .switch-text {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.78rem;
                    color: #aaa;
                }

                .switch-btn {
                    background: none;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 500;
                    color: #0a0a0a;
                    cursor: pointer;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    padding: 0;
                }

                .switch-btn:hover { opacity: 0.5; }

                @media (max-width: 680px) {
                    .auth-card { grid-template-columns: 1fr; }
                    .auth-left { display: none; }
                    .auth-right { padding: 2.5rem 2rem; }
                }

                .loading-spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div className="auth-root">
                <div className="auth-card">

                    {/* LEFT SIDE */}
                    <div className="auth-left">
                        <div className="auth-left-top">
                            <div className="brand-mark">
                                <div className="brand-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <span className="brand-name">CareerCraft Pro</span>
                            </div>

                            <h1 className="left-headline">
                                Shape your<br />
                                <em>professional</em><br />
                                future.
                            </h1>
                            <p className="left-sub">
                                Intelligent tools for the<br />
                                modern career journey.
                            </p>
                        </div>

                        <ul className="feature-list auth-left-bottom">
                            <li><span className="feature-dot"></span>AI-powered resume builder</li>
                            <li><span className="feature-dot"></span>Smart job matching engine</li>
                            <li><span className="feature-dot"></span>Interview preparation suite</li>
                            <li><span className="feature-dot"></span>Career progression analytics</li>
                        </ul>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="auth-right">
                        <div className="tab-switcher">
                            <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>
                                Sign In
                            </button>
                            <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>
                                Register
                            </button>
                        </div>

                        <div className="form-fields">
                            {/* Profile Upload (Only for Register) */}
                            {!isLogin && (
                                <div className="profile-upload-container">
                                    <label className="profile-circle">
                                        <input type="file" hidden onChange={HandleFileUpload} accept="image/*" />
                                        {preview ? (
                                            <img src={preview} alt="Profile Preview" className="profile-preview" />
                                        ) : (
                                            <UserIcon size={32} color="#ccc" />
                                        )}
                                        <div className="upload-overlay">
                                            <Camera size={20} color="#fff" />
                                        </div>
                                    </label>
                                    <span className="upload-text">Upload Photo</span>
                                </div>
                            )}

                            {!isLogin && (
                                <div className="field-group">
                                    <label className="field-label">Username</label>
                                    <input type="text" placeholder="Enter your username" className="field-input"
                                        value={userData.username}
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                                </div>
                            )}

                            <div className="field-group">
                                <label className="field-label">Email</label>
                                <input type="email" placeholder="Enter your email" className="field-input"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            </div>

                            <div className="field-group">
                                <label className="field-label">Password</label>
                                <input type="password" placeholder="Enter your password" className="field-input"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                            </div>

                            {isLogin ? (
                                <button disabled={loading} className="submit-btn" onClick={handleLogin}>
                                    {loading && <div className="loading-spinner"></div>}
                                    {loading ? "Verifying..." : "Sign In"}
                                </button>
                            ) : (
                                <button disabled={loading} className="submit-btn" onClick={handleRegister}>
                                    {loading && <div className="loading-spinner"></div>}
                                    {loading ? "Creating..." : "Create Account"}
                                </button>
                            )}

                            <div className="divider">
                                <span className="divider-line"></span>
                                <span className="divider-text">or</span>
                                <span className="divider-line"></span>
                            </div>

                            <div className="google-wrapper">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
                                    onError={() => errorToast("Google Login Failed")}
                                />
                            </div>
                        </div>

                        <p className="switch-text">
                            {isLogin ? (
                                <>Don't have an account?{" "}<button onClick={() => { setIsLogin(false); setPreview(""); }} className="switch-btn">Create one</button></>
                            ) : (
                                <>Already have an account?{" "}<button onClick={() => { setIsLogin(true); setPreview(""); }} className="switch-btn">Sign in</button></>
                            )}
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}