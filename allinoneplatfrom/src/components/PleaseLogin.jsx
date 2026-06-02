import React from "react";
import { useNavigate } from "react-router-dom";

function PleaseLogin() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f6f2",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=DM+Sans:wght@300;400;500;700&display=swap');
        .login-btn {
          background: #0d0d10;
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 16px 48px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .login-btn:hover { background: #f59e0b; color: #0d0d10; transform: translateY(-2px); }
        .back-btn {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: color 0.2s;
          margin-top: 16px;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .back-btn:hover { color: #0d0d10; }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: floatUp 0.6s ease forwards; }
        .fade-up-2 { animation: floatUp 0.6s ease 0.15s both; }
        .fade-up-3 { animation: floatUp 0.6s ease 0.28s both; }
        .fade-up-4 { animation: floatUp 0.6s ease 0.4s both; }
      `}</style>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 28,
          padding: "56px 48px",
          maxWidth: 460,
          width: "100%",
          boxShadow: "0 8px 48px rgba(0,0,0,0.07)",
        }}
      >
        {/* Lock icon circle */}
        <div className="fade-up-1" style={{ marginBottom: 28 }}>
          <div style={{
            width: 72, height: 72,
            borderRadius: 20,
            background: "#fef3c7",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto",
            fontSize: 32,
          }}>
            🔐
          </div>
        </div>

        {/* Eyebrow */}
        <div className="fade-up-1" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginBottom: 16,
        }}>
          <div style={{ width: 20, height: 1, background: "#f59e0b" }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#d97706",
          }}>
            Authentication Required
          </span>
          <div style={{ width: 20, height: 1, background: "#f59e0b" }} />
        </div>

        {/* Headline */}
        <h1 className="fade-up-2" style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: "2.2rem",
          lineHeight: 1.1,
          color: "#0d0d10",
          marginBottom: 14,
        }}>
          Please Login to Continue
        </h1>

        {/* Sub */}
        <p className="fade-up-2" style={{
          fontSize: 15, color: "#6b7280", lineHeight: 1.7,
          fontWeight: 300, marginBottom: 36,
        }}>
          You need to be signed in to access PrepVault.
          Choose your role below to get started.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "#f3f4f6", marginBottom: 32 }} />

        {/* CTA */}
        <div className="fade-up-3">
          <button className="login-btn" onClick={() => navigate("/role")}>
            <span>Login / Sign Up</span>
            <span style={{ fontSize: 16 }}>→</span>
          </button>
        </div>

        {/* Back */}
        <div className="fade-up-4">
          <button className="back-btn" onClick={() => navigate("/home")}>
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="fade-up-4" style={{
        marginTop: 24, fontSize: 12,
        color: "#9ca3af", fontWeight: 300,
      }}>
        PrepVault · Your interview success platform
      </p>
    </div>
  );
}

export default PleaseLogin;