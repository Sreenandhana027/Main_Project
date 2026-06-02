import { CheckCircle, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApplySuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">

        {/* Success Header / Visual */}
        <div className="relative bg-linear-to-br from-teal-50 to-cyan-50 px-8 py-12 md:py-16 text-center border-b border-teal-100">
          {/* Subtle animated checkmark background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.15),transparent_40%)]"></div>
          </div>

          <div className="relative">
            <CheckCircle
              size={80}
              className="mx-auto text-teal-600 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-md"
            />
            <div className="mt-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Application Submitted!
              </h1>
              <p className="mt-3 text-lg text-gray-700 max-w-md mx-auto">
                Congratulations! Your application has been successfully sent.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 md:px-12 py-10 text-center space-y-8">
          <p className="text-gray-600 leading-relaxed text-lg">
            Our hiring team will review your profile shortly and get in touch if your skills match the role.
            <br />
            <span className="font-medium text-teal-700">You’ll receive a confirmation email soon 📩</span>
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/my-application")}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100"
            >
              <FileText size={20} />
              View My Application
            </button>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/jobs")}
                className="flex items-center justify-center gap-2 bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                Browse More Jobs
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/main")}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 hover:bg-gray-200 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
          Thank you for choosing PrepVault — we wish you the best of luck!
        </div>
      </div>
    </div>
  );
}