import {
  Bell,
  Bookmark,
  Home,
  Plus,
  Briefcase,
  User,
  Search,
  MapPin,
} from "lucide-react";
import { useContext } from "react";
import { searchContext } from "../../../context/SearchContextShare";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobsAPI } from "../../../services/AllAPI";
import CompanyHeader from "../pages/CompanyHeader";

export default function CompanyVacancies() {
  const { searchKey, setSearchKey, locationKey, setLocationKey } =
    useContext(searchContext);

  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("userToken");

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const fetchJobs = async () => {
    try {
      const res = await getAllJobsAPI(reqHeader);
      if (res.status === 200) {
        setJobs(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchKey.toLowerCase()) &&
      job.location.toLowerCase().includes(locationKey.toLowerCase())
    );
  });

  return (

    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 text-gray-900">

      {/* ─── Header ──────────────────────────────────────────────── */}
      <CompanyHeader />

      {/* ─── Hero + Search ───────────────────────────────────────── */}
      <div className="relative pt-16 pb-24 md:pb-32 px-5 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Find Your <span className="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Next Role</span>
          </h2>

          <p className="mt-5 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Discover positions that match your skills and ambitions
          </p>

          {/* Clean search bar */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Job title / keyword */}
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Job title, skills, company..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200"
                  />
                </div>

                {/* Location */}
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    value={locationKey}
                    onChange={(e) => setLocationKey(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Job Cards ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 md:mb-14 text-gray-900">
          Available Positions
        </h3>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <Briefcase className="w-20 h-20 mx-auto mb-6 opacity-50" strokeWidth={1.2} />
            <p className="text-2xl font-medium mb-3">No matching jobs found</p>
            <p className="text-lg">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition line-clamp-2">
                  {job.title}
                </h4>

                <div className="mt-2 flex items-center gap-2 text-gray-500 text-sm">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="font-medium text-gray-700">
                    {job.companyName || "Unknown Company"}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-600 text-sm">
                  <Briefcase size={16} className="text-teal-600/80" />
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-5">
                  <span className="px-3.5 py-1 bg-teal-50 text-teal-700 text-xs md:text-sm font-medium rounded-full border border-teal-100">
                    {job.salary}
                  </span>
                  <span className="px-3.5 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-full border border-gray-200">
                    {job.type}
                  </span>
                </div>

                <Link to={`/jobdetails/${job._id}`}>
                  <button className="mt-7 w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                    View & Apply →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}