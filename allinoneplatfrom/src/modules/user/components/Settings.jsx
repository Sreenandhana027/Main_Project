import React, { useEffect, useState } from 'react';
// import AdminHeader from '../components/AdminHeader';
// import AdminSideBar from '../components/AdminSideBar';
import { CgProfile } from "react-icons/cg";
import { GetAdminAPI, UpdateUserAPI } from '../../../services/AllAPI';
import { serverURL } from '../../../services/serverURL';
import toast, { Toaster } from "react-hot-toast";

function Settings() {
  const [token, setToken] = useState("");
  const [preview, setPreview] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    bio: "",
    profile: ""
  });
  console.log(adminDetails);

  // ** file uploading

  const HandleFileUpload = (e) => {
    const image = e.target.files[0];

    setPreview(URL.createObjectURL(image));
    setAdminDetails({
      ...adminDetails,
      profile: image  // correct (File object)
    });
  };
  const handleUpdate = async () => {
    if (!token) {
      toast.error("Token not found");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("username", adminDetails.username);
    reqBody.append("password", adminDetails.password);
    reqBody.append("bio", adminDetails.bio);

    if (adminDetails.profile instanceof File) {
      reqBody.append("profile", adminDetails.profile);
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      const result = await UpdateUserAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log("Update error:", err);
      toast.error("Update failed ");
    }
  };


  const getAdmin = async () => {
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await GetAdminAPI(reqHeader);

      if (result.status === 200) {
        setAdminDetails(result.data);
        setPreview(`${serverURL}/uploads/${result.data.profile}`);
      }
    } catch (err) {
      console.log("Get admin error:", err);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);

  useEffect(() => {
    if (token) getAdmin();
  }, [token]);
  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-12">
      <>
        <Toaster position="top-right" reverseOrder={false} />

        <div className="min-h-screen bg-black flex justify-center items-center px-4 py-12">
          {/* your existing UI */}
        </div>
      </>
      <div className="w-full max-w-3xl bg-[#111] text-white rounded-2xl shadow-2xl">

        {/* HEADER */}
        <div className="px-10 py-6 border-b border-gray-800 text-center">
          <h2 className="text-2xl font-semibold tracking-wide">
            Admin Settings
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your profile & security
          </p>
        </div>

        <div className="px-10 py-10">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-12">
            <label className="relative cursor-pointer">
              <input type="file" hidden onChange={HandleFileUpload} />

              <img
                src={
                  preview
                    ? preview
                    : `${serverURL}/uploads/${adminDetails.profile}`
                }
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
              />

              <div className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full text-sm">
                📷
              </div>
            </label>

            <p className="text-gray-400 text-sm mt-4">
              Upload new profile picture
            </p>
          </div>

          {/* FORM SECTION */}
          <div className="space-y-8">

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={adminDetails.username}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    username: e.target.value
                  })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 p-4 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={adminDetails.password}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    password: e.target.value
                  })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 p-4 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Bio
              </label>
              <input
                type="text"
                value={adminDetails.bio}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    bio: e.target.value
                  })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 p-4 rounded-lg focus:outline-none"
              />
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-12 space-y-4">
            <button
              onClick={handleUpdate}
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:opacity-90"
            >
              Save Changes
            </button>

            <button className="w-full text-gray-400">
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );


}

export default Settings;