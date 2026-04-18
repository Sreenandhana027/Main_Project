import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { companyLoginAPI, companyRegisterAPI } from "../services/AllAPI";
import { successToast } from "../toastHelper";


export default function LoginCompany() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    companyName: "",
    email: "",
    password: ""
  });

  // REGISTER
  const handleRegister = async () => {
    if (!userData.companyName || !userData.email || !userData.password) {
      alert("Please fill all fields");
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
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await companyLoginAPI({ email, password });

      if (response.status === 200) {
        localStorage.setItem("companyToken", response.data.token);

        if (response.data.existingCompany.role === "admin") {
          navigate("/adminpre");
        } else if (response.data.existingCompany.role === "App  Users") {
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
    if (savedToken) {
      setToken(savedToken);
    }
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

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-3 rounded-lg"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

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
