import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { paymentAPI } from "../../../../services/AllAPI";
import { useCart } from "./context/CartContext";

export default function Shipping() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [delivery, setDelivery] = useState("standard");
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deliveryCharge = delivery === "express" ? 25 : 0;

const totalPrice = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
) + deliveryCharge;

  const makePayment = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!form.name || !form.address || !form.city || !form.state || !form.zip) {
      alert("Please fill all shipping fields");
      return;
    }

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = {
        FormDetails: form,
        totalAmount: totalPrice,
        deliveryType: delivery,
      };

      const response = await paymentAPI(reqBody, reqHeader);

      if (!response.data.success) {
        alert(response.data.message || "Payment failed");
        return;
      }

      const checkoutUrl = response.data.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("No checkout URL received");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex justify-center px-4 py-6">

      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-md p-6 sm:p-10 lg:p-12 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900 transition"
          />
          <h1 className="text-xl sm:text-2xl font-medium text-gray-800">
            Shipping Details
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">

          {/* LEFT */}
          <div className="space-y-8">

            {/* CONTACT */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                Contact <span className="italic font-normal">Information</span>
              </h2>

              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* SHIPPING */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                Shipping <span className="italic font-normal">Address</span>
              </h2>

              <div className="space-y-4">
                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" />

                <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                <input name="zip" placeholder="Postal Code" value={form.zip} onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between">

            {/* DELIVERY */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
                Delivery Preference
              </h2>

              <div className="space-y-3">

                {/* STANDARD */}
                <div
                  onClick={() => setDelivery("standard")}
                  className={`cursor-pointer border rounded-xl p-4 flex justify-between items-center transition 
        ${delivery === "standard"
                      ? "border-gray-800 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"}
      `}
                >
                  <div>
                    <p className="font-medium text-gray-700">Standard Courier</p>
                    <p className="text-sm text-gray-500">3-5 Business Days</p>
                  </div>
                  <p className="text-gray-700 font-medium">Free</p>
                </div>

                {/* EXPRESS */}
                <div
                  onClick={() => setDelivery("express")}
                  className={`cursor-pointer border rounded-xl p-4 flex justify-between items-center transition 
        ${delivery === "express"
                      ? "border-gray-800 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"}
      `}
                >
                  <div>
                    <p className="font-medium text-gray-700">Priority Express</p>
                    <p className="text-sm text-gray-500">Next Day Delivery</p>
                  </div>
                  <p className="text-gray-700 font-medium">$25.00</p>
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-8">
              <button
                onClick={makePayment}
                className="w-full bg-cyan-950 hover:bg-gray-900 text-white py-4 rounded-xl text-base tracking-wide transition"
              >
                CONTINUE TO PAYMENT →
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Secure 256-bit SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}