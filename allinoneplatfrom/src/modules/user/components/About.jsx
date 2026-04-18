import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Briefcase, Target, Heart,
  Zap, Sparkles, Rocket,
  ShieldCheck, Play, Brain, FileText, ShoppingBag,
  Shirt, BarChart2, Star
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../../components/Footer";

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "5K+",  label: "Practice Questions" },
  { value: "50+",  label: "Interview Videos"   },
  { value: "200+", label: "Store Products"     },
  { value: "10+",  label: "Resume Templates"   },
];

const modules = [
  {
    icon: Play,
    title: "Mock Interview Videos",
    desc: "Watch HR, Technical & Group Discussion demo interviews. Learn body language, tone, and presentation from real examples.",
    route: "/mainvdo",
    color: "bg-sky-500",
  },
  {
    icon: Brain,
    title: "Aptitude Tests",
    desc: "Timed tests covering Quantitative Aptitude, Logical Reasoning & Verbal Ability with instant score analytics.",
    route: "/aptitude",
    color: "bg-violet-500",
  },
  {
    icon: FileText,
    title: "Question Bank",
    desc: "5000+ curated HR, Technical & Behavioural questions for MERN, Java, Python, and campus placement rounds.",
    route: "/inter",
    color: "bg-emerald-500",
  },
  {
    icon: Shirt,
    title: "Costume & Grooming Guide",
    desc: "Learn what to wear, what to avoid, and how to present yourself — with outfit ideas for men and women.",
    route: "/tips",
    color: "bg-amber-500",
  },
  {
    icon: ShoppingBag,
    title: "Interview Shopping Store",
    desc: "Buy formal suits, shoes, ties, resume holders, grooming kits & accessories — delivered to your door.",
    route: "/shopping",
    color: "bg-rose-500",
  },
  {
    icon: Briefcase,
    title: "Job Vacancies",
    desc: "Browse and apply to real job openings posted by verified companies across India. Track your applications.",
    route: "/jobs",
    color: "bg-sky-600",
  },
  {
    icon: BarChart2,
    title: "Progress Dashboard",
    desc: "Track your aptitude scores, completed sessions, and improvement trends in a personalized dashboard.",
    route: "/main",
    color: "bg-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Company & Admin Panel",
    desc: "Companies can post jobs, manage applicants, and update status. Admins control all content and users.",
    route: "/companyDash",
    color: "bg-slate-600",
  },
];

const values = [
  {
    icon: Target,
    title: "Precision Matching",
    desc: "We match you to the right job and the right preparation — not just keywords, but culture fit and career goals.",
    color: "bg-sky-500",
  },
  {
    icon: Heart,
    title: "Empathy First",
    desc: "Every feature is designed with the candidate in mind — reducing anxiety, building confidence, and supporting growth.",
    color: "bg-rose-500",
  },
  {
    icon: Zap,
    title: "All-in-One Speed",
    desc: "From aptitude practice to buying your interview outfit — everything happens here. No switching between 5 platforms.",
    color: "bg-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Built for India",
    desc: "From Trivandrum to Bengaluru, we understand India's campus culture, recruitment process, and local job market.",
    color: "bg-emerald-500",
  },
];

const timeline = [
  { year: "2021", title: "Genesis",     event: "Founded in Kerala with a vision to make interview preparation accessible, affordable, and complete for every Indian student." },
  { year: "2022", title: "Launch",      event: "Launched the Question Bank, Mock Videos, and Aptitude Test modules. First 500 users joined from Kerala colleges." },
  { year: "2023", title: "Expansion",   event: "Added the Interview Store and Resume Builder. Expanded to 5 states. Crossed 10,000 registered users." },
  { year: "2024", title: "Jobs Module", event: "Launched Job Vacancies with Company Dashboard. Real companies started posting jobs and hiring through the platform." },
  { year: "2025", title: "Full Stack",  event: "Complete MERN platform — prep, jobs, store, resume — all integrated. Recognized as a top student career platform in India." },
];

const testimonials = [
  {
    name: "Ananya R.",
    role: "Placed at TCS, Trivandrum",
    text: "The mock interview videos changed everything for me. I practiced body language and HR answers for a week and cleared my first campus interview!",
    rating: 5,
  },
  {
    name: "Kiran M.",
    role: "Software Engineer, Infosys",
    text: "The aptitude module is the best I've used — timed tests, instant analytics, and random question sets. I improved my score by 30% in two weeks.",
    rating: 5,
  },
  {
    name: "Devika S.",
    role: "HR Executive, Kochi",
    text: "I even bought my interview blazer from the store! Everything in one place — questions, videos, outfit — this platform is genuinely complete.",
    rating: 5,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  //  Single login check used everywhere
  const isLoggedIn = !!(
    localStorage.getItem("userToken") ||
    localStorage.getItem("companyToken")
  );

  // ✅ Universal protected navigation — ALL links use this
  // Public routes (no login needed): /about, /home, /intro, /auth, /role
  // Everything else → /plslogn if not logged in
const go = (route) => {
  // Only About and Login-related pages are public here
  const publicRoutes = ["/about", "/plslogn", "/auth", "/role"];
  if (publicRoutes.includes(route) || isLoggedIn) {
    navigate(route);
  } else {
    navigate("/plslogn");
  }
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── STICKY NAV ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200 py-3"
          : "bg-transparent border-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — public, always works */}
          <button onClick={() => go("/home")} className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-500/20 text-sm">
              PV
            </div>
            <span className="font-black text-lg tracking-tight text-slate-900">PrepVault</span>
          </button>

          {/* Nav Links — all protected except About */}
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => go("/home")}    className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={() => go("/plslogn")}    className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors bg-transparent border-none cursor-pointer">Jobs</button>
            <button onClick={() => go("/plslogn")} className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors bg-transparent border-none cursor-pointer">Companies</button>
            <button onClick={() => go("/about")}   className="text-sm font-bold uppercase tracking-widest text-sky-600 bg-transparent border-none cursor-pointer">About</button>
          </div>

          {/* Get Started */}
          <button
            onClick={() => go("/main")}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-44 pb-28 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] bg-sky-100 blur-[140px] rounded-full opacity-60" />
          <div className="absolute bottom-0 right-[-5%] w-[40%] h-[40%] bg-indigo-50 blur-[100px] rounded-full opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={13} />
              India's All-in-One Interview Prep Platform
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.92] mb-8 text-slate-900">
              Prepare.<br />
              <span className="text-sky-600">Apply.</span><br />
              Get Hired.
            </h1>

            <p className="text-slate-500 text-lg max-w-lg leading-relaxed mb-10">
              PrepVault is the only platform that combines mock interview videos, aptitude tests,
              a question bank, resume builder, costume guide, and an interview store — all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              {/* Explore Careers → protected */}
              <button
                onClick={() => go("/main")}
                className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:-translate-y-1 shadow-2xl"
              >
                Explore Careers <ArrowRight size={18} />
              </button>

              {/* Watch Demo → protected */}
              <button
                onClick={() => go("/mainvdo")}
                className="flex items-center gap-2 text-slate-600 hover:text-sky-600 font-semibold text-sm transition-colors bg-transparent border-none cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <Play size={14} className="text-sky-600 ml-0.5" />
                </div>
                Watch Demo Videos
              </button>
            </div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Platform At a Glance</p>
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white/5 hover:bg-white/10 transition rounded-2xl p-5">
                      <div className="text-3xl font-black tracking-tight text-white mb-1">{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Mock Videos", "Aptitude Tests", "Job Board", "Interview Store", "Resume Builder"].map(t => (
                    <span key={t} className="text-[11px] font-semibold bg-white/10 text-slate-300 px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 max-w-[200px]"
            >
              <div className="p-2 bg-sky-100 rounded-xl w-fit mb-3">
                <Rocket className="text-sky-600" size={18} />
              </div>
              <div className="text-2xl font-black text-slate-900">All-in-One</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Prep → Apply → Hire</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-4 bg-sky-50 rounded-3xl w-fit mx-auto mb-8 border border-sky-100 rotate-3">
            <Zap className="text-sky-600" size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8 text-slate-900">
            We don't just prepare you for interviews.<br />
            <span className="text-sky-600">We prepare all of you.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Most platforms give you questions. We give you the full picture — the confidence to speak,
            the knowledge to answer, the look to impress, and the connections to actually get hired.
            PrepVault is your complete interview journey, from day one to offer letter.
          </p>
        </div>
      </section>

      {/* ── MODULES — all cards protected ── */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Everything Inside</div>
              <h2 className="text-5xl font-black tracking-tight text-slate-900">8 Modules. One Platform.</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">Every tool is connected — your progress, your resume, your outfit, your job.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((m, idx) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                {/* ✅ onClick uses go() — redirects to /plslogn if not logged in */}
                <button
                  onClick={() => go(m.route)}
                  className="w-full text-left bg-white p-8 rounded-4xl border border-slate-200 group hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  <div className={`w-12 h-12 ${m.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <m.icon size={22} />
                  </div>
                  <h3 className="text-base font-black tracking-tight text-slate-900 mb-3">{m.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{m.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-sky-600 text-xs font-bold group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={13} />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Core Principles</div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">What Drives Us.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-4xl border border-slate-200 group hover:border-sky-400/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className={`w-12 h-12 ${v.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <v.icon size={22} />
                </div>
                <h3 className="text-lg font-black tracking-tight text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Our Journey</div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">From Idea to Impact.</h2>
          </div>
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-20 max-w-4xl mx-auto space-y-16">
            {timeline.map((t, idx) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[calc(2rem+1px)] md:-left-[calc(5rem+1px)] top-1 w-8 h-8 bg-white border-2 border-sky-600 rounded-full flex items-center justify-center shadow-[0_0_0_6px_#f8fafc]">
                  <div className="w-2.5 h-2.5 bg-sky-600 rounded-full" />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                  <div className="shrink-0">
                    <span className="text-4xl font-black text-sky-200 tracking-tighter block leading-none mb-1">{t.year}</span>
                    <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{t.title}</span>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Success Stories</div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">Real Students. Real Results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 border border-slate-200 rounded-4xl p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="text-slate-600 text-base leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-6 mb-12">
        <div className="max-w-7xl mx-auto bg-sky-600 rounded-[3rem] p-14 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-sky-400/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
              Ready to crack your next interview?
            </h2>
            <p className="text-sky-100 text-lg font-medium mb-12 leading-relaxed">
              Practice aptitude, watch mock interviews, build your resume, dress sharp,
              and apply to real jobs — all from one platform.
            </p>
            <div className="flex flex-wrap justify-center gap-5">

              {/* ✅ Join as Candidate — protected */}
              <button
                onClick={() => go("/main")}
                className="bg-white text-sky-600 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Join as Candidate
              </button>

              {/* ✅ Hire with Us — goes to /jobhome (protected) */}
              <button
                onClick={() => go("/jobhome")}
                className="bg-sky-500/30 text-white border border-white/20 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-sky-500/50 transition-all"
              >
                Hire with Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}