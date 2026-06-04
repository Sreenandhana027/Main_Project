import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Homeheader from "./Homeheader";
import Footer from "../../../components/Footer";

const services = [
  {
    title: "Resume Builder",
    desc: "Design ATS-friendly resumes with smart templates, skill analysis, and instant preview.",
    route: "https://resume-builder-fronend.onrender.com",
    img: "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg",
    tag: "AI-Powered",
    accent: "#3B82F6",        // Blue
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Career Shopping",
    desc: "Explore books, premium courses, tools, and resources to boost your career growth.",
    route: "/Dashboard",
    img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
    tag: "500+ Resources",
    accent: "#F97316",        // Orange
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Interview Prep",
    desc: "Practice aptitude tests, mock interviews, technical Q&A, and HR round questions.",
    route: "/inter",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=60",
    tag: "1000+ Questions",
    accent: "#10B981",        // Emerald
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Job Vacancies",
    desc: "Discover verified job openings, company profiles, and apply with one click.",
    route: "/jobhome",
    img: "https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg",
    tag: "Live Listings",
    accent: "#8B5CF6",        // Purple
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function ServiceCard({ item, index, navigate }) {
  const [cardRef, cardVisible] = useInView();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  const handleClick = () => {
    if (item.route.startsWith("http")) {
      window.open(item.route, "_blank");
    } else {
      navigate(item.route);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible
          ? hovered
            ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) translateY(-12px) scale(1.03)`
            : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)"
          : "translateY(60px)",
        transition: cardVisible
          ? "opacity 0.7s ease, transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)"
          : "none",
        transitionDelay: cardVisible ? `${index * 0.12}s` : "0s",
        "--accent": item.accent,
      }}
      className="relative cursor-pointer group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl"
    >
      {/* Subtle glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl z-10 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 0.6 : 0,
          boxShadow: `0 0 0 2px ${item.accent}30, 0 10px 50px ${item.accent}20`,
        }}
      />

      <div className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden h-full flex flex-col shadow-sm">

        {/* Image Area */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: hovered ? "scale(1.12)" : "scale(1.03)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60" />

          {/* Tag */}
          <span
            className="absolute top-5 left-5 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-md border"
            style={{
              background: `${item.accent}15`,
              borderColor: `${item.accent}40`,
              color: item.accent,
            }}
          >
            {item.tag}
          </span>

          {/* Icon Badge */}
          <div
            className="absolute bottom-5 right-5 p-3 rounded-2xl backdrop-blur-md border"
            style={{
              background: "white",
              borderColor: `${item.accent}30`,
              color: item.accent,
            }}
          >
            {item.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-1">
          <h2
            className="text-2xl font-bold mb-3 tracking-tight transition-colors"
            style={{
              color: hovered ? item.accent : "#111827",
            }}
          >
            {item.title}
          </h2>

          <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-1">
            {item.desc}
          </p>

          <div className="flex items-center gap-2 text-sm font-semibold mt-auto">
            <span style={{ color: item.accent }}>Explore Service</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 transition-transform"
              style={{
                color: item.accent,
                transform: hovered ? "translateX(6px)" : "translateX(0)",
              }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainDashboard() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    setTimeout(() => setMounted(true), 100);

    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Homeheader />

      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background subtle elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[40px_40px] opacity-70" />

        {/* Hero Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2 rounded-full mb-6 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-600 tracking-widest">ALL-IN-ONE CAREER PLATFORM</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">
            Build Your Career,<br />
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              On Your Terms.
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From crafting the perfect resume to landing your dream job — everything you need in one elegant platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} navigate={navigate} />
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-24 max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: "50K+", label: "Careers Launched" },
            { num: "1,500+", label: "Resources Available" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl py-8 shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.num}</div>
              <div className="text-sm text-gray-500 font-medium tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </section>

      <Footer />
    </div>
  );
}

export default MainDashboard;