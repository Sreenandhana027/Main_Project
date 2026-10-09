import React, { useEffect, useState } from "react";
import Homeheader from "./Homeheader";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

// Simple inline preloader — no extra file needed
function HomePreloader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Spinning ring */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #000",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <p
        style={{
          marginTop: 24,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 2,
          color: "#111",
        }}
      >
        PrepVault
      </p>
      <p style={{ marginTop: 6, fontSize: 13, color: "#6b7280" }}>
        Loading your experience...
      </p>

      {/* Keyframe injected inline */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function UserHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show preloader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);

      if (localStorage.getItem("userToken")) {
        navigate("/home");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HomePreloader />;

  const handleStart = () => {
    if (localStorage.getItem("userToken")) {
      navigate("/main");
    } else {
      navigate("/plslogn"); // → PleaseLogin page
    }
  };

  return (
    <>
      <div>
        <Homeheader />

        <div className="min-h-screen text-black flex mt-16 flex-col">

          {/* Hero Section */}
          <section className="flex flex-col items-center text-center mt-20 px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Welcome to{" "}
              <span className="text-gradient drop-shadow-sm">PrepVault</span>
            </h1>

            <p className="mt-4 text-xl max-w-2xl text-gray-600 leading-relaxed font-medium">
              A modern platform that connects job seekers, companies, and
              institutions. Discover opportunities, grow faster, and manage smarter.
            </p>

            <button
              onClick={handleStart}
              className="btn-premium mt-10 text-lg shadow-xl shadow-indigo-500/20"
            >
              Start Your Path
            </button>
          </section>

          {/* Feature Images Section */}
          <section className="mt-24 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            <div className="group flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Team work"
                className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-300 w-full h-64 object-cover"
              />
              <p className="mt-4 text-center text-gray-700">
                Smart job matching for faster hiring.
              </p>
            </div>

            <div className="group flex flex-col items-center transform lg:-translate-y-10">
              <img
                src="https://images.unsplash.com/photo-1521790361543-f645cf042ec4"
                alt="Business Analytics"
                className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-300 w-full h-64 object-cover shadow-xl"
              />
              <p className="mt-4 text-center text-gray-700">
                Real-time analytics for companies and admin.
              </p>
            </div>

            <div className="group flex flex-col items-center transform lg:translate-y-5">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Career Growth"
                className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-300 w-full h-64 object-cover"
              />
              <p className="mt-4 text-center text-gray-700">
                Empower users with skill insights and career growth.
              </p>
            </div>

          </section>

          {/* Summary Section */}
          <section className="mt-24 px-10 mb-20">
            <div className="premium-card max-w-4xl mx-auto p-12 text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why <span className="text-gradient">PrepVault</span>?</h2>

              <div className="text-center mx-auto text-gray-700 text-lg leading-relaxed font-medium">
                PrepVault brings together everything needed for a smooth hiring experience.
                Our platform delivers powerful tools for every user role:
                <br /><br />

                <div className="flex flex-col gap-4 items-start text-left mx-auto w-fit bg-white/50 p-8 rounded-3xl border border-white/60 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">✓</div>
                    <span className="text-gray-800">A clean and intuitive dashboard for jobseekers</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">✓</div>
                    <span className="text-gray-800">Company tools for posting jobs & tracking applications</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">✓</div>
                    <span className="text-gray-800">Admin controls for monitoring users and jobs</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">✓</div>
                    <span className="text-gray-800">AI-based suggestions for skills, roles & career roadmaps</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserHome;