import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GetUserAdminAPI } from "../../../services/AllAPI";
import { serverURL } from "../../../services/serverURL";
import {
  Search,
  RefreshCw,
  Users,
  ImageOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  UserX,
} from "lucide-react";

// Deterministic accent color per user, derived from their email —
// keeps the same person the same color across reloads.
const AVATAR_PALETTE = [
  "#8b5cf6", "#34d399", "#60a5fa", "#fb923c",
  "#f472b6", "#facc15", "#22d3ee", "#f87171",
];

function colorFor(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

function initials(name = "", email = "") {
  const source = name?.trim() || email?.trim() || "?";
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

const SKELETON_ROWS = Array.from({ length: 5 });

export default function AdminUsersDashboard() {
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) setToken(storedToken);
    else {
      setError("No admin session found. Please sign in again.");
      setLoading(false);
    }
  }, []);

  const getUsers = async (currentToken) => {
    setLoading(true);
    setError(null);
    try {
      const reqHeader = { Authorization: `Bearer ${currentToken}` };
      const result = await GetUserAdminAPI(reqHeader);
      setAllUsers(result.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Couldn't load users. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getUsers(token);
  }, [token]);

  // ── Derived data ──────────────────────────────
  const withPhoto = allUsers.filter((u) => !!u.profile).length;
  const newestUser = allUsers.reduce((latest, u) => {
    if (!u.createdAt) return latest;
    if (!latest || new Date(u.createdAt) > new Date(latest.createdAt)) return u;
    return latest;
  }, null);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = !q
      ? allUsers
      : allUsers.filter(
          (u) =>
            u.username?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
        );

    list = [...list].sort((a, b) => {
      if (sortKey === "createdAt") {
        const av = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bv = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const av = (a[sortKey] || "").toString().toLowerCase();
      const bv = (b[sortKey] || "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [allUsers, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "createdAt" ? "desc" : "asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortKey !== column) return <ArrowUpDown size={12} className="opacity-40" />;
    return sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  const stats = [
    { label: "Total users", value: loading ? "…" : allUsers.length, icon: <Users size={16} /> },
    {
      label: "With profile photo",
      value: loading ? "…" : `${withPhoto}/${allUsers.length || 0}`,
      icon: <ImageOff size={16} />,
    },
    {
      label: "Newest signup",
      value: loading ? "…" : newestUser ? (newestUser.username || newestUser.email) : "—",
      sub: newestUser ? timeAgo(newestUser.createdAt) : null,
      icon: <Users size={16} />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold">User Management</h2>
          <p className="text-gray-400 text-sm mt-1">View and manage platform users</p>
        </div>
        <button
          onClick={() => token && getUsers(token)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-[#111] text-sm text-gray-300 hover:bg-[#1a1a1a] hover:border-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* STAT STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-gray-800 bg-[#0d0d0f] p-5"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2">
              {s.icon}
              {s.label}
            </div>
            <p className="text-2xl font-semibold text-white truncate">{s.value}</p>
            {s.sub && <p className="text-xs text-gray-500 mt-1">{s.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="w-full bg-[#111] border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-gray-600 transition"
        />
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#111] text-gray-400 uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Photo</th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => toggleSort("username")}
                  className="flex items-center gap-1.5 hover:text-white transition"
                >
                  Name <SortIcon column="username" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => toggleSort("email")}
                  className="flex items-center gap-1.5 hover:text-white transition"
                >
                  Email Address <SortIcon column="email" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => toggleSort("createdAt")}
                  className="flex items-center gap-1.5 hover:text-white transition"
                >
                  Joined <SortIcon column="createdAt" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {loading ? (
              SKELETON_ROWS.map((_, i) => (
                <tr key={i} className="bg-black">
                  <td className="px-6 py-4"><div className="h-3 w-4 bg-gray-800 rounded animate-pulse" /></td>
                  <td className="px-6 py-4"><div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse" /></td>
                  <td className="px-6 py-4"><div className="h-3 w-28 bg-gray-800 rounded animate-pulse" /></td>
                  <td className="px-6 py-4"><div className="h-3 w-40 bg-gray-800 rounded animate-pulse" /></td>
                  <td className="px-6 py-4"><div className="h-3 w-16 bg-gray-800 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : filteredUsers.length > 0 ? (
              <AnimatePresence>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    className="bg-black hover:bg-[#111] transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-6 py-4">
                      {user.profile ? (
                        <img
                          src={`${serverURL}/uploads/${user.profile}`}
                          alt={user.username || "user"}
                          className="w-10 h-10 rounded-full object-cover border border-gray-700"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-black"
                          style={{ background: colorFor(user.email) }}
                        >
                          {initials(user.username, user.email)}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-white">
                      {user.username || "—"}
                    </td>

                    <td className="px-6 py-4 text-gray-400">
                      {user.email || "—"}
                    </td>

                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {user.createdAt ? timeAgo(user.createdAt) : "—"}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-600">
                  <UserX size={28} className="mx-auto mb-3 opacity-40" />
                  {query ? "No users match your search." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER COUNT */}
      {!loading && filteredUsers.length > 0 && (
        <p className="text-gray-600 text-xs mt-4">
          Showing {filteredUsers.length} of {allUsers.length} user
          {allUsers.length !== 1 ? "s" : ""}
          {query && ` matching "${query}"`}
        </p>
      )}
    </div>
  );
}