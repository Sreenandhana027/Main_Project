import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
        Who are you?
      </h1>
      <p className="text-gray-500 text-lg max-w-md mb-12">
        Select your role to continue to the right login page.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* User / Job Seeker */}
        <button
          onClick={() => navigate("/auth")}
          className="group flex flex-col items-center gap-4 px-12 py-8 border-2 border-black rounded-2xl
          hover:bg-black hover:text-white transition-all duration-300 w-64"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">👤</span>
          <div>
            <p className="text-xl font-bold">Job Seeker</p>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 mt-1">
              Find jobs & grow your career
            </p>
          </div>
        </button>

        {/* Company */}
        <button
          onClick={() => navigate("/logincompany")}
          className="group flex flex-col items-center gap-4 px-12 py-8 border-2 border-black rounded-2xl
          hover:bg-black hover:text-white transition-all duration-300 w-64"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🏢</span>
          <div>
            <p className="text-xl font-bold">Company</p>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 mt-1">
              Post jobs & hire talent
            </p>
          </div>
        </button>
      </div>

      <button
        onClick={() => navigate("/plslogn")}
        className="mt-10 text-sm text-gray-400 hover:text-black underline transition-all"
      >
        ← Back
      </button>
    </div>
  );
}

export default RoleSelection;