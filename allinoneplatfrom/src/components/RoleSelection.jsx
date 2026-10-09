import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, ArrowRight, Sparkles } from "lucide-react";

function RoleSelection() {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f4fd] via-[#f0e8fd] to-[#fde8f0] font-sans selection:bg-indigo-500/30">
      
      {/* Decorative blobs matching Auth.jsx */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[60px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[50px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl w-full">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">Welcome to PrepVault</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Choose Your Journey
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mb-12 leading-relaxed">
          Select how you want to use the platform to personalize your experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          
          {/* Job Seeker Card */}
          <button
            onClick={() => navigate("/auth")}
            onMouseEnter={() => setHoveredRole('user')}
            onMouseLeave={() => setHoveredRole(null)}
            className={`group relative text-left p-8 rounded-3xl transition-all duration-500 ease-out overflow-hidden
              bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]
              ${hoveredRole === 'user' ? 'scale-[1.03] shadow-[0_20px_60px_rgba(99,102,241,0.2)] border-indigo-200' : 'hover:border-indigo-100'}`}
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-500 ${hoveredRole === 'user' ? 'opacity-100' : ''}`} />
            
            {/* Card Hover Background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${hoveredRole === 'user' ? 'opacity-100' : ''}`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500
                ${hoveredRole === 'user' ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-indigo-50 text-indigo-500'}`}>
                <User className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Job Seeker</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                Build your profile, ace interviews, and land your dream job with AI-powered insights.
              </p>
              
              <div className={`flex items-center gap-2 text-sm font-bold transition-colors duration-300
                ${hoveredRole === 'user' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                Continue as User
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredRole === 'user' ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          </button>

          {/* Company Card */}
          <button
            onClick={() => navigate("/logincompany")}
            onMouseEnter={() => setHoveredRole('company')}
            onMouseLeave={() => setHoveredRole(null)}
            className={`group relative text-left p-8 rounded-3xl transition-all duration-500 ease-out overflow-hidden
              bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]
              ${hoveredRole === 'company' ? 'scale-[1.03] shadow-[0_20px_60px_rgba(236,72,153,0.2)] border-pink-200' : 'hover:border-pink-100'}`}
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-400 opacity-0 transition-opacity duration-500 ${hoveredRole === 'company' ? 'opacity-100' : ''}`} />
            
            {/* Card Hover Background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-pink-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${hoveredRole === 'company' ? 'opacity-100' : ''}`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500
                ${hoveredRole === 'company' ? 'bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/30' : 'bg-pink-50 text-pink-500'}`}>
                <Building2 className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Company</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                Post opportunities, discover top talent, and streamline your recruitment process.
              </p>
              
              <div className={`flex items-center gap-2 text-sm font-bold transition-colors duration-300
                ${hoveredRole === 'company' ? 'text-pink-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                Continue as Company
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredRole === 'company' ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          </button>

        </div>

        <button
          onClick={() => navigate("/plslogn")}
          className="mt-12 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors duration-300 flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;