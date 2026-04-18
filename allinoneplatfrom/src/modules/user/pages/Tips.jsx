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

/* ─────────────── unique tip-item renderers ─────────────── */

// Style A — Wide horizontal banner with coloured left strip
const StyleBanner = ({ tip, accent, idx }) => (
  <div
    className="tip-item flex items-stretch rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-xl group transition-all duration-300"
    style={{ minHeight: 100 }}
  >
    <div className={`w-2 flex-shrink-0 ${accent.strip}`} />
    <div className="flex items-center gap-5 px-6 py-5 flex-1">
      <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${accent.iconBg}`}>
        {tip.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-black text-gray-900 text-base">{tip.title}</h3>
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${accent.badge}`}>{tip.tag}</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 flex-shrink-0 transition-colors" />
    </div>
  </div>
);

// Style B — Big numbered step block
const StyleNumbered = ({ tip, accent, idx }) => (
  <div className="tip-item relative bg-gray-950 rounded-3xl overflow-hidden p-8 group hover:scale-[1.02] transition-transform duration-300">
    <span
      className="absolute top-4 right-5 text-[7rem] font-black leading-none select-none pointer-events-none"
      style={{ color: "rgba(255,255,255,0.04)" }}
    >
      {String(idx + 1).padStart(2, "0")}
    </span>
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5 ${accent.darkBadge}`}>
      {tip.tag}
    </div>
    <div className="mb-4">{React.cloneElement(tip.icon, { className: "w-8 h-8 text-white/80" })}</div>
    <h3 className="text-xl font-black text-white mb-3">{tip.title}</h3>
    <p className="text-sm text-white/50 leading-relaxed">{tip.desc}</p>
  </div>
);

// Style C — Magazine pull-quote style (large italic text, minimal)
const StyleMagazine = ({ tip, accent }) => (
  <div className={`tip-item rounded-3xl p-8 border-2 ${accent.outlineBorder} group hover:shadow-lg transition-all duration-300`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-full ${accent.iconBg}`}>{tip.icon}</div>
      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${accent.badge}`}>{tip.tag}</span>
    </div>
    <p className={`text-2xl font-black italic leading-snug mb-4 ${accent.quoteText}`}>
      "{tip.title}"
    </p>
    <p className="text-sm text-gray-500 leading-relaxed border-t border-stone-200 pt-4">{tip.desc}</p>
  </div>
);

// Style D — Icon spotlight (big centred icon, short blurb below)
const StyleSpotlight = ({ tip, accent }) => (
  <div className={`tip-item rounded-3xl p-8 text-center ${accent.spotBg} group hover:scale-[1.03] transition-transform duration-300`}>
    <div className={`w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl ${accent.iconBg} shadow-md`}>
      {React.cloneElement(tip.icon, { className: "w-7 h-7" })}
    </div>
    <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${accent.badge}`}>{tip.tag}</span>
    <h3 className="text-xl font-black text-gray-900 mt-3 mb-3">{tip.title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
  </div>
);

// Style E — Timeline / checklist row
const StyleTimeline = ({ tip, accent }) => (
  <div className="tip-item flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${accent.iconBg} border-2 ${accent.borderColor} z-10`}>
        {tip.icon}
      </div>
      <div className="flex-1 w-px bg-stone-200 mt-2" />
    </div>
    <div className="pb-8">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-black text-gray-900">{tip.title}</h3>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${accent.badge}`}>{tip.tag}</span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
    </div>
  </div>
);

// Style F — Glassmorphism / frosted card
const StyleGlass = ({ tip, accent }) => (
  <div
    className="tip-item rounded-3xl p-7 border border-white/60 backdrop-blur-md group hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
    style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(255,255,255,0.4) 100%)" }}
  >
    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30 blur-2xl ${accent.blob}`} />
    <div className="flex items-start justify-between mb-5">
      <div className={`p-3 rounded-2xl ${accent.iconBg}`}>{tip.icon}</div>
      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${accent.badge}`}>{tip.tag}</span>
    </div>
    <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:opacity-80 transition-opacity">{tip.title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
  </div>
);

/* ─────────────── accent themes ─────────────── */
const accents = {
  confidence: {
    strip: "bg-amber-400",
    iconBg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    darkBadge: "bg-amber-400/20 text-amber-300",
    outlineBorder: "border-amber-300",
    quoteText: "text-amber-700",
    spotBg: "bg-amber-50",
    borderColor: "border-amber-300",
    blob: "bg-amber-300",
  },
  preparation: {
    strip: "bg-blue-500",
    iconBg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    darkBadge: "bg-blue-400/20 text-blue-300",
    outlineBorder: "border-blue-300",
    quoteText: "text-blue-700",
    spotBg: "bg-blue-50",
    borderColor: "border-blue-300",
    blob: "bg-blue-300",
  },
  outfits: {
    strip: "bg-emerald-500",
    iconBg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    darkBadge: "bg-emerald-400/20 text-emerald-300",
    outlineBorder: "border-emerald-300",
    quoteText: "text-emerald-700",
    spotBg: "bg-emerald-50",
    borderColor: "border-emerald-300",
    blob: "bg-emerald-300",
  },
  bodylanguage: {
    strip: "bg-rose-500",
    iconBg: "bg-rose-50",
    badge: "bg-rose-100 text-rose-700",
    darkBadge: "bg-rose-400/20 text-rose-300",
    outlineBorder: "border-rose-300",
    quoteText: "text-rose-700",
    spotBg: "bg-rose-50",
    borderColor: "border-rose-300",
    blob: "bg-rose-300",
  },
};

// Each tip index maps to a style component - 6 tips use 6 different styles
const styleOrder = [StyleBanner, StyleNumbered, StyleMagazine, StyleSpotlight, StyleTimeline, StyleGlass];

/* ─────────────── layout wrappers per style ─────────────── */
// Some styles need full-width, some half, some third → define col-span
const colSpan = ["col-span-2", "col-span-1", "col-span-1", "col-span-1", "col-span-2", "col-span-1"];

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
      // Animate every tip-item element
      document.querySelectorAll(".tip-item").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: (i % 6) * 0.08, scrollTrigger: { trigger: el, start: "top 90%" } }
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
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: bannerRef.current, start: "top 85%" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "93%", label: "More confident after preparation" },
    { value: "3×", label: "Higher callback rate with proper attire" },
    { value: "7 sec", label: "Time to form a first impression" },
    { value: "78%", label: "Interviewers judge body language first" },
  ];

  const tipCategories = [
    {
      id: "confidence",
      label: "Mindset",
      title: "Boost Your Confidence",
      accent: "bg-amber-100 text-amber-700",
      iconBg: "bg-amber-50",
      icon: <Brain className="w-5 h-5 text-amber-600" />,
      borderColor: "border-amber-200",
      tips: [
        { icon: <Zap className="w-5 h-5 text-amber-500" />, title: "Power Posing", tag: "Psychology", desc: "Spend 2 minutes in a high-power pose before your interview — hands on hips, chin up. Research shows it naturally boosts confidence hormones and reduces stress." },
        { icon: <Heart className="w-5 h-5 text-rose-500" />, title: "4-7-8 Breathing", tag: "Wellness", desc: "Inhale 4 seconds, hold 7 seconds, exhale 8 seconds. This activates your parasympathetic system, immediately lowering anxiety before entering the room." },
        { icon: <Eye className="w-5 h-5 text-indigo-500" />, title: "Positive Visualization", tag: "Mindset", desc: "Spend 5 minutes nightly visualizing the interview going perfectly. Athletes do this — and it creates genuine neural pathways for calmness and precision." },
        { icon: <Star className="w-5 h-5 text-yellow-500" />, title: "The Affirmation Reset", tag: "Self-Talk", desc: "Write three specific strengths on paper and read them aloud before the interview. 'I have led teams' beats 'I am confident' — specificity sticks." },
        { icon: <Smile className="w-5 h-5 text-green-500" />, title: "Smile on Arrival", tag: "Body Language", desc: "Smiling triggers the release of feel-good neurotransmitters — even a forced smile works. Walk in smiling and you immediately set a warmer, confident tone." },
        { icon: <Shield className="w-5 h-5 text-blue-500" />, title: "Prepare for the Worst", tag: "Resilience", desc: "Write down your three biggest fear questions and rehearse calm answers. Removing unknowns eliminates the anxiety spiral so you can focus on impressing them." },
      ],
    },
    {
      id: "preparation",
      label: "Preparation",
      title: "Elite Interview Preparation",
      accent: "bg-blue-100 text-blue-700",
      iconBg: "bg-blue-50",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      borderColor: "border-blue-200",
      tips: [
        { icon: <Target className="w-5 h-5 text-blue-500" />, title: "The STAR+ Method", tag: "Strategy", desc: "Beyond Situation-Task-Action-Result — add a 'Reflection' to show growth. 'What I learned from this' signals maturity and genuine self-awareness." },
        { icon: <Briefcase className="w-5 h-5 text-slate-500" />, title: "Research the Panelists", tag: "Research", desc: "Look up your interviewers on LinkedIn before the call. Find shared interests or past projects. Mentioning it naturally builds instant rapport and trust." },
        { icon: <MessageSquare className="w-5 h-5 text-purple-500" />, title: "Reverse Interviewing", tag: "Soft Skills", desc: "Prepare 3 high-value questions: 'How does this role impact the company's 12-month goals?' shows strategic thinking and genuine interest in the role." },
        { icon: <Clock className="w-5 h-5 text-orange-500" />, title: "The 48-Hour Rule", tag: "Timing", desc: "Do your deepest research 48 hours before — not the night before. Sleep consolidates information. The day of is for light review and mental preparation only." },
        { icon: <Mic className="w-5 h-5 text-red-500" />, title: "Record a Mock Interview", tag: "Practice", desc: "Record yourself answering 5 common questions. Watch it back — you will immediately notice filler words, poor eye contact, and rushed pacing that you'd miss live." },
        { icon: <Rocket className="w-5 h-5 text-indigo-500" />, title: "The 90-Day Proposal", tag: "Advanced", desc: "Prepare a brief 90-day plan for what you'd accomplish in the role. Bring it as a printed document. Almost no candidates do this — it makes you unforgettable." },
      ],
    },
    {
      id: "outfits",
      label: "Outfit",
      title: "Dressing for the Role",
      accent: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-emerald-50",
      icon: <Shirt className="w-5 h-5 text-emerald-600" />,
      borderColor: "border-emerald-200",
      tips: [
        { icon: <Shirt className="w-5 h-5 text-emerald-500" />, title: "The 10% Rule", tag: "Attire", desc: "Always dress 10% more formal than the company's daily dress code. It shows respect for the process without looking out of touch. Research the culture first." },
        { icon: <Eye className="w-5 h-5 text-blue-500" />, title: "Color Psychology", tag: "Psychology", desc: "Navy blue signals trustworthiness and stability. Charcoal grey signals authority. Soft white signals clarity. Avoid overly bright colors that distract from your words." },
        { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, title: "Fit Over Fashion", tag: "Essentials", desc: "A perfectly fitted modest suit will always outperform an expensive ill-fitting one. Tailoring a ₹2000 shirt costs ₹300 and makes you look like you spent ₹10,000." },
        { icon: <Star className="w-5 h-5 text-amber-500" />, title: "The Shoe Rule", tag: "Details", desc: "Interviewers often notice shoes without realizing it. Clean, polished, closed-toe shoes in neutral tones signal attention to detail and professionalism." },
        { icon: <Zap className="w-5 h-5 text-purple-500" />, title: "Virtual Professionalism", tag: "Remote", desc: "Even for online interviews, dress fully from head to toe. It changes your posture, vocal projection, and mental state — unconsciously signaling you're 'at work'." },
        { icon: <Shield className="w-5 h-5 text-slate-500" />, title: "Minimal Accessories", tag: "Polish", desc: "Keep accessories minimal — one watch, stud earrings, one ring maximum. Less is more in interviews. Let your words and personality carry the room, not jewelry." },
      ],
    },
    {
      id: "bodylanguage",
      label: "Body Language",
      title: "Communicate Without Words",
      accent: "bg-rose-100 text-rose-700",
      iconBg: "bg-rose-50",
      icon: <MessageSquare className="w-5 h-5 text-rose-600" />,
      borderColor: "border-rose-200",
      tips: [
        { icon: <Eye className="w-5 h-5 text-rose-500" />, title: "Camera Eye Contact", tag: "Video Calls", desc: "When speaking on video, look at your camera lens — not the interviewer's face on screen. It creates genuine eye contact on their end and signals directness." },
        { icon: <Zap className="w-5 h-5 text-orange-500" />, title: "Deliberate Hand Gestures", tag: "Gestures", desc: "Keep hands visible and use them to emphasize key points. Visible hands signal honesty and passion. Keep them within frame and avoid repetitive fidgeting." },
        { icon: <Heart className="w-5 h-5 text-pink-500" />, title: "Active Listening Cues", tag: "Listening", desc: "Nod gently and use minimal encouragers like 'I see' or 'That makes sense' while they speak. It shows engagement and builds a real conversational rapport." },
        { icon: <Smile className="w-5 h-5 text-yellow-500" />, title: "The Pause Technique", tag: "Communication", desc: "Don't rush to answer. Pause 2-3 seconds after a hard question. It signals thoughtfulness — not confusion. Rushed answers often contain filler words and errors." },
        { icon: <Target className="w-5 h-5 text-indigo-500" />, title: "Open Posture Always", tag: "Posture", desc: "Uncross arms, sit slightly forward, shoulders relaxed but back. Open posture signals confidence and engagement. Slouching signals disinterest or insecurity." },
        { icon: <Rocket className="w-5 h-5 text-blue-500" />, title: "Mirror & Match", tag: "Rapport", desc: "Subtly mirror the interviewer's energy and pace — if they're warm and slow, be warm and slow. This creates unconscious rapport and makes them feel understood." },
      ],
    },
  ];

  return (
    <div className="bg-stone-50 text-gray-900 overflow-x-hidden font-sans">
      <Homeheader />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden flex items-center">
        <div ref={heroImgRef} className="absolute inset-0 -top-[3%] h-[130%]">
          <img
            src="https://images.pexels.com/photos/4344617/pexels-photo-4344617.jpeg"
            alt="Career tips hero"
            className="w-full h-full object-cover brightness-[0.50]"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-white">
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 backdrop-blur-sm opacity-0">
            <Rocket className="w-4 h-4 text-amber-300" />
            <span className="text-white/90">PrepVault — Expert Tips</span>
          </div>
          <h1 ref={heroTextRef} className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6 opacity-0">
            Own Every<br />
            <span className="italic text-amber-300">Interview.</span>
          </h1>
          <p ref={heroSubRef} className="text-lg text-white/70 max-w-xl leading-relaxed opacity-0">
            Curated strategies for confidence, elite preparation, outfit psychology,
            and body language — everything you need to walk in and win.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-y border-stone-200 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} ref={(el) => (statRefs.current[i] = el)} className="text-center opacity-0">
              <div className="text-4xl font-black text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="py-20 px-6 bg-stone-50">
        <div ref={quoteRef} className="max-w-4xl mx-auto border-l-4 border-amber-400 pl-8 opacity-0">
          <p className="text-3xl md:text-4xl font-black italic text-gray-800 leading-tight">
            "The interview is won before you enter the room — in the preparation, the outfit,
            and the mindset you walk in with."
          </p>
          <p className="mt-4 text-sm text-gray-400 font-medium tracking-widest uppercase">
            PrepVault Philosophy
          </p>
        </div>
      </section>

      {/* ── TIP SECTIONS ── */}
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-28">
        {tipCategories.map((cat, catIdx) => {
          const accent = accents[cat.id];
          return (
            <section key={cat.id}>
              {/* Section header */}
              <div
                ref={(el) => (sectionRefs.current[catIdx] = el)}
                className="flex items-center gap-4 mb-12 opacity-0"
              >
                <div className={`p-3 rounded-2xl ${cat.iconBg} border ${cat.borderColor}`}>
                  {cat.icon}
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cat.accent}`}>
                    {cat.label}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black mt-1 text-gray-900">
                    {cat.title}
                  </h2>
                </div>
              </div>

              {/* ── Mixed-layout grid ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">

                {/* Tip 0 — StyleBanner → full-width across all cols */}
                <div className="lg:col-span-3 md:col-span-2">
                  <StyleBanner tip={cat.tips[0]} accent={accent} idx={0} />
                </div>

                {/* Tip 1 — StyleNumbered → 1 col */}
                <div>
                  <StyleNumbered tip={cat.tips[1]} accent={accent} idx={1} />
                </div>

                {/* Tip 2 — StyleMagazine → 1 col */}
                <div>
                  <StyleMagazine tip={cat.tips[2]} accent={accent} />
                </div>

                {/* Tip 3 — StyleSpotlight → 1 col */}
                <div>
                  <StyleSpotlight tip={cat.tips[3]} accent={accent} />
                </div>

                {/* Tip 4 + 5 — Timeline stacked in a side-by-side 2-col panel */}
                <div className="lg:col-span-2 md:col-span-2 bg-white rounded-3xl border border-stone-200 p-8 hover:shadow-lg transition-shadow">
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 ${cat.accent} inline-flex px-3 py-1 rounded-full`}>
                    Step-by-step
                  </p>
                  <StyleTimeline tip={cat.tips[4]} accent={accent} />
                  <StyleTimeline tip={cat.tips[5]} accent={accent} />
                </div>

                {/* Bonus glass card — re-uses tip 0 data as a highlight */}
                <div className="hidden lg:block">
                  <StyleGlass tip={cat.tips[3]} accent={accent} />
                </div>

              </div>
            </section>
          );
        })}

        {/* ── BANNER ── */}
        <div ref={bannerRef} className="relative rounded-[2.5rem] overflow-hidden bg-gray-950 opacity-0">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80"
            alt="Success"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 py-20 px-12 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-white/10 border border-white/20 mb-8">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight mb-4">
              Never Stop Growing.
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Pair these tips with our professional interview attire collection — designed to
              make your confidence visible before you say a word.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/Dashboard">
                <button className="px-10 py-4 bg-white text-gray-950 rounded-full font-black text-sm tracking-wide hover:bg-amber-300 transition-colors shadow-xl">
                  Shop Interview Outfits
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tips;