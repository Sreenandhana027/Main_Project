import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Mail,
    Sparkles,
    ArrowUpRight,
    Target
} from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
/**
 * ✅ Footer with Protected Navigation
 * Redirects unauthenticated users to /plslogn if non-public links are clicked.
 */
const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    // ✅ Centralized Auth Check
    const isLoggedIn = !!(
        localStorage.getItem("userToken") ||
        localStorage.getItem("companyToken")
    );

    // ✅ Universal Navigation Handler (Strict)
    const go = (path) => {
        // Only About and Login routes are public
        const publicRoutes = ["/about", "/plslogn", "/auth", "/role"];
        if (publicRoutes.includes(path) || isLoggedIn) {
            navigate(path);
        } else {
            navigate("/plslogn");
        }
    };

    const sections = [
        {
            title: "Platform",
            links: [
                { name: "Aptitude Tests", path: "/aptitude" },
                { name: "Video Learning", path: "/mainvdo" },
                { name: "Job Board", path: "/jobs" },
                { name: "Question Bank", path: "/inter" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Tips & Career", path: "/tips" },
                { name: "Support Center", path: "/plslogn" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", path: "/about" },
                { name: "Terms of Service", path: "/about" },
                { name: "Cookie Policy", path: "/about" },
            ]
        }
    ];

    return (
        <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <button onClick={() => go("/home")} className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 group text-left">
                            <div className="w-10 h-10 bg-linear-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform text-white">
                                <Sparkles size={20} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                CareerCraft<span className="text-sky-400">Pro</span>
                            </span>
                        </button>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            The ultimate ecosystem for modern job seekers. Prepare, apply,
                            and secure your future with CareerCraftPro.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Linkedin, Github, Twitter, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                                {section.title}
                            </h4>
                            <ul className="space-y-4 list-none p-0 m-0">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <button
                                            onClick={() => go(link.path)}
                                            className="bg-transparent border-none p-0 cursor-pointer text-slate-400 text-sm hover:text-white transition-colors flex items-center gap-1 group text-left"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sky-400" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                            Stay Updated
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Career roadmap updates and hiring alerts for verified students.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all shadow-2xl"
                            />
                            <button className="absolute right-2 top-1.5 w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors cursor-pointer border-none p-0">
                                <Mail size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        © {currentYear} CareerCraft Pro. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            All Systems Operational
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            Built with <FaRegHeart size={12}/> in Kerala
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
