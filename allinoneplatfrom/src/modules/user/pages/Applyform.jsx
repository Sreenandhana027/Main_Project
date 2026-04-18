import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddUserAPI } from "../../../services/AllAPI";
import { useParams } from "react-router-dom";
import { successToast } from "../../../toastHelper";

export default function ApplyForm() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    usermail: "",
    phone: "",
    location: "",
    portfolio: "",
    coverletter: ""
  });

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setResumes([...e.target.files]);
  };

  // Submit form
  const handleSubmit = async () => {
    console.log("FILES:", resumes);

    if (!formData.name || !formData.usermail) {
      alert("Name and Email are required");
      return;
    }

    if (resumes.length === 0) {
      alert("Please upload your resume");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("jobId", jobId);

      // append resume files
      resumes.forEach((file) => {
        data.append("resumes", file);
      });

      const token = localStorage.getItem("userToken");

      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      const response = await AddUserAPI(data, reqHeader);

      successToast(response.data.message);
      navigate("/apply/success");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <div className="w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-4 px-6 py-5 md:py-6 border-b border-gray-200 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Apply for This Role
          </h1>
        </div>

        {/* FORM */}
        <form
          className="px-6 md:px-10 py-8 md:py-10 space-y-6 md:space-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="usermail"
              value={formData.usermail}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* PORTFOLIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Portfolio / GitHub / LinkedIn
            </label>
            <input
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://your-portfolio.com"
              className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* RESUME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume / CV <span className="text-red-500">*</span>
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 text-center hover:border-teal-500 hover:bg-teal-50/30 transition-all duration-200 cursor-pointer block shadow-sm">
              <Upload className="mx-auto text-teal-600 mb-3 w-10 h-10" />
              <p className="font-medium text-gray-800 text-lg mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, DOCX (Max 5MB recommended)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {resumes.length > 0 && (
              <div className="mt-3 text-sm text-teal-700 font-medium">
                {resumes.length} file{resumes.length > 1 ? 's' : ''} selected
                <ul className="mt-2 text-gray-600 text-xs list-disc pl-5">
                  {resumes.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* COVER LETTER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Cover Letter / Why you're a great fit
            </label>
            <textarea
              rows="5"
              name="coverletter"
              value={formData.coverletter}
              onChange={handleChange}
              placeholder="Tell us about your experience, motivation, and why you'd be a perfect match for this role..."
              className="w-full border border-gray-300 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/40 outline-none transition-all duration-200 shadow-sm resize-y min-h-[140px]"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}