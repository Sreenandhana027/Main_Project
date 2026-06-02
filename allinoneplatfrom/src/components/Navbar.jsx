import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&family=DM+Sans:wght@400;500;700&display=swap');
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #f59e0b;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #0d0d10; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #0d0d10; }
        .nav-link.active::after { width: 100%; }
        .signup-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          background: #0d0d10;
          color: #fff;
          padding: 10px 24px;
          border-radius: 100px;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .signup-btn:hover {
          background: #f59e0b;
          color: #0d0d10;
          transform: translateY(-1px);
        }
      `}</style>

      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: "rgba(247, 246, 242, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <nav style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "1.45rem",
              color: "#0d0d10",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}>
              PrepVault
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#f59e0b",
              letterSpacing: "0.06em",
              marginLeft: 2,
            }}>
              360
            </span>
          </Link>

          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link
              to="/"
              className={`nav-link${location.pathname === "/" ? " active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/loginuser"
              className={`nav-link${location.pathname === "/loginuser" ? " active" : ""}`}
            >
              Login
            </Link>
            <Link to="/registeruser" className="signup-btn">
              Sign Up
            </Link>
          </div>

        </nav>
      </header>

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  );
}

export default Navbar;