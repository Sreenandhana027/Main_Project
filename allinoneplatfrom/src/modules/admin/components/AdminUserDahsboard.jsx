import React, { useEffect, useState } from "react";
import { GetUserAdminAPI } from "../../../services/AllAPI";
import { FaUserCircle } from "react-icons/fa";
import { serverURL } from "../../../services/serverURL";

function AdminUsersDashboard() {
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const getUsers = async (currentToken) => {
    try {
      const reqHeader = { Authorization: `Bearer ${currentToken}` };
      const result = await GetUserAdminAPI(reqHeader);
      setAllUsers(result.data || []);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) getUsers(token);
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">User Management</h2>
        <p className="text-gray-400 text-sm mt-1">View and manage platform users</p>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">

          {/* HEAD */}
          <thead className="bg-[#111] text-gray-400 uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Photo</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email Address</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-800">
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-black hover:bg-[#111] transition-colors duration-150"
                >
                  {/* INDEX */}
                  <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                  {/* PHOTO */}
                  {/* PHOTO */}
                  <td className="px-6 py-4">
                    {user.profile ? (
                      <img
                        src={`${serverURL}/uploads/${user.profile}`}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover border border-gray-700"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-gray-600" />
                    )}
                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4 font-medium text-white">
                    {user.username || "—"}
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-gray-400">
                    {user.email || "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-600">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* FOOTER COUNT */}
      {allUsers.length > 0 && (
        <p className="text-gray-600 text-xs mt-4">
          Showing {allUsers.length} user{allUsers.length !== 1 ? "s" : ""}
        </p>
      )}

    </div>
  );
}

export default AdminUsersDashboard;