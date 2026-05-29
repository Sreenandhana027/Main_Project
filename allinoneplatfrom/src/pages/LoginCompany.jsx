import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { companyLoginAPI, companyRegisterAPI } from "../services/AllAPI";
import { successToast, errorToast } from "../toastHelper";
import { Eye, EyeOff } from "lucide-react";


export default function LoginCompany() {
  const navigate = useNavigate();


  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    companyName: "",
    email: "",
    password: ""
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePasswordStrong = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
  };

  // REGISTER
  const handleRegister = async () => {
    if (!userData.companyName || !userData.email || !userData.password) {
      errorToast("Please fill all fields");
      return;
    }
    if (!validateEmail(userData.email)) {
      errorToast("Please enter a valid email address");
      return;
    }
    if (!validatePasswordStrong(userData.password)) {
      errorToast("Password must contain at least 6 characters, one capital letter, one number, and one special character.");
      return;
    }

    try {
      setLoading(true);

      const reqBody = {
  companyName: userData.companyName, 
  email: userData.email,
  password: userData.password
};
      const res = await companyRegisterAPI(reqBody);

      if (res.status === 200) {
        alert("Company Registered Successfully");
        setIsLogin(true);
      }
    } catch (err) {
      successToast(err?.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    const { email, password } = userData;

    if (email === "" || password === "") {
      errorToast("Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      errorToast("Please enter a valid email address");
      return;
    }

    try {
      const response = await companyLoginAPI({ email, password });

      if (response.status === 200) {
        localStorage.setItem("companyToken", response.data.token);

        if (response.data.existingCompany.role === "admin") {
          navigate("/adminpre");
        } else if (response.data.existingCompany.role === "user") {
          navigate("/home");
        } else {
          navigate("/companyDash");
        }

        successToast("Company Login Success");
      }
    } catch (error) {
      alert(error?.response?.data || "Login failed");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("companyToken");
    // token state removed
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE COMPANY BRAND */}
        <div className="bg-black text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Company Portal
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Manage job postings, track applicants, and grow your hiring
            process efficiently with PrepVault company dashboard.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isLogin ? "Company Login" : "Company Register"}
          </h2>

          <div className="space-y-4">

            {!isLogin && (
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border px-4 py-3 rounded-lg"
                onChange={(e) =>
                  setUserData({ ...userData, companyName: e.target.value })
                }
              />
            )}

            <input
              type="email"
              placeholder="Company Email"
              className="w-full border px-4 py-3 rounded-lg"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border px-4 py-3 rounded-lg pr-12"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              * Must contain at least 6 characters, 1 uppercase, 1 number, and 1 special character.
            </p>

            {isLogin ? (
              <button
                disabled={loading}
                onClick={handleLogin}
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
              >
                Company Login
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handleRegister}
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
              >
                Company Register
              </button>
            )}

          </div>

          <p className="text-center text-sm mt-6">
            {isLogin ? (
              <>
                New Company?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="font-semibold underline"
                >
                  Register Here
                </button>
              </>
            ) : (
              <>
                Already Registered?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="font-semibold underline"
                >
                  Login
                </button>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}
