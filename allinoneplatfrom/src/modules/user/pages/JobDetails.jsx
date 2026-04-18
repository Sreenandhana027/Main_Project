import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowLeft, 
  Building2, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  Send
} from "lucide-react";
import { getSingleJobAPI } from "../../../services/AllAPI";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    const fetchJob = async () => {
        try {
            const res = await getSingleJobAPI(id);
            if (res.status === 200) {
                setJob(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg font-medium text-slate-600">Loading career opportunity...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* Header / Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-all group"
                >
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    BACK TO EXPLORE
                </motion.button>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-3 gap-10">
                
                {/* LEFT COLUMN: Main Job Info */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-500/5 relative overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/10">
                                            {job.type}
                                        </span>
                                        <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                            <Calendar size={12} />
                                            Posted recently
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                        {job.title}
                                    </h1>
                                    <p className="text-xl text-slate-500 mt-2 font-medium flex items-center gap-2">
                                        <Building2 size={20} className="text-indigo-400" />
                                        {job.department}
                                    </p>
                                </div>
                                
                                {/* <div className="hidden md:block w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-3 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
                                    <Briefcase size={36} className="text-white" />
                                </div> */}
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Role Description</h2>
                                    </div>
                                    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                                            {job.description}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Sidebar Info */}
                <div className="lg:col-span-1">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl sticky top-24 overflow-hidden"
                    >
                        {/* Mesh decoration for the dark card */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-[80px]"></div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-8 tracking-tight">Job Insights</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                                        <p className="font-bold text-sm tracking-tight">{job.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-300">
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compensation</p>
                                        <p className="font-bold text-sm tracking-tight">{job.salary}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-300">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                                        <p className="font-bold text-sm tracking-tight">{job.experience || "Entry Level"}</p>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/apply/${job._id}`)}
                                className="w-full mt-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
                            >
                                Apply Now
                                <ChevronRight size={18} />
                            </motion.button>
                            
                            <p className="text-center mt-6 text-slate-500 text-xs font-bold flex items-center justify-center gap-2">
                                <Send size={12} />
                                Responds within 48 hours
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default JobDetails;