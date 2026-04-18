import React from "react";
import { Link } from "react-router-dom";

function PaymentErorr() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-red-50">
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center max-w-lg animate-fadeIn">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" // red cross icon
            alt="Failed"
            className="w-28 h-28"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
          Payment Failed ❌
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Oops! Something went wrong with your payment.
        </p>

        <p className="text-md text-gray-600 mb-8">
          Please check your payment details and try again.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/shopping">
            <button className="bg-red-600 hover:bg-red-700 transition duration-300 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform">
              Retry Payment
            </button>
          </Link>
          <Link to="/home">
            <button className="bg-gray-300 hover:bg-gray-400 transition duration-300 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentErorr;
