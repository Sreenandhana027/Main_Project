import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import ApplyModal from "./ApplyModal";
import Homeheader from "../components/Homeheader";
import Footer from "./shopping/Footer";

export default function JobVacancies() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const jobs = [
        {
            id: 1,
            company: "Google",
            role: "Senior Backend Engineer",
            type: "Full Time",
            category: "Development",
            location: "Bangalore",
            date: "2 days ago",
            logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
            color: "from-blue-500/20 to-indigo-500/20"
        },
        {
            id: 2,
            company: "Microsoft",
            role: "Cloud Solutions Architect",
            type: "Full Time",
            category: "Cloud",
            location: "Hyderabad",
            date: "1 week ago",
            logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            id: 3,
            company: "Amazon",
            role: "Software Development Engineer",
            type: "Full Time",
            category: "Development",
            location: "Chennai",
            date: "3 days ago",
            logo: "https://cdn-icons-png.flaticon.com/512/732/732229.png",
            color: "from-orange-500/20 to-amber-500/20"
        },
        {
            id: 4,
            company: "Meta",
            role: "React Developer",
            type: "Remote",
            category: "Frontend",
            location: "Remote",
            date: "5 days ago",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
            color: "from-blue-600/20 to-indigo-600/20"
        },
        {
            id: 5,
            company: "Netflix",
            role: "UI Engineer",
            type: "Full Time",
            category: "UI/UX",
            location: "Mumbai",
            date: "1 week ago",
            logo: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
            color: "from-red-600/20 to-rose-600/20"
        },
        {
            id: 6,
            company: "Apple",
            role: "iOS Developer",
            type: "Full Time",
            category: "Mobile",
            location: "Bangalore",
            date: "2 weeks ago",
            logo: "https://cdn-icons-png.flaticon.com/512/0/747.png",
            color: "from-slate-500/20 to-slate-400/20"
        },
        {
            id: 7,
            company: "Infosys",
            role: "Java Developer",
            type: "Full Time",
            category: "Backend",
            location: "Pune",
            date: "4 days ago",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
            color: "from-blue-400/20 to-teal-400/20"
        },
        {
            id: 8,
            company: "TCS",
            role: "System Engineer",
            type: "Full Time",
            category: "IT Services",
            location: "Kochi",
            date: "6 days ago",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tata_Consultancy_Services_Logo.svg",
            color: "from-red-500/20 to-blue-500/20"
        },
        {
            id: 9,
            company: "Wipro",
            role: "Data Analyst",
            type: "Full Time",
            category: "Data",
            location: "Bangalore",
            date: "2 weeks ago",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
            color: "from-purple-500/20 to-indigo-500/20"
        },
        {
            id: 10,
            company: "Zoho",
            role: "Product Engineer",
            type: "Full Time",
            category: "Product",
            location: "Chennai",
            date: "3 days ago",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968841.png",
            color: "from-red-500/20 to-yellow-500/20"
        }
    ];

    const filteredJobs = jobs.filter(job => 
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <Homeheader />

            {/* ── HEADER ── */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
                    <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-blue-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                            <Sparkles className="w-3 h-3" />
                            Active Vacancies
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
                            Discover <br />
                            <span className="text-gradient">Opportunities.</span>
                        </h1>
                        <p className="text-slate-500 max-w-md font-medium">{filteredJobs.length} positions available matching your preferences.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full md:w-auto flex flex-col md:flex-row gap-4"
                    >
                        <div className="relative group">
                            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search roles or companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-sm"
                            />
                        </div>
                        <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm font-bold">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── JOB LIST GRID ── */}
            <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredJobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="group relative p-8 rounded-[2rem] glass-morphism border border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden flex flex-col sm:flex-row gap-6 items-start cursor-pointer group"
                                onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                                {/* Hover background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover:opacity-100 transition-opacity blur-3xl`} />
                                
                                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl flex items-center justify-center p-3 sm:p-5 shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                                </div>

                                <div className="relative z-10 flex-1 w-full sm:w-auto">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{job.role}</h3>
                                            <p className="text-sm text-slate-400 font-bold mb-1 tracking-tight">{job.company}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">{job.date}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg uppercase tracking-tight">{job.type}</span>
                                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-tight">{job.location}</span>
                                        <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg uppercase tracking-tight">{job.category}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(user => (
                                                <div key={user} className="w-6 h-6 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/50?u=${user + job.id}`} alt="User" />
                                                </div>
                                            ))}
                                            <div className="w-6 h-6 rounded-full border border-slate-900 bg-indigo-500/20 flex items-center justify-center text-[8px] font-bold text-indigo-400">
                                                +12
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedJob(job);
                                                setShowModal(true);
                                            }}
                                            className="px-6 py-2.5 bg-white text-slate-950 rounded-xl font-black text-xs hover:bg-slate-200 transition-all shadow-xl shadow-white/5 flex items-center gap-2 group-hover:bg-indigo-500 group-hover:text-white"
                                        >
                                            Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />

            <ApplyModal
                show={showModal}
                onClose={() => setShowModal(false)}
                job={selectedJob}
            />
        </div>
    );
}
