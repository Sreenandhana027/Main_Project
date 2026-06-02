import React, { useRef, useEffect } from "react";
import {
  Sparkles, Brain, Briefcase, Shirt, MessageSquare,
  Rocket, Award, CheckCircle2, ChevronRight, Zap,
  Eye, Heart, Star, Shield, Clock, Smile, Target, Mic
} from "lucide-react";
import Footer from "../../../components/Footer";
import Homeheader from "../components/Homeheader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ─── Tip Card ─── */
const TipCard = ({ tip, index, accentColor, accentLight, accentDark }) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  return (
    <div
      className="tip-card group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
      style={{ "--accent": accentColor }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: accentColor }} />

      <div className="p-7">
        {/* Index + tag row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full"
            style={{ background: accentLight, color: accentDark }}
          >
            {tip.tag}
          </span>
          <span
            className="text-5xl font-black leading-none select-none"
            style={{ color: accentLight, fontFamily: "'Playfair Display', serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Icon circle */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: accentLight }}
        >
          {React.cloneElement(tip.icon, { style: { color: accentColor }, className: "w-5 h-5" })}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-black text-gray-900 mb-3 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {tip.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>

        {/* Bottom hover line */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: accentColor }}
        />
      </div>
    </div>
  );
};

/* ─── Featured wide card ─── */
const FeaturedCard = ({ tip, accentColor, accentLight, accentDark }) => (
  <div
    className="tip-card relative rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 group"
    style={{ background: `linear-gradient(135deg, #0f0f13 0%, #1a1a22 100%)` }}
  >
    {/* Decorative blob */}
    <div
      className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{ background: accentColor, transform: "translate(30%, -30%)" }}
    />
    <div className="relative z-10 p-10 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-shrink-0">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: accentColor + "25", border: `1px solid ${accentColor}40` }}
        >
          {React.cloneElement(tip.icon, { style: { color: accentColor }, className: "w-7 h-7" })}
        </div>
      </div>
      <div className="flex-1">
        <span
          className="text-xs font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4 inline-block"
          style={{ background: accentColor + "22", color: accentColor }}
        >
          {tip.tag} · Featured
        </span>
        <h3
          className="text-2xl md:text-3xl font-black text-white mb-3 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {tip.title}
        </h3>
        <p className="text-white/55 leading-relaxed text-sm md:text-base">{tip.desc}</p>
      </div>
    </div>
  </div>
);

/* ─── Section colors ─── */
const palette = {
  confidence:   { color: "#f59e0b", light: "#fef3c7", dark: "#92400e" },
  preparation:  { color: "#3b82f6", light: "#dbeafe", dark: "#1e40af" },
  outfits:      { color: "#10b981", light: "#d1fae5", dark: "#065f46" },
  bodylanguage: { color: "#ec4899", light: "#fce7f3", dark: "#9d174d" },
};

const Tips = () => {
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroSubRef = useRef(null);
  const statRefs = useRef([]);
  const sectionRefs = useRef([]);
  const bannerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroBadgeRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(heroTextRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.4 }
      );
      gsap.fromTo(heroSubRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.65 }
      );
      gsap.to(heroImgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      statRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
      document.querySelectorAll(".tip-card").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: (i % 6) * 0.07,
            scrollTrigger: { trigger: el, start: "top 92%" } }
        );
      });
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: quoteRef.current, start: "top 82%" } }
        );
      }
      if (bannerRef.current) {
        gsap.fromTo(bannerRef.current,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: bannerRef.current, start: "top 85%" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "93%", label: "More confident after preparation", icon: "✦" },
    { value: "3×",  label: "Higher callback rate with proper attire", icon: "✦" },
    { value: "7s",  label: "Time to form a first impression", icon: "✦" },
    { value: "78%", label: "Interviewers judge body language first", icon: "✦" },
  ];

  const tipCategories = [
    {
      id: "confidence", label: "Mindset", title: "Boost Your Confidence",
      icon: <Brain className="w-5 h-5" />,
      tips: [
        { icon: <Zap className="w-5 h-5" />, title: "Power Posing", tag: "Psychology", desc: "Spend 2 minutes in a high-power pose before your interview. Research shows it naturally boosts confidence hormones and reduces stress." },
        { icon: <Heart className="w-5 h-5" />, title: "4-7-8 Breathing", tag: "Wellness", desc: "Inhale 4 seconds, hold 7, exhale 8. This activates your parasympathetic system, immediately lowering anxiety before entering the room." },
        { icon: <Eye className="w-5 h-5" />, title: "Positive Visualization", tag: "Mindset", desc: "Spend 5 minutes nightly visualizing the interview going perfectly. Athletes do this — it creates genuine neural pathways for calmness." },
        { icon: <Star className="w-5 h-5" />, title: "The Affirmation Reset", tag: "Self-Talk", desc: "Write three specific strengths and read them aloud. 'I have led teams' beats 'I am confident' — specificity sticks." },
        { icon: <Smile className="w-5 h-5" />, title: "Smile on Arrival", tag: "Body Language", desc: "Smiling triggers feel-good neurotransmitters. Walk in smiling and you immediately set a warmer, confident tone." },
        { icon: <Shield className="w-5 h-5" />, title: "Prepare for the Worst", tag: "Resilience", desc: "Write down your three biggest fear questions and rehearse calm answers. Removing unknowns eliminates the anxiety spiral." },
      ],
    },
    {
      id: "preparation", label: "Preparation", title: "Elite Interview Preparation",
      icon: <Briefcase className="w-5 h-5" />,
      tips: [
        { icon: <Target className="w-5 h-5" />, title: "The STAR+ Method", tag: "Strategy", desc: "Beyond Situation-Task-Action-Result — add a 'Reflection' to show growth. It signals maturity and genuine self-awareness." },
        { icon: <Briefcase className="w-5 h-5" />, title: "Research the Panelists", tag: "Research", desc: "Look up your interviewers on LinkedIn. Find shared interests or past projects — mentioning it naturally builds instant rapport." },
        { icon: <MessageSquare className="w-5 h-5" />, title: "Reverse Interviewing", tag: "Soft Skills", desc: "Prepare 3 high-value questions: 'How does this role impact the company's 12-month goals?' shows strategic thinking." },
        { icon: <Clock className="w-5 h-5" />, title: "The 48-Hour Rule", tag: "Timing", desc: "Do your deepest research 48 hours before — not the night before. Sleep consolidates information. Day-of is for light review only." },
        { icon: <Mic className="w-5 h-5" />, title: "Record a Mock Interview", tag: "Practice", desc: "Record yourself answering 5 common questions. Watch it back — you'll immediately spot filler words, poor eye contact, and rushed pacing." },
        { icon: <Rocket className="w-5 h-5" />, title: "The 90-Day Proposal", tag: "Advanced", desc: "Prepare a brief 90-day plan for the role. Bring it as a printed document. Almost no candidates do this — it makes you unforgettable." },
      ],
    },
    {
      id: "outfits", label: "Outfit", title: "Dressing for the Role",
      icon: <Shirt className="w-5 h-5" />,
      tips: [
        { icon: <Shirt className="w-5 h-5" />, title: "The 10% Rule", tag: "Attire", desc: "Always dress 10% more formal than the company's daily dress code. It shows respect for the process without looking out of touch." },
        { icon: <Eye className="w-5 h-5" />, title: "Color Psychology", tag: "Psychology", desc: "Navy blue signals trust. Charcoal grey signals authority. Soft white signals clarity. Avoid overly bright colors that distract." },
        { icon: <CheckCircle2 className="w-5 h-5" />, title: "Fit Over Fashion", tag: "Essentials", desc: "A perfectly fitted modest suit outperforms an expensive ill-fitting one. Tailoring a ₹2000 shirt costs ₹300 and transforms your look." },
        { icon: <Star className="w-5 h-5" />, title: "The Shoe Rule", tag: "Details", desc: "Interviewers notice shoes without realizing it. Clean, polished, closed-toe shoes in neutral tones signal professionalism." },
        { icon: <Zap className="w-5 h-5" />, title: "Virtual Professionalism", tag: "Remote", desc: "Even for online interviews, dress fully. It changes your posture, vocal projection, and mental state — you're 'at work'." },
        { icon: <Shield className="w-5 h-5" />, title: "Minimal Accessories", tag: "Polish", desc: "Keep accessories minimal — one watch, stud earrings, one ring max. Less is more. Let your words carry the room." },
      ],
    },
    {
      id: "bodylanguage", label: "Body Language", title: "Communicate Without Words",
      icon: <MessageSquare className="w-5 h-5" />,
      tips: [
        { icon: <Eye className="w-5 h-5" />, title: "Camera Eye Contact", tag: "Video Calls", desc: "On video, look at your camera lens — not the screen. It creates genuine eye contact on their end and signals directness." },
        { icon: <Zap className="w-5 h-5" />, title: "Deliberate Hand Gestures", tag: "Gestures", desc: "Keep hands visible and use them to emphasize key points. Visible hands signal honesty and passion." },
        { icon: <Heart className="w-5 h-5" />, title: "Active Listening Cues", tag: "Listening", desc: "Nod gently and use minimal encouragers while they speak. It shows engagement and builds real conversational rapport." },
        { icon: <Smile className="w-5 h-5" />, title: "The Pause Technique", tag: "Communication", desc: "Pause 2-3 seconds after a hard question. It signals thoughtfulness — not confusion. Rushed answers contain errors." },
        { icon: <Target className="w-5 h-5" />, title: "Open Posture Always", tag: "Posture", desc: "Uncross arms, sit slightly forward, shoulders relaxed but back. Open posture signals confidence and engagement." },
        { icon: <Rocket className="w-5 h-5" />, title: "Mirror & Match", tag: "Rapport", desc: "Subtly mirror the interviewer's energy and pace. This creates unconscious rapport and makes them feel understood." },
      ],
    },
  ];

  return (
    <div className="bg-[#f7f6f2] text-gray-900 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;700&display=swap');
        .serif { font-family: 'Playfair Display', serif; }
        .hero-grad { background: linear-gradient(to bottom, transparent 50%, #f7f6f2 100%); }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-card { transition: transform 0.3s ease; }
      `}</style>

      <Homeheader />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[88vh] overflow-hidden flex items-end pb-24">
        <div ref={heroImgRef} className="absolute inset-0 h-[130%]">
          <img
            src="https://images.pexels.com/photos/4344617/pexels-photo-4344617.jpeg"
            alt="Career tips hero"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(0.8)" }}
          />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Bottom fade */}
        <div className="hero-grad absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
          {/* Eyebrow */}
          <div
            ref={heroBadgeRef}
            className="inline-flex items-center gap-2 mb-6 opacity-0"
          >
            <div className="w-8 h-px bg-amber-400" />
            <span className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">PrepVault · Expert Tips</span>
          </div>

          {/* Headline */}
          <h1
            ref={heroTextRef}
            className="serif text-white opacity-0 mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em" }}
          >
            Own Every<br />
            <em className="text-amber-400 not-italic">Interview.</em>
          </h1>

          {/* Sub */}
          <p
            ref={heroSubRef}
            className="text-white/60 max-w-lg leading-relaxed opacity-0"
            style={{ fontSize: "1.05rem", fontWeight: 300 }}
          >
            Curated strategies for confidence, elite preparation, outfit psychology,
            and body language — everything to walk in and win.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 bg-[#f7f6f2]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              ref={(el) => (statRefs.current[i] = el)}
              className="stat-card opacity-0 bg-white rounded-2xl p-7 border border-gray-100 text-center shadow-sm"
            >
              <div className="text-amber-400 text-sm mb-2">{s.icon}</div>
              <div
                className="serif font-black text-gray-900 mb-2"
                style={{ fontSize: "2.8rem", lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="text-gray-400 text-xs leading-snug font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="py-24 px-6">
        <div
          ref={quoteRef}
          className="max-w-5xl mx-auto opacity-0 relative"
        >
          {/* Big decorative quote mark */}
          <div
            className="serif absolute -top-10 -left-4 text-amber-200 select-none pointer-events-none"
            style={{ fontSize: "12rem", lineHeight: 1, fontWeight: 900 }}
          >
            "
          </div>
          <div className="relative z-10 pl-8">
            <p
              className="serif italic text-gray-800 leading-tight mb-6"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 700 }}
            >
              The interview is won before you enter the room — in the preparation,
              the outfit, and the mindset you walk in with.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-amber-400" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase">PrepVault Philosophy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIP SECTIONS ── */}
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
        {tipCategories.map((cat, catIdx) => {
          const pal = palette[cat.id];
          return (
            <section key={cat.id}>
              {/* Section header */}
              <div
                ref={(el) => (sectionRefs.current[catIdx] = el)}
                className="opacity-0 mb-14"
              >
                {/* Label row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: pal.light }}
                  >
                    {React.cloneElement(cat.icon, { style: { color: pal.color } })}
                  </div>
                  <span
                    className="text-xs font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
                    style={{ background: pal.light, color: pal.dark }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="serif font-black text-gray-900"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", lineHeight: 1.05 }}
                >
                  {cat.title}
                </h2>

                {/* Divider */}
                <div className="flex items-center gap-4 mt-5">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-gray-300 text-xs tracking-widest">0{catIdx + 1}</span>
                </div>
              </div>

              {/* Featured card — tip 0 */}
              <div className="mb-6">
                <FeaturedCard
                  tip={cat.tips[0]}
                  accentColor={pal.color}
                  accentLight={pal.light}
                  accentDark={pal.dark}
                />
              </div>

              {/* Regular grid — tips 1–5 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.tips.slice(1).map((tip, i) => (
                  <TipCard
                    key={i}
                    tip={tip}
                    index={i + 1}
                    accentColor={pal.color}
                    accentLight={pal.light}
                    accentDark={pal.dark}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── CTA BANNER ── */}
        <div ref={bannerRef} className="relative rounded-[2rem] overflow-hidden opacity-0">
          {/* Dark base */}
          <div className="absolute inset-0 bg-[#0d0d10]" />

          {/* Photo */}
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80"
            alt="Success"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Amber glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] opacity-20"
            style={{ background: "#f59e0b" }}
          />

          <div className="relative z-10 py-24 px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 mb-8">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Level Up</span>
            </div>

            <h2
              className="serif italic font-black text-white mb-5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
            >
              Never Stop Growing.
            </h2>

            <p className="text-white/50 text-base max-w-md mx-auto mb-12 leading-relaxed" style={{ fontWeight: 300 }}>
              Pair these tips with our professional interview attire — designed to make
              your confidence visible before you say a word.
            </p>

            <Link to="/Dashboard">
              <button
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-sm tracking-wide transition-all duration-300 hover:gap-5"
                style={{ background: "#f59e0b", color: "#0d0d10" }}
                onMouseOver={e => e.currentTarget.style.background = "#fbbf24"}
                onMouseOut={e => e.currentTarget.style.background = "#f59e0b"}
              >
                Shop Interview Outfits
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tips;