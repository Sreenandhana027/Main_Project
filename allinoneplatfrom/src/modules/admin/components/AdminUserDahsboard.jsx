import React, { useEffect, useState } from "react";
import { GetUserAdminAPI } from "../../../services/AllAPI";
import { FaUserCircle } from "react-icons/fa";

function AdminUsersDashboard() {
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // Load token
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Get Users
  const getUsers = async (currentToken) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${currentToken}`,
      };

      const result = await GetUserAdminAPI(reqHeader);
      setAllUsers(result.data || []);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUsers(token);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold">User Management</h2>
        <p className="text-gray-400 text-sm">
          View and manage platform users
        </p>
      </div>

      {/* USER GRID */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#111] border border-gray-800 rounded-xl p-6 flex items-center gap-4 hover:border-gray-600 transition"
            >

              {/* PROFILE */}
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-14 h-14 text-gray-500" />
              )}

              {/* INFO */}
              <div className="overflow-hidden">
                <h5 className="font-semibold text-lg truncate">
                  {user.username || "No Name"}
                </h5>

                <p className="text-gray-400 text-sm truncate">
                  {user.email || "No Email"}
                </p>

                <p className="text-xs text-gray-600 mt-1 truncate">
                  {user._id}
                </p>
              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}

      </div>

    </div>
  );

}

export default AdminUsersDashboard;
