import React from "react";
import { Link } from "react-router-dom";

// *icons
import { CiSettings } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaVideoSolid } from "react-icons/lia";
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Platform overview and management control
          </p>
        </div>

        <div className="flex items-center gap-6 text-2xl bg-zinc-900 px-6 py-3 rounded-2xl border border-gray-800">

          <Link to={'/settings'}>
            <span className="cursor-pointer"><CiSettings/></span>
          </Link>
        </div>
      </div>

      {/* MANAGEMENT SECTION */}
      <div className="bg-zinc-900 rounded-3xl border border-gray-800 p-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-200 mb-6">
          Management Modules
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <div className="border border-gray-800 bg-black rounded-2xl p-6 hover:bg-zinc-800 transition">
            <div className="text-4xl mb-4"><FaRegCalendarCheck /></div>
            <h4 className="font-semibold text-lg mb-1">Aptitude</h4>
            <p className="text-sm text-gray-400">
              Candidate scheduling and evaluation
            </p>
          </div>

          <div className="border border-gray-800 bg-black rounded-2xl p-6 hover:bg-zinc-800 transition">
            <div className="text-4xl mb-4"><HiOutlineShoppingCart /></div>
            <h4 className="font-semibold text-lg mb-1">Shopping</h4>
            <p className="text-sm text-gray-400">
              Orders and inventory tracking
            </p>
          </div>

          <Link to="/userslist">
            <div className="border border-gray-800 bg-black rounded-2xl p-6 hover:bg-zinc-800 transition cursor-pointer">
              <div className="text-4xl mb-4"><HiOutlineUsers /></div>
              <h4 className="font-semibold text-lg mb-1">Users</h4>
              <p className="text-sm text-gray-400">
                Role and access management
              </p>
            </div>
          </Link>

          <Link to="/managevdo">
            <div className="border border-gray-800 bg-black rounded-2xl p-6 hover:bg-zinc-800 transition cursor-pointer">
              <div className="text-4xl mb-4"><LiaVideoSolid /></div>
              <h4 className="font-semibold text-lg mb-1">Videos</h4>
              <p className="text-sm text-gray-400">
                Learning content control
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-zinc-900 border border-gray-800 rounded-3xl p-8">
          <h3 className="font-semibold text-lg mb-6 text-gray-200">
            Recent Activity
          </h3>

          <div className="space-y-5">

            <div className="flex justify-between border-b border-gray-800 pb-4">
              <div>
                <p className="font-medium"> New User Registration</p>
                <p className="text-sm text-gray-500">nandhana</p>
              </div>
              <span className="text-sm text-gray-500">2m ago</span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-4">
              <div>
                <p className="font-medium"> Aptitude Test Completed</p>
                <p className="text-sm text-gray-500">Test #402</p>
              </div>
              <span className="text-sm text-gray-500">14m ago</span>
            </div>

            {/* <div className="flex justify-between">
              <div>
                <p className="font-medium"> Order Dispatched</p>
                <p className="text-sm text-gray-500">Order #9882</p>
              </div>
              <span className="text-sm text-gray-500">42m ago</span>
            </div> */}

          </div>
        </div>

        {/* AUDIT PANEL */}
        {/* <div className="bg-blue-600 text-white rounded-3xl p-8 border border-blue-500 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Security Audit
            </h3>
            <p className="opacity-90 text-sm">
              Monitor logs, compliance reports and internal activity records.
            </p>
          </div>

          <button className="bg-white text-blue-600 py-3 rounded-xl font-semibold mt-8">
            Generate Report
          </button>
        </div> */}

      </div>

    </div>

  );
}
