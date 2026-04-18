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

    const steps = ["Applied", "In Process", "Result"];

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
        <div className="min-h-screen bg-gray-100">

            {/* Top Bar */}
            <div className="bg-[#1a3c6e] px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Briefcase size={18} className="text-white" />
                </div>
                <span className="text-white text-lg font-medium">PrepVault</span>
                <span className="text-blue-300 text-sm ml-auto">My Applications</span>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">

                {/* Header + Filter */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-xl font-semibold text-gray-900">My applied jobs</p>
                        <p className="text-sm text-gray-500 mt-0.5">{applications.length} application{applications.length !== 1 ? "s" : ""} found</p>
                    </div>
                    {/* <div className="flex gap-2">
                        {["All", "Active", "Closed"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-xs px-4 py-1.5 rounded-full border transition ${
                                    filter === f
                                        ? "bg-blue-100 text-blue-800 border-blue-200 font-medium"
                                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div> */}
                </div>

                {/* Application Cards */}
                <div className="space-y-4">
                    {applications.map((app) => {
                        const stepReached = getStepReached(app.status);
                        return (
                            <div
                                key={app._id}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                                <Briefcase size={22} className="text-blue-700" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-base">
                                                    {app.jobId?.title || "Job Title"}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {app.jobId?.companyName || "Company"}
                                                </p>
                                                <div className="flex flex-wrap gap-4 mt-2.5">
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <MapPin size={12} /> {app.location || "Location not specified"}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock size={12} />
                                                        {app.createdAt
                                                            ? `Applied ${new Date(app.createdAt).toLocaleDateString("en-IN")}`
                                                            : "Recently applied"}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Mail size={12} /> {app.usermail}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(app.status)}`}>
                                                {getStatusLabel(app.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Tracker */}
                                <div className="bg-gray-50/50 px-6 py-5 flex items-center justify-between border-b border-gray-100 relative">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 -mt-2"></div>
                                    {steps.map((step, i) => {
                                        const isReached = i < stepReached;
                                        const isLast = i === steps.length - 1;
                                        const isRejected = app.status?.toLowerCase() === "rejected" && isLast;
                                        const isSelected = app.status?.toLowerCase() === "selected" && isLast;

                                        return (
                                            <div key={step} className="relative z-10 flex flex-col items-center flex-1">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${isSelected ? "bg-emerald-600 border-emerald-100" :
                                                        isRejected ? "bg-rose-600 border-rose-100" :
                                                            isReached ? "bg-blue-700 border-blue-100" : "bg-white border-gray-200"
                                                    }`}>
                                                    {isRejected ? <XCircle size={14} className="text-white" /> :
                                                        isReached ? (
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        ) : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                                                </div>
                                                <p className={`text-[10px] font-bold uppercase tracking-tight mt-2 ${isSelected ? "text-emerald-700" :
                                                        isRejected ? "text-rose-700" :
                                                            isReached ? "text-blue-700" : "text-gray-400"
                                                    }`}>
                                                    {step === "Result" ? (isRejected ? "Rejected" : isSelected ? "Selected" : "Result") : step}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Card Footer */}
                                <div className="px-5 py-3 flex items-center justify-between">
                                    <div className="flex gap-2 flex-wrap">
                                        {app.jobId?.type && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                                                {app.jobId.type}
                                            </span>
                                        )}
                                        {app.jobId?.experience && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                                                {app.jobId.experience} exp
                                            </span>
                                        )}
                                        {app.jobId?.salary && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                                                {app.jobId.salary}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {app.resume && (
                                            <a
                                                href={`${serverURL}/uploads/resumes/${app.resume}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs text-blue-700 font-medium flex items-center gap-1 hover:underline"
                                            >
                                                <FileText size={13} /> View resume
                                            </a>
                                        )}
                                        {app.portfolio && (
                                            <a
                                                href={app.portfolio}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs text-blue-700 flex items-center gap-1 hover:underline"
                                            >
                                                <Link2 size={13} /> Portfolio
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