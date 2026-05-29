import React from "react";

const Contact = () => {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F4", minHeight: "100vh", color: "#1a1a1a" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 40px;
          border-bottom: 1px solid #E2DED6;
        }
        .logo {
          font-family: 'Lora', serif;
          font-size: 16px;
          letter-spacing: 0.02em;
          color: #1a1a1a;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px;
          color: #888;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #1a1a1a; }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 73px);
        }

        .left-panel {
          padding: 64px 48px;
          border-right: 1px solid #E2DED6;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #C4763A;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: #C4763A;
        }
        .main-heading {
          font-family: 'Lora', serif;
          font-size: 52px;
          line-height: 1.12;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .main-heading em {
          font-style: italic;
          color: #C4763A;
        }
        .sub-text {
          font-size: 15px;
          line-height: 1.7;
          color: #666;
          max-width: 340px;
          margin-bottom: 48px;
        }
        .info-list { display: flex; flex-direction: column; gap: 0; }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-top: 1px solid #E2DED6;
        }
        .info-row:last-child { border-bottom: 1px solid #E2DED6; }
        .info-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
        }
        .info-value { font-size: 14px; color: #1a1a1a; }

        .social-row { margin-top: 40px; display: flex; gap: 20px; }
        .social-link {
          width: 36px;
          height: 36px;
          border: 1px solid #D5D0C8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          text-decoration: none;
          font-size: 18px;
          transition: all 0.2s;
        }
        .social-link:hover {
          border-color: #C4763A;
          color: #C4763A;
          background: #FDF3EA;
        }

        .right-panel { padding: 64px 48px; background: #FAF8F4; }
        .form-number {
          font-family: 'Lora', serif;
          font-size: 72px;
          font-weight: 600;
          color: #EDE9E0;
          line-height: 1;
          margin-bottom: -8px;
        }
        .form-title { font-size: 20px; font-weight: 500; color: #1a1a1a; margin-bottom: 40px; }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field.full { grid-column: 1 / -1; }
        .field label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
        }
        .field input,
        .field select,
        .field textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          background: transparent;
          border: none;
          border-bottom: 1px solid #D5D0C8;
          padding: 10px 0;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
          width: 100%;
          -webkit-appearance: none;
        }
        .field input::placeholder,
        .field textarea::placeholder { color: #C8C3BB; }
        .field input:focus,
        .field select:focus,
        .field textarea:focus { border-bottom-color: #C4763A; }
        .field textarea { resize: none; height: 100px; }
        .field select { cursor: pointer; }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
        }
        .note { font-size: 12px; color: #aaa; max-width: 200px; line-height: 1.5; }

        .send-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1a1a1a;
          color: #FAF8F4;
          border: none;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.25s;
        }
        .send-btn:hover { background: #C4763A; }
        .send-btn .arrow { font-size: 16px; transition: transform 0.25s; display: inline-block; }
        .send-btn:hover .arrow { transform: translate(3px, -3px); }
      `}</style>

            {/* Nav */}
            <nav className="top-bar">
                <span className="logo">PrepVault</span>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Courses</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>

            <div className="main-grid">
                {/* Left Panel */}
                <div className="left-panel">
                    <div>
                        <div className="eyebrow">
                            <span className="eyebrow-line" />
                            Get in touch
                        </div>
                        <h1 className="main-heading">
                            We'd love<br />to <em>hear</em><br />from you.
                        </h1>
                        <p className="sub-text">
                            Questions about interview coaching, aptitude tests, or enterprise plans?
                            Our team responds within one business day.
                        </p>

                        <div className="info-list">
                            {[
                                { label: "Email", value: "support@prepvault.com" },
                                { label: "Phone", value: "+91 98765 43210" },
                                { label: "Office", value: "Tech Hub, Bangalore" },
                            ].map(({ label, value }) => (
                                <div className="info-row" key={label}>
                                    <span className="info-label">{label}</span>
                                    <span className="info-value">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="social-row">
                            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                                <a href="#" className="social-link" key={s} aria-label={s}>
                                    {s === "GitHub" ? "⌥" : s === "LinkedIn" ? "in" : "𝕏"}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="right-panel">
                    <div className="form-number">01</div>
                    <div className="form-title">Send us a message</div>

                    <div className="form-grid">
                        <div className="field">
                            <label>Full name</label>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className="field">
                            <label>Email address</label>
                            <input type="email" placeholder="you@example.com" />
                        </div>
                        <div className="field full">
                            <label>Subject</label>
                            <select>
                                <option>Interview coaching</option>
                                <option>Aptitude practice</option>
                                <option>Career roadmap</option>
                                <option>Other enquiry</option>
                            </select>
                        </div>
                        <div className="field full">
                            <label>Message</label>
                            <textarea placeholder="How can we help you succeed?" />
                        </div>
                    </div>

                    <div className="form-footer">
                        <p className="note">We'll get back to you within 24 hours.</p>
                        <button className="send-btn">
                            Send message <span className="arrow">↗</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;