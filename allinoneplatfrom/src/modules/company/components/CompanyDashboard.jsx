import { useEffect, useState } from "react";
import { Bell, Plus, Trash2, ArrowRight, Users, Briefcase, MapPin, Clock, BriefcaseBusiness, Building2, DollarSign, Award, AlignLeft, X, Sparkles } from "lucide-react";
import { addJobAPI, deleteJobAPI, getCompanyApplicantsAPI, getCompanyJobsAPI, updateApplicationStatusAPI, GetCompanyProfileAPI } from "../../../services/AllAPI";
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
  
  const companyDataStr = localStorage.getItem("company");
  const fallbackCompany = companyDataStr ? JSON.parse(companyDataStr) : null;
  const [companyProfile, setCompanyProfile] = useState(fallbackCompany);
  const companyName = companyProfile?.companyName || companyProfile?.name || "Company Portal";

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

  const fetchApplicants = async () => {
    try {
      const res = await getCompanyApplicantsAPI(reqHeader);
      if (res.status === 200 && res.data.success) {
        setApplicants(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setApplicants([]);
    }
  };

  const handleViewApplicants = () => {
    fetchApplicants();
    setShowApplicants(true);
    setSelectedJobFilter("all"); // reset filter on fresh load
  };

  const fetchCompanyProfile = async () => {
    try {
      const res = await GetCompanyProfileAPI(reqHeader);
      if (res.status === 200 && res.data.success) {
        setCompanyProfile(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching company profile", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicants();
    fetchCompanyProfile();
  }, []);

  const handleAddJob = async () => {
    const dataToSend = { ...jobData, companyName: companyName };

    for (const key in dataToSend) {
      if (!dataToSend[key]) {
        errorToast(`Please fill ${key}`);
        return;
      }
    }
    try {
      const res = await addJobAPI(dataToSend, reqHeader);
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
          description: "",
          companyName: ""
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
        fetchApplicants();
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
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      
      {/* Formal Left Sidebar */}
      <div className="w-64 bg-slate-900 flex flex-col shrink-0 shadow-xl z-20">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm mr-3">
            {companyName.charAt(0).toUpperCase()}
          </div>
          <span className="text-lg font-bold text-white tracking-tight">PrepVault</span>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 mt-2 px-2">Dashboard Menu</div>
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => { setShowForm(false); setShowApplicants(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${!showForm && !showApplicants ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <Briefcase size={18} /> Active Jobs
              {jobs.length > 0 && <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${!showForm && !showApplicants ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>{jobs.length}</span>}
            </button>
            
            <button
              onClick={() => { setShowForm(false); handleViewApplicants(); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${showApplicants && !showForm ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <Users size={18} /> Applications
            </button>
          </nav>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={() => { setShowApplicants(false); setShowForm(true); }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors border border-slate-700 shadow-sm"
          >
            <Plus size={18} /> Post New Job
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {showForm ? "Post a New Job" : showApplicants ? "Candidate Applications" : "Active Job Postings"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700 text-sm font-bold shadow-sm">
              <Building2 size={16} className="text-blue-600" />
              Welcome, {companyName}
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <FaUserCircle className="w-8 h-8" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">

            {/* === ACTIVE JOBS VIEW === */}
            {!showForm && !showApplicants && (
              <div className="animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <div key={job._id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                          {job.title}
                        </h3>
                        <button
                          onClick={() => setDeleteModal({ show: true, jobId: job._id })}
                          className="text-slate-400 hover:text-red-600 transition p-1 bg-slate-50 rounded border border-slate-100"
                          title="Delete Job"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" /> <span className="font-medium text-slate-700">{job.location || "Remote"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" /> <span className="font-medium text-slate-700">{job.type || "Full Time"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <DollarSign size={16} className="text-slate-400" /> <span className="font-bold text-slate-900">{job.salary || "Competitive"}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        {(() => {
                          const appCount = applicants.filter(a => a.jobId?._id === job._id).length;
                          return (
                            <>
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <Users size={16} />
                                {appCount} {appCount === 1 ? 'Application' : 'Applications'}
                              </div>
                              {appCount > 0 ? (
                                <button 
                                  onClick={() => { 
                                    setShowForm(false); 
                                    handleViewApplicants(); 
                                    setTimeout(() => setSelectedJobFilter(job._id), 50); 
                                  }} 
                                  className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1 transition-colors"
                                >
                                  View <ArrowRight size={14} />
                                </button>
                              ) : (
                                <span className="text-slate-300 font-semibold text-sm">
                                  Waiting...
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  ))}

                  {jobs.length === 0 && (
                    <div className="col-span-full bg-white border-2 border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-500">
                      <Briefcase size={48} className="mx-auto mb-4 text-slate-300" strokeWidth={1.5} />
                      <p className="text-xl font-bold text-slate-800">No active job postings</p>
                      <p className="text-sm mt-2 mb-6 text-slate-500">You haven't posted any jobs yet. Create a vacancy to start recruiting.</p>
                      <button onClick={() => { setShowApplicants(false); setShowForm(true); }} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                        <Plus size={18} /> Post Your First Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === APPLICATIONS VIEW === */}
            {showApplicants && !showForm && (
              <div className="animate-in fade-in duration-300">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setSelectedJobFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${selectedJobFilter === "all"
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    All Applications ({applicants.length})
                  </button>

                  {uniqueJobsFromApplicants.map((job) => {
                    const count = applicants.filter(a => a.jobId?._id === job._id).length;
                    return (
                      <button
                        key={job._id}
                        onClick={() => setSelectedJobFilter(job._id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border flex items-center gap-2 ${selectedJobFilter === job._id
                          ? "bg-slate-800 text-white border-slate-800"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        {job.title} <span className={`px-2 py-0.5 rounded-full text-xs ${selectedJobFilter === job._id ? "bg-slate-600 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredApplicants.map((application) => (
                    <div
                      key={application._id}
                      onClick={() => setSelectedApplicant(application)}
                      className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xl shrink-0 border border-slate-200">
                          {application.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {application.name}
                          </h3>
                          <p className="text-xs font-medium text-slate-500 truncate">{application.usermail}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={14} className="text-slate-400" />
                          <span className="font-semibold text-slate-700 truncate">{application.jobId?.title || "N/A"}</span>
                        </div>
                        {application.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-slate-400" />
                            <span className="text-slate-600 truncate">{application.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${application.status === "Selected"
                          ? "bg-emerald-100 text-emerald-800"
                          : application.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                          }`}>
                          {application.status || "Pending"}
                        </span>
                        <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Review <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  ))}

                  {filteredApplicants.length === 0 && (
                    <div className="col-span-full bg-white border-2 border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-500">
                      <Users size={48} className="mx-auto mb-4 text-slate-300" strokeWidth={1.5} />
                      <p className="text-xl font-bold text-slate-800">No applications found</p>
                      <p className="text-sm mt-2 text-slate-500">Candidates who apply for this job will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === POST NEW JOB VIEW === */}
            {showForm && (
              <div className="animate-in fade-in duration-300 max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h1 className="text-2xl font-bold text-slate-900">Job Details</h1>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Cancel"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(jobData).map((field) => {
                    const icons = {
                      title: <Briefcase size={16} />,
                      department: <Building2 size={16} />,
                      location: <MapPin size={16} />,
                      salary: <DollarSign size={16} />,
                      experience: <Award size={16} />,
                      type: <Clock size={16} />,
                      companyName: <BriefcaseBusiness size={16} />,
                    };

                    if (field === "description" || field === "companyName") return null;

                    return (
                      <div key={field} className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </label>

                        <div className="relative group">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            {icons[field]}
                          </div>

                          <input
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none transition-colors focus:border-blue-600 focus:bg-white text-sm"
                            value={jobData[field]}
                            onChange={(e) => setJobData({ ...jobData, [field]: e.target.value })}
                            placeholder={`Enter ${field}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    About the Role
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <AlignLeft size={16} />
                    </div>
                    <textarea
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-4 py-3 rounded-lg outline-none transition-colors focus:border-blue-600 focus:bg-white text-sm resize-none"
                      value={jobData.description}
                      onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                      placeholder="Describe the responsibilities, requirements, and benefits..."
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={handleAddJob}
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Publish Job
                  </button>
                  <button
                    onClick={() => {
                      setJobData({ title: "", department: "", location: "", salary: "", experience: "", type: "", description: "", companyName: "" });
                      setShowForm(false);
                    }}
                    className="px-6 py-2.5 rounded-lg font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-[520px] max-w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-50 p-6 relative border-b border-slate-200">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-3xl shrink-0 shadow-sm">
                  {selectedApplicant.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedApplicant.name}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">{selectedApplicant.usermail}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="font-semibold text-slate-800">{selectedApplicant.location || "Not Provided"}</p>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className={`font-bold ${selectedApplicant.status === "Selected" ? "text-emerald-600" : selectedApplicant.status === "Rejected" ? "text-red-600" : "text-amber-600"}`}>
                    {selectedApplicant.status || "Pending Review"}
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 p-3 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Applied For</p>
                <p className="font-bold text-slate-900">{selectedApplicant.jobId?.title}</p>
              </div>

              <div className="flex gap-3 pt-2">
                {selectedApplicant.portfolio && (
                  <a href={selectedApplicant.portfolio} target="_blank" className="flex-1 bg-white border border-slate-300 text-slate-700 font-semibold py-2 rounded-lg text-center hover:bg-slate-50 transition-colors">
                    View Portfolio
                  </a>
                )}
                {selectedApplicant.resume && (
                  <a                                                                             
                    href={`${serverURL}/uploads/resumes/${selectedApplicant.resume}`}
                    target="_blank"
                    className="flex-1 bg-blue-50 border border-blue-200 text-blue-700 font-semibold py-2 rounded-lg text-center hover:bg-blue-100 transition-colors"
                  >
                    Download Resume
                  </a>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => updateStatus(selectedApplicant._id, "Rejected")}
                className="px-5 py-2 bg-white border border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(selectedApplicant._id, "Selected")}
                className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Job Posting?</h3>
              <p className="text-slate-500 text-sm mt-1">This will permanently remove the job and all associated applicant data.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, jobId: null })}
                className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJob}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}