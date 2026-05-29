import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Sparkles,
    Github,
    Linkedin,
    Twitter
} from "lucide-react";


const MagneticButton = ({ children, onClick, className, type = "button" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.35);
        y.set((e.clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

const ContactCard = ({ icon: Icon, title, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 p-4 glass-morphism rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group"
    >
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{title}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    </motion.div>
);

export default function Contact() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative">
            {/* Background Decorative Blobs */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-mesh" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-mesh" />
                <div className="absolute inset-0 bg-grain opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT: CONTENT & INFO */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase mb-8">
                                <Sparkles className="w-3.5 h-3.5" />
                                Support Center
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                                Let's Build Your <br />
                                <span className="text-gradient">Future Together.</span>
                            </h1>
                            <p className="text-indigo-100/60 text-lg leading-relaxed max-w-md mb-12">
                                Have questions about aptitude tests, AI interview coaching, or enterprise solutions? Our experts are standing by.
                            </p>

                            <div className="grid gap-4 max-w-sm">
                                <ContactCard
                                    icon={Mail}
                                    title="Email Us"
                                    value="support@prepvault.com"
                                    delay={0.2}
                                />
                                <ContactCard
                                    icon={Phone}
                                    title="Call Us"
                                    value="+91 98765 43210"
                                    delay={0.3}
                                />
                                <ContactCard
                                    icon={MapPin}
                                    title="Location"
                                    value="Tech Hub, Bangalore, India"
                                    delay={0.4}
                                />
                            </div>

                            <div className="mt-12 flex items-center gap-6">
                                {[Github, Linkedin, Twitter].map((Social, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ scale: 1.1, color: "#818cf8" }}
                                        className="text-white/40 transition-colors"
                                    >
                                        <Social className="w-6 h-6" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: CONTACT FORM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        {/* Blob behind card */}
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 to-purple-600/20 blur-[60px] opacity-50 group-hover:opacity-70 transition-opacity rounded-[3rem]" />

                        <div className="relative glass-morphism p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden bg-white/2">
                            <div className="flex items-center gap-3 mb-10">
                                <MessageSquare className="w-6 h-6 text-indigo-400" />
                                <h2 className="text-2xl font-bold text-white tracking-tight">Direct Message</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Name"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Email@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
                                        <option className="bg-slate-900">Interview Coaching</option>
                                        <option className="bg-slate-900">Aptitude Practice</option>
                                        <option className="bg-slate-900">Career Roadmap</option>
                                        <option className="bg-slate-900">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help you succeed?"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <MagneticButton
                                    className="w-full group relative py-5 bg-white text-slate-950 rounded-2xl font-black text-lg overflow-hidden shadow-xl shadow-white/5 flex items-center justify-center gap-2"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </MagneticButton>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
