import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Opportunities",
            links: [
                { name: "Browse Jobs", path: "/jobs" },
                { name: "Aptitude Prep", path: "/aptitude" },
                { name: "Mock Interviews", path: "/mock" },
                { name: "Success Stories", path: "/success" },
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Help Center", path: "/help" },
            ]
        }
    ];

    return (
        <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Prep<span className="text-indigo-400">Vault</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Empowering the next generation of professionals with AI-driven tools and industry-standard preparation.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Linkedin, Github, Twitter].map((Icon, i) => (
                                <a 
                                    key={i} 
                                    href="#" 
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all"
                                >
                                    <Icon className="w-5 h-5" />
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
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link 
                                            to={link.path} 
                                            className="text-slate-400 text-sm hover:text-white transition-colors flex items-center gap-1 group"
                                        >
                                            {link.name}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Simple Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                            Get in Touch
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400 text-sm hover:text-white transition-colors">
                                <Mail className="w-4 h-4 text-indigo-400" />
                                support@prepvault.com
                            </div>
                            <div className="flex items-center gap-3 text-white/10 pt-4">
                                <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                                <span className="text-[10px] uppercase font-bold tracking-widest">Secure Platform</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        © {currentYear} PrepVault. All rights reserved.
                    </p>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        Built with ❤️ in Kerala
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;