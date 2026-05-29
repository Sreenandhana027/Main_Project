import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaVideoSolid } from "react-icons/lia";
import { RiDashboardLine, RiShieldKeyholeLine, RiMenuFoldLine, RiMenuUnfoldLine, RiLogoutBoxRLine } from "react-icons/ri";

const navLinks = [
  { icon: <RiDashboardLine size={18} />, label: "Dashboard", to: "/admin", active: true },
  { icon: <HiOutlineUsers size={18} />, label: "Users", to: "/userslist" },
  { icon: <FaRegCalendarCheck size={16} />, label: "Aptitude", to: "/manage-aptitude" },
  { icon: <HiOutlineShoppingCart size={18} />, label: "Shopping", to: "/manageprdct" },
  { icon: <LiaVideoSolid size={19} />, label: "Videos", to: "/managevdo" },
  { icon: <RiShieldKeyholeLine size={18} />, label: "Security", to: "/security" },
  { icon: <CiSettings size={18} />, label: "Settings", to: "/settings" },
];

const modules = [
  { icon: <FaRegCalendarCheck size={20} />, label: "Aptitude", desc: "Candidate scheduling & evaluation", to: "/manage-aptitude", dot: "#a78bfa" },
  { icon: <HiOutlineShoppingCart size={21} />, label: "Shopping", desc: "Orders and inventory tracking", to: "/manageprdct", dot: "#34d399" },
  { icon: <HiOutlineUsers size={21} />, label: "Users", desc: "Role and access management", to: "/userslist", dot: "#60a5fa" },
  { icon: <LiaVideoSolid size={23} />, label: "Videos", desc: "Learning content control", to: "/managevdo", dot: "#fb923c" },
];

const activity = [
  { title: "New user registration", sub: "nandhana@example.com", time: "2m ago", dot: "#a78bfa" },
  { title: "Aptitude test completed", sub: "Test #402 — Score 87%", time: "14m ago", dot: "#34d399" },
  { title: "Video uploaded", sub: "Intro to React — 42 min", time: "1h ago", dot: "#60a5fa" },
];

const stats = [
  { label: "Users", value: "2,481" },
  { label: "Tests", value: "984" },
  { label: "Sessions", value: "143" },
];

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f11", color: "#e8e8e8", fontFamily: "'Inter', 'DM Sans', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? 60 : 210,
        minHeight: "100vh",
        background: "#131316",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
        gap: 4,
        transition: "width 0.25s ease",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <RiShieldKeyholeLine color="#fff" size={15} />
          </div>
          {!collapsed && <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.2px", color: "#fff", whiteSpace: "nowrap" }}>Admin Panel</span>}
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navLinks.map((n, i) => (
            <Link key={i} to={n.to} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 8,
              color: n.active ? "#c4b5fd" : "rgba(255,255,255,0.4)",
              background: n.active ? "rgba(124,58,237,0.15)" : "transparent",
              textDecoration: "none", fontSize: 13, fontWeight: n.active ? 500 : 400,
              transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
              onMouseOver={e => { if (!n.active) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; } }}
              onMouseOut={e => { if (!n.active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; } }}
              title={collapsed ? n.label : undefined}
            >
              <span style={{ flexShrink: 0 }}>{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
            </Link>
          ))}
        </div>

        {/* Collapse + logout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 10px", borderRadius: 8, cursor: "pointer",
            color: "rgba(239,68,68,0.6)", fontSize: 13, whiteSpace: "nowrap",
            overflow: "hidden", justifyContent: collapsed ? "center" : "flex-start",
          }}>
            <RiLogoutBoxRLine size={17} />
            {!collapsed && <span>Logout</span>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8, color: "rgba(255,255,255,0.35)", padding: "8px",
            cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "36px 32px", minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 6 }}>PLATFORM OVERVIEW</p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 }}>Admin Dashboard</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)" }}>Monitor and manage all platform activity</p>
        </div>

        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "#1a1a1f", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "18px 20px",
            }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Module cards */}
        <div style={{
          background: "#131316", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18, padding: "24px", marginBottom: 24,
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 18 }}>Management modules</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
            {modules.map((m, i) => (
              <Link key={i} to={m.to} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#0f0f11", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "20px 18px", cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = m.dot + "55"; e.currentTarget.style.background = "#1a1a1f"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#0f0f11"; }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: m.dot + "18",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: m.dot, marginBottom: 14,
                  }}>
                    {m.icon}
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#e8e8e8", marginBottom: 5 }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div style={{
          background: "#131316", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18, padding: "24px",
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 18 }}>Recent activity</p>
          <div>
            {activity.map((a, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0",
                borderBottom: i < activity.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.dot, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#ddd", marginBottom: 3 }}>{a.title}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{a.sub}</p>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}