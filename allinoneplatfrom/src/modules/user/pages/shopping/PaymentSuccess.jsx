import React from 'react';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <img
          src="https://www.lappymaker.com/images/greentick-unscreen.gif"
          alt="Success"
          className="w-24 h-24 mx-auto mb-4"
        />

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-700 mb-4">
          Your order has been placed successfully.
        </p>

        <Link to="/main">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
