import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
   <div
  className="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/6000119/pexels-photo-6000119.jpeg')",
  }}
>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
          ELEVATE YOUR INTERVIEW STYLE
        </h1>

        <p className="text-gray-300 mb-8 text-lg">
          Premium fashion for your career moments
        </p>

        <Link
          to="/shopping"
          className="px-10 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
