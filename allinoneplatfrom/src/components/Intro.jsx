import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
    Brain,
    ClipboardCheck,
    BarChart3,
    Map,
    Video,
    ChevronRight,
    ArrowRight,
    Search,
    FileText,
    Briefcase,
    Trophy,
    Sparkles,
    Zap,
    Target
} from "lucide-react";
import Homeheader from "../modules/user/components/Homeheader";
import Footer from "../modules/user/pages/shopping/Footer";

const features = [
    {
        idx: "01",
        icon: <Brain className="w-6 h-6 text-indigo-500" />,
        title: "AI mock interviews",
        sub: "Practice with role-specific questions powered by AI and get instant feedback on clarity, confidence, and structure.",
        desc: "Practice with role-specific questions powered by AI. Get instant feedback on clarity, confidence, and content structure after every session.",
        tag: "Live feedback",
        color: "from-blue-500 to-indigo-600"
    },
    {
        idx: "02",
        icon: <ClipboardCheck className="w-6 h-6 text-purple-500" />,
        title: "Question bank",
        sub: "10,000+ curated questions across technical, behavioral, and situational categories for every industry and level.",
        desc: "10,000+ curated questions across technical, behavioral, and situational categories covering every industry and seniority level.",
        tag: "All industries",
        color: "from-purple-500 to-pink-600"
    },
    {
        idx: "03",
        icon: <BarChart3 className="w-6 h-6 text-emerald-500" />,
        title: "Performance analytics",
        sub: "Track your improvement with score breakdowns and personalized weak-area targeting across every session.",
        desc: "Track your improvement over time with detailed score breakdowns and personalized weak-area targeting across all your sessions.",
        tag: "Progress tracking",
        color: "from-emerald-500 to-teal-600"
    },
    {
        idx: "04",
        icon: <Map className="w-6 h-6 text-orange-500" />,
        title: "Role-specific roadmaps",
        sub: "A custom preparation checklist tailored to the exact job posting you are targeting, updated in real time.",
        desc: "Get a custom preparation checklist tailored to the exact job posting you are targeting. Updated in real time as you apply.",
        tag: "Personalized",
        color: "from-orange-500 to-red-600"
    },
    {
        idx: "05",
        icon: <Video className="w-6 h-6 text-sky-500" />,
        title: "Video response review",
        sub: "Record and replay your answers to evaluate body language, tone, pacing, and overall response structure.",
        desc: "Record and replay your answers to self-evaluate body language, tone, pacing, and overall response structure before the real thing.",
        tag: "Video mode",
        color: "from-sky-500 to-blue-600"
    },
];

const tips = [
    { num: "01", title: "Deep Research", body: "Know recent news, culture, and competitors before every interview." },
    { num: "02", title: "Tailor Resume", body: "Use matching keywords from the job description in your resume." },
    { num: "03", title: "STAR Method", body: "Situation, Task, Action, Result — structure every behavioral answer." },
    { num: "04", title: "Practice Aloud", body: "Silent rehearsal feels different. Record yourself at least once." },
    { num: "05", title: "Ask Questions", body: "Asking good questions signals genuine curiosity and interest." },
    { num: "06", title: "Dress Above", body: "Project confidence by dressing slightly above typical dress code." },
    { num: "07", title: "Apply Early", body: "Most companies review applications within the first 48 hours." },
    { num: "08", title: "Follow Up", body: "A short thank-you note sets you apart immediately." },
    { num: "09", title: "LinkedIn Update", body: "Accomplishments and sharp headlines attract recruiters." },
    { num: "10", title: "Know Numbers", body: "Quantify achievements — percentages beat vague descriptions." },
];

function UserHome() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("userToken");
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    useEffect(() => {
        if (isLoggedIn) navigate("/main");
    }, []);

    const handleStart = () => {
        navigate(isLoggedIn ? "/main" : "/plslogn");
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900" ref={containerRef}>
            <Homeheader />

            {/* ── HERO SECTION ── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-grain">
                {/* Decorative Elements */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                >
                    <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-300 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-[120px]" />
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] p-4 glass-morphism rounded-2xl hidden md:block"
                >
                    <Search className="w-8 h-8 text-indigo-500" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[25%] right-[12%] p-4 glass-morphism rounded-2xl hidden md:block"
                >
                    <Briefcase className="w-8 h-8 text-purple-500" />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            Next-Gen Career Platform
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[1.1] mb-8">
                            Master Your <br />
                            <span className="text-gradient">Career Path</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
                            The all-in-one ecosystem for job seekers to practice, prepare, and land their dream role with AI-powered insights.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={handleStart}
                                className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/10"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Your Path <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                                Explore Roles
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scroll</span>
                    <div className="w-0.5 h-12 bg-linear-to-b from-indigo-500 to-transparent rounded-full" />
                </motion.div>
            </section>

            {/* ── STATS SECTION ── */}
            <section className="py-24 px-6 border-y border-slate-200 bg-white relative z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: "Fail Rate w/o Prep", value: "73%", sub: "High stakes" },
                        { label: "Higher Offer Rate", value: "3.2×", sub: "Proven success" },
                        { label: "Questions Library", value: "10K+", sub: "Industry standard" },
                        { label: "User Success", value: "98%", sub: "Career satisfaction" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                            <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-xs text-slate-400">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── PARALLAX FEATURES SECTION ── */}
            <section className="relative py-32 px-6 overflow-hidden bg-slate-900">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Built for Excellence</h2>
                        <p className="text-indigo-200/60 max-w-2xl mx-auto text-lg">
                            Advanced tools designed by industry experts to give you the edge in today's competitive market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${f.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />

                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    {f.icon}
                                </div>

                                <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">Feature {f.idx}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-8">{f.desc}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-[10px] font-bold text-indigo-400 border border-indigo-400/30 px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {f.tag}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PLAYBOOK (TIPS) SECTION ── */}
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-xl">
                            <span className="block text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4">Expert Insights</span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">The Playbook.</h2>
                        </div>
                        <p className="text-slate-500 text-lg md:text-right max-w-sm">
                            Master the subtle habits that separate the top 1% of candidates from the rest.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
                        {tips.map((tip, i) => (
                            <motion.div
                                key={tip.num}
                                whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
                                className="bg-white p-8 min-h-60 flex flex-col group"
                            >
                                <span className="text-xs font-mono text-slate-300 group-hover:text-indigo-400 transition-colors mb-6">{tip.num}</span>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">{tip.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{tip.body}</p>
                                <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Target className="w-4 h-4 text-indigo-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                        className="relative p-12 md:p-20 rounded-[3rem] bg-slate-900 overflow-hidden text-center"
                    >
                        {/* Background blobs */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600 rounded-full blur-[100px] opacity-20" />
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-20" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                                Ready to take the <br /> <span className="text-indigo-400">next step?</span>
                            </h2>
                            <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto">
                                Join thousands of professionals who have already secured their dream roles using CareerCraft Pro.
                            </p>
                            <button
                                onClick={handleStart}
                                className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20"
                            >
                                Build Your Career Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── HOW IT WORKS SECTION ── */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Process</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">How it Works</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Three simple steps to transform your interview performance and land your target role.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Select Your Goal", desc: "Choose your target industry and specific job role to customize your path.", icon: <Target className="w-6 h-6 text-indigo-500" /> },
                            { step: "02", title: "Practice & Refine", desc: "Engage with AI-driven mock interviews and master the question bank.", icon: <Brain className="w-6 h-6 text-purple-500" /> },
                            { step: "03", title: "Get the Offer", desc: "Apply your refined skills and confidence to secure your dream position.", icon: <Trophy className="w-6 h-6 text-emerald-500" /> },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group"
                            >
                                <div className="text-5xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors absolute top-6 right-8">{item.step}</div>
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS SECTION ── */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Process</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">How it Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Select Role", desc: "Choose your target industry and goal.", icon: <Search className="w-6 h-6 text-indigo-500" /> },
                            { step: "02", title: "Practice", desc: "Engage with AI-driven mock interviews.", icon: <Brain className="w-6 h-6 text-purple-500" /> },
                            { step: "03", title: "Get Hired", desc: "Land your dream job with confidence.", icon: <Trophy className="w-6 h-6 text-emerald-500" /> },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-3xl bg-slate-50 text-center"
                            >
                                <div className="text-5xl font-black text-slate-200 mb-6">{item.step}</div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-slate-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default UserHome;