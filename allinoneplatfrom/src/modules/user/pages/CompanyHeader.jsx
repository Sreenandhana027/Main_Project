import { Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyHeader() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">PrepVault</h1>

        <div className="flex items-center gap-5 relative">

          <Bell className="w-6 h-6 text-gray-600 cursor-pointer"/>

          {/* PROFILE ICON */}
          <div>
            <User
              onClick={() => setOpen(!open)}
              className="w-7 h-7 text-gray-700 cursor-pointer"
            />

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white border rounded-xl shadow-lg">

                <button
                  onClick={() => navigate("/Usersettings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </button>

                <button
                  onClick={() => navigate("/userJobs")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Jobs
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
