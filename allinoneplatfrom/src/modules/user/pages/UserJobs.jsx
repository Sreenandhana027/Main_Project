import { useEffect, useState } from "react";
import {
    FileText, Mail, MapPin, Link2, User,
    Download, ArrowRight, Briefcase, Clock, DollarSign, CheckCircle, XCircle
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getMyApplicationsAPI } from "../../../services/AllAPI";
import { serverURL } from "../../../services/serverURL";

export default function MyApplication() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    setError("Session expired. Please login again.");
                    setLoading(false);
                    return;
                }
                const reqHeader = { Authorization: `Bearer ${token}` };
                const res = await getMyApplicationsAPI(reqHeader);
                if (res.status === 200 && res.data.success) {
                    setApplications(Array.isArray(res.data.data) ? res.data.data : []);
                } else {
                    setError("Failed to load applications.");
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong while loading applications.");
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "selected":
                return "bg-emerald-100 text-emerald-700 font-bold border-emerald-200 outline-emerald-500/20";
            case "rejected":
                return "bg-rose-100 text-rose-700 font-bold border-rose-200 outline-rose-500/20";
            default:
                return "bg-blue-50 text-blue-700 font-medium border-blue-100";
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toLowerCase()) {
            case "selected": return "Selected";
            case "rejected": return "Rejected";
            default: return "Application Sent";
        }
    };

    const steps = ["Applied", "Result"];

    const getStepReached = (status) => {
        switch (status?.toLowerCase()) {
            case "selected":
            case "rejected": 
                return 3;
            default: 
                return 1;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center gap-3 text-gray-500">
                    <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                    <span>Loading your applications...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white border border-red-200 rounded-2xl px-8 py-10 text-center max-w-md">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 text-xl">!</span>
                    </div>
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white border border-gray-200 rounded-2xl px-8 py-14 text-center max-w-md">
                    <Briefcase size={40} className="mx-auto mb-4 text-gray-300" strokeWidth={1.5} />
                    <p className="text-gray-800 font-medium text-lg">No applications yet</p>
                    <p className="text-gray-500 text-sm mt-2">Start applying to jobs to track them here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-bg pb-20">

            {/* Top Bar - Glassmorphic */}
            <header className="glass-header px-6 py-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Briefcase size={20} className="text-white" />
                    </div>
                    <span className="text-brand-dark text-xl font-bold tracking-tight">CareerCraft<span className="text-brand-primary">Pro</span></span>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-brand-primary/5 rounded-full border border-brand-primary/10">
                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                    <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">Candidate Portal</span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6">

                {/* Header + Filter */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-reveal">
                    <div>
                        <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">My Applications</h1>
                        <p className="text-slate-500 mt-1 font-medium">
                            Tracking <span className="text-brand-primary font-bold">{applications.length}</span> active opportunities
                        </p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {applications.map((app, index) => {
                        const stepReached = getStepReached(app.status);
                        return (
                            <div
                                key={app._id}
                                className="premium-card overflow-hidden animate-reveal"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card Header */}
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex gap-5 items-start">
                                            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/10 transition-transform group-hover:scale-110">
                                                <Briefcase size={26} className="text-brand-primary" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-brand-dark text-xl leading-tight">
                                                    {app.jobId?.title || "Job Title"}
                                                </h3>
                                                <p className="text-brand-primary font-semibold text-sm mt-1">
                                                    {app.jobId?.companyName || "Company"}
                                                </p>
                                                <div className="flex flex-wrap gap-y-2 gap-x-5 mt-4">
                                                    <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                                        <MapPin size={14} className="text-brand-primary/60" /> {app.location || "Remote"}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                                        <Clock size={14} className="text-brand-primary/60" />
                                                        {app.createdAt
                                                            ? `${new Date(app.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}`
                                                            : "Recent"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${getStatusStyle(app.status).replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                                                {getStatusLabel(app.status)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Timeline */}
                                    <div className="mt-8 pt-8 border-t border-slate-100">
                                        <div className="relative flex justify-between items-center max-w-sm mx-auto md:mx-0">
                                            {/* Connecting Line */}
                                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2">
                                                <div 
                                                    className="h-full bg-brand-primary transition-all duration-1000 ease-out" 
                                                    style={{ width: `${(stepReached - 1) * 50}%` }}
                                                ></div>
                                            </div>

                                            {steps.map((step, i) => {
                                                const isReached = i < stepReached;
                                                const isLast = i === steps.length - 1;
                                                const isRejected = app.status?.toLowerCase() === "rejected" && isLast;
                                                const isSelected = app.status?.toLowerCase() === "selected" && isLast;

                                                return (
                                                    <div key={step} className="relative z-10 flex flex-col items-center">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-4 shadow-sm ${
                                                            isSelected ? "bg-emerald-600 border-emerald-100" :
                                                            isRejected ? "bg-rose-600 border-rose-100" :
                                                            isReached ? "bg-brand-primary border-brand-primary/20" : "bg-white border-slate-100"
                                                        }`}>
                                                            {isRejected ? <XCircle size={14} className="text-white" /> :
                                                             isReached ? (
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                            ) : (
                                                                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                                            )}
                                                        </div>
                                                        <p className={`text-[10px] font-bold uppercase tracking-tighter mt-2 ${
                                                            isSelected ? "text-emerald-700" :
                                                            isRejected ? "text-rose-700" :
                                                            isReached ? "text-brand-primary" : "text-slate-300"
                                                        }`}>
                                                            {step === "Result" ? (isRejected ? "Rejected" : isSelected ? "Selected" : "Result") : step}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Action Bar */}
                                <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex gap-2">
                                        {app.jobId?.type && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                                                {app.jobId.type}
                                            </span>
                                        )}
                                        {app.jobId?.salary && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-lg border border-brand-primary/10">
                                                {app.jobId.salary}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6">
                                        {app.resume && (
                                            <a
                                                href={`${serverURL}/uploads/resumes/${app.resume}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-bold text-slate-600 flex items-center gap-2 hover:text-brand-primary transition-colors"
                                            >
                                                <FileText size={16} strokeWidth={2.5} /> CV/Resume
                                            </a>
                                        )}
                                        {app.portfolio && (
                                            <a
                                                href={app.portfolio}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-bold text-slate-600 flex items-center gap-2 hover:text-brand-primary transition-colors"
                                            >
                                                <Link2 size={16} strokeWidth={2.5} /> Portfolio
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}