import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Truck, Zap, ShieldCheck } from "lucide-react";
import { paymentAPI } from "../../../../services/AllAPI";
import { useCart } from "./context/CartContext";
import toast from "react-hot-toast";

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalPrice = subtotal + deliveryCharge;

  const makePayment = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!form.name || !form.address || !form.city || !form.state || !form.zip) {
      toast.error("Please fill all shipping fields");
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
        toast.error(response.data.message || "Payment failed");
        return;
      }

      const checkoutUrl = response.data.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("No checkout URL received");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-[#D9D3C7] bg-white text-[#1C2333] text-sm placeholder:text-[#9A9285] focus:outline-none focus:border-[#8C6D3F] focus:ring-1 focus:ring-[#8C6D3F] transition-colors";

  const labelClass =
    "block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6357] mb-1.5";

  return (
    <div className="min-h-screen bg-[#F7F4EE] px-4 py-10 sm:py-14">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="w-full max-w-6xl mx-auto font-body">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#6B6357] hover:text-[#1C2333] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* PROGRESS */}
          <div className="flex items-center gap-2 text-xs tracking-wide">
            <span className="flex items-center gap-1.5 text-[#8C6D3F] font-semibold">
              <span className="w-5 h-5 rounded-full bg-[#8C6D3F] text-white flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3" />
              </span>
              Cart
            </span>
            <span className="w-6 h-px bg-[#D9D3C7]" />
            <span className="flex items-center gap-1.5 text-[#1C2333] font-semibold">
              <span className="w-5 h-5 rounded-full bg-[#1C2333] text-white flex items-center justify-center text-[10px]">2</span>
              Shipping
            </span>
            <span className="w-6 h-px bg-[#D9D3C7]" />
            <span className="flex items-center gap-1.5 text-[#B4AB9C]">
              <span className="w-5 h-5 rounded-full border border-[#D9D3C7] flex items-center justify-center text-[10px]">3</span>
              Payment
            </span>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8C6D3F] font-semibold mb-2">
            Checkout
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#1C2333] font-semibold">
            Shipping Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">

          {/* LEFT — FORM */}
          <div className="bg-white rounded-2xl border border-[#E9E4D8] p-7 sm:p-9 space-y-9">

            {/* CONTACT */}
            <section>
              <h2 className="font-display text-2xl text-[#1C2333] font-semibold mb-5 pb-3 border-b border-[#EFEAE0]">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* SHIPPING */}
            <section>
              <h2 className="font-display text-2xl text-[#1C2333] font-semibold mb-5 pb-3 border-b border-[#EFEAE0]">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Street Address</label>
                  <input
                    name="address"
                    placeholder="123 Market Street, Apt 4B"
                    value={form.address}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Postal Code</label>
                    <input
                      name="zip"
                      placeholder="ZIP"
                      value={form.zip}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* DELIVERY */}
            <section>
              <h2 className="font-display text-2xl text-[#1C2333] font-semibold mb-5 pb-3 border-b border-[#EFEAE0]">
                Delivery Preference
              </h2>
              <div className="space-y-3">
                <div
                  onClick={() => setDelivery("standard")}
                  className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-colors ${
                    delivery === "standard"
                      ? "border-[#8C6D3F] bg-[#FBF8F1]"
                      : "border-[#E9E4D8] hover:border-[#C9BFA9]"
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      delivery === "standard" ? "bg-[#8C6D3F] text-white" : "bg-[#F2EFE7] text-[#8C6D3F]"
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-[#1C2333] text-sm">Standard Courier</p>
                    <p className="text-xs text-[#8A8272]">Arrives in 3–5 business days</p>
                  </div>
                  <p className="text-sm font-semibold text-[#1C2333]">Free</p>
                </div>

                <div
                  onClick={() => setDelivery("express")}
                  className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-colors ${
                    delivery === "express"
                      ? "border-[#8C6D3F] bg-[#FBF8F1]"
                      : "border-[#E9E4D8] hover:border-[#C9BFA9]"
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      delivery === "express" ? "bg-[#8C6D3F] text-white" : "bg-[#F2EFE7] text-[#8C6D3F]"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-[#1C2333] text-sm">Priority Express</p>
                    <p className="text-xs text-[#8A8272]">Next-day delivery</p>
                  </div>
                  <p className="text-sm font-semibold text-[#1C2333]">$25.00</p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="lg:sticky lg:top-10 h-fit">
            <div className="bg-[#1C2333] rounded-2xl p-7 sm:p-8 text-white">
              <h2 className="font-display text-2xl font-semibold mb-6">
                Order Summary
              </h2>

              {cart.length > 0 ? (
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[#EDEAE0]">{item.name || "Item"}</p>
                        <p className="text-xs text-[#9098AC]">Qty {item.qty}</p>
                      </div>
                      <p className="text-[#EDEAE0] font-medium shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#9098AC] mb-6">Your cart is empty.</p>
              )}

              <div className="border-t border-white/10 pt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#C7CADA]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#C7CADA]">
                  <span>Delivery</span>
                  <span>{deliveryCharge === 0 ? "Free" : `$${deliveryCharge.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={makePayment}
                className="w-full mt-7 bg-[#8C6D3F] hover:bg-[#7A5D34] text-white py-3.5 rounded-md text-sm font-semibold tracking-[0.08em] uppercase transition-colors"
              >
                Continue to Payment
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-[#9098AC] mt-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure 256-bit SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}