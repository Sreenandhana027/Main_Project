import React, { useEffect, useState } from "react";
import { serverURL } from "../../../services/serverURL";
import { GetUserProfileAPI, UpdateUserProfileAPI } from "../../../services/AllAPI";
import { errorToast, successToast } from "../../../toastHelper";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, User, Mail, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserSettings() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [preview, setPreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        phone: "",
        profile: ""
    });

    // ✅ FIX: Helper to handle both Google URLs and local uploaded files
    const getProfileImage = (profile) => {
        if (!profile) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        if (profile.startsWith("http://") || profile.startsWith("https://")) {
            return profile; // Google photo URL — use directly
        }
        return `${serverURL}/uploads/${profile}`; // local uploaded file
    };

    const HandleFileUpload = (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setPreview(URL.createObjectURL(image));
        setUserDetails({ ...userDetails, profile: image });
    };

    const handleUpdate = async () => {
        if (!token) return errorToast("Authentication token not found");
        setIsLoading(true);

        const reqBody = new FormData();
        reqBody.append("username", userDetails.username);
        reqBody.append("email", userDetails.email);
        reqBody.append("phone", userDetails.phone);

        if (userDetails.profile instanceof File) {
            reqBody.append("profile", userDetails.profile);
        }

        const reqHeader = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };

        try {
            const result = await UpdateUserProfileAPI(reqBody, reqHeader);
            if (result.status === 200) {
                successToast(result.data.message || "Profile updated successfully!");
                await getUser();
            }
        } catch (err) {
            console.error("Update error:", err);
            errorToast("Profile update failed");
        } finally {
            setIsLoading(false);
        }
    };

    const getUser = async () => {
        if (!token) return;
        const reqHeader = { Authorization: `Bearer ${token}` };
        try {
            const result = await GetUserProfileAPI(reqHeader);
            if (result.status === 200) {
                setUserDetails(result.data);
                if (result.data.profile) {
                    // ✅ FIX: Use getProfileImage() — handles both Google URL and local file
                    setPreview(getProfileImage(result.data.profile));
                }
            }
        } catch (err) {
            console.error("Get user error:", err);
        }
    };

    useEffect(() => {
        // ✅ FIX: Read userToken (not adminToken) for user portal
        setToken(localStorage.getItem("userToken"));
    }, []);

    useEffect(() => {
        if (token) getUser();
    }, [token]);

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-outfit">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                {/* Main Card */}
                <div className="relative overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_20px_50px_rgba(79,70,229,0.15)] rounded-[2.5rem]">

                    {/* Header Section */}
                    <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(-1)}
                            className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
                            Account Settings
                        </h2>
                        <div className="w-11 h-11" />
                    </div>

                    <div className="px-8 pb-10">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center mb-10">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-violet-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <label className="relative block cursor-pointer">
                                    <input type="file" hidden onChange={HandleFileUpload} accept="image/*" />
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={preview || userDetails.profile}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                // ✅ FIX: Use getProfileImage() — handles Google URL and local file
                                                src={preview || getProfileImage(userDetails.profile)}
                                                alt="profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                            <Camera className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white"
                                    >
                                        <Camera size={16} />
                                    </motion.div>
                                </label>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-4 text-center"
                            >
                                <h3 className="text-xl font-bold text-gray-900">
                                    {userDetails.username || "Set Your Name"}
                                </h3>
                                <p className="text-slate-500 flex items-center justify-center gap-1.5 text-sm mt-1">
                                    <ShieldCheck size={14} className="text-indigo-500" />
                                    Verified Account
                                </p>
                            </motion.div>
                        </div>

                        {/* Form Grid */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-1 gap-6"
                            >
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                                        <User size={14} className="text-indigo-500" />
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={userDetails.username || ""}
                                            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                            className="w-full bg-white/50 border border-slate-200 text-gray-900 px-5 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400 group-hover:border-slate-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                                        <Mail size={14} className="text-indigo-500" />
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={userDetails.email || ""}
                                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                            className="w-full bg-white/50 border border-slate-200 text-gray-900 px-5 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400 group-hover:border-slate-300"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                                        <Phone size={14} className="text-indigo-500" />
                                        Phone Number
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={userDetails.phone || ""}
                                            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                            className="w-full bg-white/50 border border-slate-200 text-gray-900 px-5 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-400 group-hover:border-slate-300"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Info Banner */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-indigo-700 text-sm leading-relaxed"
                            >
                                <div className="shrink-0 mt-0.5">
                                    <ShieldCheck size={18} />
                                </div>
                                <p>
                                    Keeping your information up to date helps us provide a better experience.
                                    Significant changes may require re-verification.
                                </p>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                    className="w-full relative group cursor-pointer"
                                >
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                                    <div className="relative bg-linear-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-violet-500 transition-all">
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Save Profile Changes
                                            </>
                                        )}
                                    </div>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default UserSettings;