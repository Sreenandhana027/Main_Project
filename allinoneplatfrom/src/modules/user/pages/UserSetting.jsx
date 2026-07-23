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
            if (err?.response?.status === 401) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                setToken("");
                navigate("/auth");
            }
        }
    };

    useEffect(() => {
        // ✅ FIX: Read userToken (not adminToken) for user portal
        setToken(localStorage.getItem("userToken"));
    }, []);

    useEffect(() => {
        if (token) getUser();
    }, [token]);

    const inputClass =
        "w-full bg-white border border-[#D9D3C7] text-[#1C2333] px-5 py-3.5 rounded-md outline-none focus:ring-1 focus:ring-[#8C6D3F] focus:border-[#8C6D3F] transition-colors placeholder:text-[#B0A88F]";

    const labelClass =
        "text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6357] ml-0.5 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-[#F7F4EE] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
                .font-display { font-family: 'Cormorant Garamond', serif; }
                .font-body { font-family: 'Inter', sans-serif; }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-2xl font-body"
            >
                {/* Main Card */}
                <div className="relative overflow-hidden bg-white border border-[#E9E4D8] shadow-[0_20px_50px_rgba(28,35,51,0.08)] rounded-2xl">

                    {/* Header Section */}
                    <div className="px-8 sm:px-10 pt-8 pb-6 flex items-center justify-between border-b border-[#EFEAE0]">
                        <motion.button
                            whileHover={{ scale: 1.05, x: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="p-2.5 bg-white border border-[#E9E4D8] rounded-lg text-[#6B6357] hover:text-[#1C2333] hover:border-[#C9BFA9] transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </motion.button>
                        <div className="text-center">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C6D3F] font-semibold mb-1">
                                Your Account
                            </p>
                            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C2333]">
                                Account Settings
                            </h2>
                        </div>
                        <div className="w-11 h-11" />
                    </div>

                    <div className="px-8 sm:px-10 pb-10">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center mb-10 mt-8">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <label className="relative block cursor-pointer">
                                    <input type="file" hidden onChange={HandleFileUpload} accept="image/*" />
                                    <div className="w-32 h-32 rounded-full border-4 border-[#F7F4EE] shadow-md overflow-hidden bg-[#F2EFE7] flex items-center justify-center ring-1 ring-[#E9E4D8]">
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
                                        <div className="absolute inset-0 bg-[#1C2333]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                            <Camera className="text-white" size={22} />
                                        </div>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        className="absolute bottom-1 right-1 bg-[#8C6D3F] text-white p-2.5 rounded-full shadow-md border-2 border-[#F7F4EE]"
                                    >
                                        <Camera size={14} />
                                    </motion.div>
                                </label>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-5 text-center"
                            >
                                <h3 className="font-display text-2xl font-semibold text-[#1C2333]">
                                    {userDetails.username || "Set Your Name"}
                                </h3>
                                <p className="text-[#8A8272] flex items-center justify-center gap-1.5 text-xs mt-1.5 tracking-wide">
                                    <ShieldCheck size={13} className="text-[#8C6D3F]" />
                                    VERIFIED ACCOUNT
                                </p>
                            </motion.div>
                        </div>

                        {/* Form Grid */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-1 gap-5"
                            >
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        <User size={13} className="text-[#8C6D3F]" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={userDetails.username || ""}
                                        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                        className={inputClass}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        <Mail size={13} className="text-[#8C6D3F]" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={userDetails.email || ""}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                        className={inputClass}
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        <Phone size={13} className="text-[#8C6D3F]" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={userDetails.phone || ""}
                                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                        className={inputClass}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </motion.div>

                            {/* Info Banner */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-3.5 p-4 rounded-lg bg-[#FBF8F1] border border-[#E9E4D8] text-[#6B6357] text-sm leading-relaxed"
                            >
                                <div className="shrink-0 mt-0.5 text-[#8C6D3F]">
                                    <ShieldCheck size={17} />
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
                                className="pt-3"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                    className="w-full bg-[#1C2333] hover:bg-[#151B29] text-white py-4 rounded-md text-sm font-semibold tracking-[0.08em] uppercase shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={17} />
                                            Save Profile Changes
                                        </>
                                    )}
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