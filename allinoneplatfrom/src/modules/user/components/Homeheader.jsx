import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronDown,
    Sparkles,
    LogOut,
    User,
    LayoutDashboard,
    Briefcase,
    Layers,
    MessageSquare,
    ShieldCheck,
    Settings
} from "lucide-react";
import { serverURL } from "../../../services/serverURL";
import { GetUserProfileAPI } from "../../../services/AllAPI";

const Homeheader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) return;
        const reqHeader = { Authorization: `Bearer ${token}` };
        try {
            const result = await GetUserProfileAPI(reqHeader);
            if (result.status === 200) {
                setUserData(result.data);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem("userToken");
            setIsLoggedIn(!!token);
            if (token) fetchUserData();
        };
        checkLogin();
        window.addEventListener("storage", checkLogin);

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("storage", checkLogin);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn) fetchUserData();
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
    };

    // ✅ KEY FIX: Adaptive color tokens based on scroll/background
    const textColor = scrolled ? "text-slate-200" : "text-slate-800";
    const textMuted = scrolled ? "text-slate-400" : "text-slate-600";
    const hoverText = scrolled ? "hover:text-white" : "hover:text-slate-950";
    const hoverBg = scrolled ? "hover:bg-white/5" : "hover:bg-slate-100";
    const activeBg = scrolled
        ? "bg-white/10 text-white border border-white/10 shadow-lg shadow-black/20"
        : "bg-slate-900/10 text-slate-900 border border-slate-900/15 shadow-lg";
    const iconBg = scrolled
        ? "bg-white/10 border-white/10 text-slate-200 hover:bg-white/20 hover:text-white"
        : "bg-slate-800/10 border-slate-800/15 text-slate-700 hover:bg-slate-800/20 hover:text-slate-950";
    const logoutBtn = scrolled
        ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
        : "bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white";
    const signInText = scrolled
        ? "text-slate-400 hover:text-white"
        : "text-slate-600 hover:text-slate-950";

    const navLinks = [
        { name: "About", path: "/about", icon: <Layers className="w-4 h-4" /> },
        ...(isLoggedIn ? [
            { name: "Jobs", path: "/jobs", icon: <Briefcase className="w-4 h-4" /> },
            { name: "Shopping", path: "/shopping", icon: <ShieldCheck className="w-4 h-4" /> },
        ] : []),
        { name: "Contact", path: "/contact", icon: <MessageSquare className="w-4 h-4" /> },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-500 ${scrolled
                ? "py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20"
                : "py-6 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    {/* User Profile Photo */}
                    {isLoggedIn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group cursor-pointer"
                            onClick={() => navigate("/Usersettings")}
                        >
                            <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                            {userData?.profile ? (
                                <img
                                    src={`${serverURL}/uploads/${userData.profile}`}
                                    alt="User"
                                    className="relative w-10 h-10 rounded-full object-cover border-2 border-white/10 shadow-lg"
                                />
                            ) : (
                                <div className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center ${scrolled ? "bg-white/5 border-white/10 text-indigo-400" : "bg-slate-100 border-slate-200 text-indigo-600"}`}>
                                    <User size={20} />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                        {/* <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div> */}
                        <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${scrolled ? "text-white" : "text-slate-900"}`}>
                            Prep<span className="text-indigo-500">Vault</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all flex items-center gap-2 ${
                                location.pathname === link.path
                                    ? activeBg
                                    : `${textMuted} ${hoverText} ${hoverBg}`
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className={`w-px h-6 mx-4 ${scrolled ? "bg-white/10" : "bg-slate-300"}`} />

                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/home")}
                                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBg}`}
                                title="Dashboard"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate("/Usersettings")}
                                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBg}`}
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 ${logoutBtn}`}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/auth")}
                                className={`text-sm font-bold transition-colors ${signInText}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate("/role")}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20"
                            >
                                Get Started
                            </button>
                        </div>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors ${scrolled ? "text-white" : "text-slate-800"}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`absolute top-full left-0 right-0 border-b p-6 md:hidden shadow-2xl ${
                            scrolled
                                ? "bg-slate-950 border-white/5"
                                : "bg-white border-slate-200"
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all flex items-center gap-2 ${
                                            isActive ? activeBg : `${textMuted} ${hoverText} ${hoverBg}`
                                        }`}
                                    >
                                        <span>{link.icon}</span>
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className={`h-px my-2 ${scrolled ? "bg-white/5" : "bg-slate-200"}`} />

                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => { navigate("/home"); setIsMobileMenuOpen(false); }}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBg}`}
                                        title="Dashboard"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => { navigate("/Usersettings"); setIsMobileMenuOpen(false); }}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBg}`}
                                        title="Settings"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border font-bold ${logoutBtn}`}
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                                        className={`p-4 rounded-2xl border font-bold ${scrolled ? "bg-white/5 border-white/5 text-white" : "bg-slate-100 border-slate-200 text-slate-800"}`}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => { navigate("/role"); setIsMobileMenuOpen(false); }}
                                        className="p-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Homeheader;