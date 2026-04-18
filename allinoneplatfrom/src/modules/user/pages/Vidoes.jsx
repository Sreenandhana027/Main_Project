import React from 'react'
import { Link } from 'react-router-dom'

function Vidoes() {
  return (
  <div
  className="min-h-screen bg-cover bg-center relative"
  style={{
    backgroundImage:
      "url('https://img.freepik.com/premium-vector/employment-interview-2d-vector-isolated-illustration_151150-12094.jpg?w=2000')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
    <div className="text-center text-white max-w-xl">
      <h1 className="text-4xl font-bold mb-4">Expert Interview Video Guide</h1>
      <p className="text-lg mb-6">
        Learn interview concepts visually through expert-led videos, mock interviews, and real-world examples.

      </p>
      <Link to={'/mainvdo'}>
      <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
        Get Started
      </button></Link>
    </div>
  </div>
</div>

  )
}

export default Vidoes





