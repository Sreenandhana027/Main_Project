import React from "react";
import { useNavigate } from "react-router-dom";

function PleaseLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Icon */}
      <div className="text-6xl mb-6">🔐</div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
        Please Login to Continue
      </h1>
      <p className="text-gray-500 text-lg max-w-md mb-10">
        You need to be logged in to access PrepVault. Choose your role to get started.
      </p>

      <button
        onClick={() => navigate("/role")}
        className="px-12 py-3 bg-black text-white text-lg font-semibold rounded-lg
        hover:bg-gray-800 transition-all duration-300"
      >
        Please Login
      </button>

      <button
        onClick={() => navigate("/home")}
        className="mt-4 text-sm text-gray-400 hover:text-black underline transition-all"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default PleaseLogin;