import { useEffect, useState } from "react";
import { Bell, Plus, Trash2, ArrowRight, Users, Briefcase, MapPin, Clock, BriefcaseBusiness, Building2, DollarSign, Award, AlignLeft, X, Sparkles } from "lucide-react";
import { addJobAPI, deleteJobAPI, getCompanyApplicantsAPI, getCompanyJobsAPI, updateApplicationStatusAPI } from "../../../services/AllAPI";
import { serverURL } from "../../../services/serverURL";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { successToast, errorToast } from "../../../toastHelper";

export default function CompanyDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, jobId: null });
  const [selectedJobFilter, setSelectedJobFilter] = useState("all"); // NEW
  const token = localStorage.getItem("companyToken");

  const reqHeader = {
    Authorization: `Bearer ${token}`
  };

  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    salary: "",
    experience: "",
    type: "",
    description: "",
    companyName: ""
  });

  const fetchJobs = async () => {
    try {
      const res = await getCompanyJobsAPI(reqHeader);
      if (res.status === 200) {
        setJobs(res.data);
        console.log("fetched jobs", res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewApplicants = async () => {
    try {
      const res = await getCompanyApplicantsAPI(reqHeader);
      if (res.status === 200 && res.data.success) {
        setApplicants(res.data.data);
        setShowApplicants(true);
        setSelectedJobFilter("all"); // reset filter on fresh load
      }
    } catch (err) {
      console.log(err);
      setApplicants([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async () => {
    for (const key in jobData) {
      if (!jobData[key]) {
        errorToast(`Please fill ${key}`);
        return;
      }
    }
    try {
      const res = await addJobAPI(jobData, reqHeader);
      if (res.status === 200) {
        successToast(res.data.message || "Job added successfully!");
        fetchJobs();
        setShowForm(false);
        setJobData({
          title: "",
          department: "",
          location: "",
          salary: "",
          experience: "",
          type: "",
          description: ""
        });
      }
    } catch (err) {
      if (err.response) {
        console.log("Backend error:", err.response.data);
        errorToast(err.response.data.message || "Failed to add job");
      } else {
        console.log("Network error:", err.message);
        errorToast("Network error. Please try again.");
      }
    }
  };

  const handleDeleteJob = async () => {
    const id = deleteModal.jobId;
    setDeleteModal({ show: false, jobId: null });
    try {
      const res = await deleteJobAPI(id, reqHeader);
      if (res.status === 200 || res.status === 204) {
        successToast("Job deleted successfully!");
        fetchJobs();
      } else {
        errorToast("Failed to delete job. Please try again.");
        console.log("Delete response:", res);
      }
    } catch (err) {
      if (err.response) {
        console.log("Backend error:", err.response.data);
        errorToast(`Error: ${err.response.data.message || "Failed to delete job"}`);
      } else {
        console.log("Network error:", err.message);
        errorToast("Network error. Please try again.");
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await updateApplicationStatusAPI(id, { status }, reqHeader);
      console.log(res);
      if (res.status === 200) {
        handleViewApplicants();
        setSelectedApplicant(null); // close modal after update
      }
    } catch (err) {
      console.log(err);
    }
  };

  // NEW: get unique jobs from applicants for filter tabs
  const uniqueJobsFromApplicants = [
    ...new Map(
      applicants
        .filter(a => a.jobId)
        .map(a => [a.jobId._id, a.jobId])
    ).values()
  ];

  // NEW: filtered applicants based on selected tab
  const filteredApplicants = selectedJobFilter === "all"
    ? applicants
    : applicants.filter(a => a.jobId?._id === selectedJobFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pb-20">

      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              PV
            </div>
            <span className="text-xl font-semibold text-gray-900">PrepVault</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative transition-transform hover:scale-110 active:scale-95">
              <FaUserCircle className="w-8 h-8 text-gray-700 hover:text-teal-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner with Overlay */}
      <div
        className="relative h-[340px] md:h-[420px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-gray-900/70 via-gray-900/60 to-gray-900/50"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            PrepVault
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-3xl mb-8 drop-shadow-md">
            Connecting exceptional talent with forward-thinking companies
          </p>
          <div className="flex flex-wrap justify-center gap-5 md:gap-8">
            <div className="flex items-center gap-3 bg-white/25 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-sm">
              <BriefcaseBusiness size={22} className="text-teal-300" />
              <span className="font-medium">Post Jobs • Discover Talent</span>
            </div>
            <div className="flex items-center gap-3 bg-white/25 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-sm">
              <Users size={22} className="text-teal-300" />
              <span className="font-medium">Manage Applications Effortlessly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-20 md:-mt-24 relative z-20">

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-xl transition transform hover:scale-[1.03] active:scale-100 text-lg shadow-teal-200/30"
          >
            <Plus size={24} /> Add Job Vacancy
          </button>
          <button
            onClick={handleViewApplicants}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-5 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-xl transition transform hover:scale-[1.03] active:scale-100 text-lg shadow-cyan-200/30"
          >
            <Users size={24} /> View All Applications
          </button>
        </div>

        {/* Active Postings */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Jobs <span className="text-gray-600 font-medium">({jobs.length})</span>
            </h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 transition">
              See all <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition">
                    {job.title}
                  </h3>
                  <button
                    onClick={() => setDeleteModal({ show: true, jobId: job._id })}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-2.5 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" /> {job.location || "Trivandrum"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" /> {job.type || "Full Time"}
                  </div>
                  <div className="font-semibold text-teal-600">
                    {job.salary || "5 LPA - 8 LPA"}
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {job.description || "Looking for a talented developer to build high-quality..."}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={16} className="text-gray-500" />
                  +{(job.title?.length % 20) + 1 || 12} applicants
                </div>

                <button className="mt-5 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1.5 text-sm transition">
                  Manage <ArrowRight size={16} />
                </button>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-600">
                <Briefcase size={48} className="mx-auto mb-4 opacity-60" strokeWidth={1.5} />
                <p className="text-xl font-medium">No active job postings yet</p>
                <p className="mt-2">Add your first vacancy to start recruiting</p>
              </div>
            )}
          </div>
        </div>

        {/* ── APPLICANTS SECTION WITH FILTER ── */}
        {showApplicants && (
          <div className="mb-16">

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Applications{" "}
                <span className="text-gray-600 font-medium">({filteredApplicants.length})</span>
              </h2>
              <button
                onClick={() => setShowApplicants(false)}
                className="text-gray-400 hover:text-gray-600 transition text-sm font-medium"
              >
                ✕ Close
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {/* All tab */}
              <button
                onClick={() => setSelectedJobFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${selectedJobFilter === "all"
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-300 hover:border-teal-400 hover:text-teal-600"
                  }`}
              >
                All
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${selectedJobFilter === "all"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
                  }`}>
                  {applicants.length}
                </span>
              </button>

              {/* One tab per unique job */}
              {uniqueJobsFromApplicants.map((job) => {
                const count = applicants.filter(a => a.jobId?._id === job._id).length;
                const isActive = selectedJobFilter === job._id;
                return (
                  <button
                    key={job._id}
                    onClick={() => setSelectedJobFilter(job._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${isActive
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:border-teal-400 hover:text-teal-600"
                      }`}
                  >
                    {job.title}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Applicant Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplicants.map((application) => (
                <div
                  key={application._id}
                  onClick={() => setSelectedApplicant(application)}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-lg hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0">
                      {application.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-teal-700 transition">
                        {application.name}
                      </h3>
                      <p className="text-xs text-gray-500">{application.usermail}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-gray-400" />
                      <span>{application.jobId?.title || "N/A"}</span>
                    </div>
                    {application.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{application.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.status === "Selected"
                      ? "bg-green-100 text-green-700"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                      {application.status}
                    </span>
                    <span className="text-teal-600 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              ))}

              {filteredApplicants.length === 0 && (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <Users size={44} className="mx-auto mb-3 opacity-50" strokeWidth={1.5} />
                  <p className="text-lg font-medium">No applications found</p>
                  <p className="text-sm mt-1">No one has applied for this position yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Job Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4 pt-20 animate-in fade-in duration-300">

            {/* Modal */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl 
    w-full max-w-2xl max-h-[86vh] flex flex-col overflow-hidden">

              {/* Header */}
              <div className="relative h-24 bg-sky-50 border-b border-sky-100 shrink-0">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, #0ea5e9 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-center px-8">
                  <div className="flex items-center gap-2 text-sky-600 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                    <Sparkles size={12} /> New Vacancy
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Post a Job
                  </h2>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content Wrapper */}
              <div className="flex flex-col justify-between flex-1 p-6 overflow-y-auto">

                {/* FORM */}
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(jobData).map((field) => {
                      const icons = {
                        title: <Briefcase size={14} />,
                        department: <Building2 size={14} />,
                        location: <MapPin size={14} />,
                        salary: <DollarSign size={14} />,
                        experience: <Award size={14} />,
                        type: <Clock size={14} />,
                        companyName: <BriefcaseBusiness size={14} />,
                      };

                      if (field === "description") return null;

                      return (
                        <div key={field} className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                          </label>

                          <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500">
                              {icons[field]}
                            </div>

                            <input
                              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-3 py-2.5 rounded-xl outline-none transition-all focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 text-xs"
                              value={jobData[field]}
                              onChange={(e) =>
                                setJobData({ ...jobData, [field]: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Description */}
                  <div className="mt-5 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                      About the Role
                    </label>

                    <div className="relative group">
                      <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-sky-500">
                        <AlignLeft size={16} />
                      </div>

                      <textarea
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-11 pr-4 py-3 rounded-xl outline-none transition-all focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 text-sm resize-none"
                        value={jobData.description}
                        onChange={(e) =>
                          setJobData({ ...jobData, description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* BUTTONS (always bottom aligned) */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleAddJob}
                    className="flex-1 bg-sky-600 text-white py-3.5 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={18} />
                    Publish Job
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 bg-slate-100 text-slate-500 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[520px] max-w-full p-8 relative">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Applicant Details
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <p><span className="font-semibold">Name:</span> {selectedApplicant.name}</p>
                <p><span className="font-semibold">Email:</span> {selectedApplicant.usermail}</p>
                <p><span className="font-semibold">Location:</span> {selectedApplicant.location}</p>
                <p><span className="font-semibold">Job Applied:</span> {selectedApplicant.jobId?.title}</p>
                <p>
                  <span className="font-semibold">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${selectedApplicant.status === "Selected"
                    ? "bg-green-100 text-green-700"
                    : selectedApplicant.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                    }`}>
                    {selectedApplicant.status}
                  </span>
                </p>
                {selectedApplicant.portfolio && (
                  <p>
                    <span className="font-semibold">Portfolio:</span>
                    <a href={selectedApplicant.portfolio} target="_blank" className="ml-2 text-blue-600 hover:underline">
                      View Portfolio
                    </a>
                  </p>
                )}
                {selectedApplicant.resume && (
                  <p>
                    <span className="font-semibold">Resume:</span>
                    <a                                                                             // ✅ add <a here
                      href={`${serverURL}/uploads/resumes/${selectedApplicant.resume}`}
                      target="_blank"
                      className="ml-2 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => updateStatus(selectedApplicant._id, "Rejected")}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant._id, "Selected")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 size={18} className="text-red-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delete job posting?</p>
                  <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3 mb-6">
                All applicant data linked to this job will be permanently removed from your dashboard.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, jobId: null })}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteJob}
                  className="flex-1 py-2.5 rounded-xl bg-red-700 text-red-100 hover:bg-red-800 transition text-sm font-medium"
                >
                  Delete job
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}