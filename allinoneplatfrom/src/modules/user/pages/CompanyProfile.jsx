import React from "react";
import { useParams } from "react-router-dom";

export default function CompanyProfile() {
  const { name } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl p-8 shadow">
        <div className="flex items-center gap-6 mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            className="w-20"
            alt="Company"
          />
          <div>
            <h1 className="text-3xl font-bold capitalize">{name}</h1>
            <p className="text-gray-500">
              Technology & Software Company
            </p>
          </div>
        </div>

        <h3 className="font-semibold mb-2">About Company</h3>
        <p className="text-gray-600 mb-6">
          {name} is a global technology company focused on building scalable
          products and innovative solutions.
        </p>

        <h3 className="font-semibold mb-4">Open Positions</h3>

        <div className="space-y-4">
          <div className="border p-4 rounded-lg flex justify-between">
            <div>
              <h4 className="font-medium">Frontend Developer</h4>
              <p className="text-sm text-gray-500">
                Bangalore • Full Time
              </p>
            </div>
            <button className="text-indigo-600">
              View
            </button>
          </div>

          <div className="border p-4 rounded-lg flex justify-between">
            <div>
              <h4 className="font-medium">Backend Engineer</h4>
              <p className="text-sm text-gray-500">
                Remote • Full Time
              </p>
            </div>
            <button className="text-indigo-600">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
