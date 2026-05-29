import {
  Search,
  MapPin,
  ChevronDown,
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";
export default function JobHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white border-b border-gray-200">
        {/* Subtle decorative blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-cyan-100/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2.5 bg-teal-50 text-teal-800 px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-teal-100">
            <Briefcase size={18} className="text-teal-600" />
            5,000+ Active Opportunities
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Find your next{" "}
            <span className="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              great role
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join <strong className="text-gray-900">2M+</strong> professionals building brighter careers
            with better opportunities and higher salaries.
          </p>

          {/* SEARCH CARD */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-100/70 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* You can uncomment when you want to activate inputs */}
                {/*
                <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-5 py-4 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-200 transition">
                  <Search className="text-gray-500" size={20} />
                  <input
                    placeholder="Job title, skills or company"
                    className="w-full outline-none text-gray-900 placeholder-gray-500 text-base"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-2xl px-5 py-4 cursor-pointer hover:border-teal-500 transition">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase size={20} />
                    <span className="text-base">All Categories</span>
                  </div>
                  <ChevronDown size={20} />
                </div>

                <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-5 py-4 focus-within:border-teal-500 transition">
                  <MapPin className="text-gray-500" size={20} />
                  <input
                    placeholder="Location or Remote"
                    className="w-full outline-none text-gray-900 placeholder-gray-500 text-base"
                  />
                </div>
                <div classname="flex d-flex text-gray"></div>
                */}
              </div>

              <button
                onClick={() => navigate("/jobs")}
                className="mt-6 w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-5 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-teal-200/30 hover:shadow-teal-300/40 hover:scale-[1.015]"
              >
                Explore All Vacancies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Popular Categories
          </h2>
          <button className="text-teal-600 font-medium hover:text-teal-700 transition flex items-center gap-2 underline-offset-4 hover:underline">
            View All Categories
            <ChevronDown size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {[
            { name: "Engineering", icon: <CiSettings size={52} color="blue"/> },
            { name: "Design", icon: <IoColorPaletteOutline  size={52} color="pink"/> },
            { name: "Marketing", icon: <BsGraphUpArrow  size={52} color="red"/> },
            { name: "Finance", icon: <FaMoneyBill1Wave size={52} color="green"/> },
          ].map((cat) => (
            <div
              key={cat.name}
              className="group bg-white border border-gray-200 rounded-2xl p-8 text-center transition-all hover:border-teal-500 hover:shadow-xl hover:shadow-teal-100/60"
            >
              <div className="text-5xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-600">1,200+ openings</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-200 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-5 text-white">
              PrepVault
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Connecting exceptional talent with forward-thinking companies across India and beyond.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-teal-300 transition cursor-pointer">About Us</li>
              <li className="hover:text-teal-300 transition cursor-pointer">Careers</li>
              <li className="hover:text-teal-300 transition cursor-pointer">Blog</li>
              <li className="hover:text-teal-300 transition cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">For Job Seekers</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-teal-300 transition cursor-pointer">Find Jobs</li>
              <li className="hover:text-teal-300 transition cursor-pointer">Saved Jobs</li>
              <li className="hover:text-teal-300 transition cursor-pointer">My Applications</li>
              <li className="hover:text-teal-300 transition cursor-pointer">Profile & Resume</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Follow Us</h4>
            <div className="flex gap-6">
              <Facebook className="w-7 h-7 text-gray-400 hover:text-teal-300 transition cursor-pointer" />
              <Twitter className="w-7 h-7 text-gray-400 hover:text-teal-300 transition cursor-pointer" />
              <Linkedin className="w-7 h-7 text-gray-400 hover:text-teal-300 transition cursor-pointer" />
              <Instagram className="w-7 h-7 text-gray-400 hover:text-teal-300 transition cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          <MdCopyright />
 {new Date().getFullYear()} PrepVault — Made with passion in Kerala
        </div>
      </footer>

    </div>
  );
}