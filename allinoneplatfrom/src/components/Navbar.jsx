import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="w-full py-5 bg-white shadow-sm fixed top-0 left-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">
          PrepVault<span className="text-blue-600">360</span>
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/loginuser" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/registeruser"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
