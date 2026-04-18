import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <input
        className="w-full p-3 mb-4 text-black"
        placeholder="Delivery Address"
      />

      <Link
        to="/success"
        className="px-6 py-3 bg-white text-black font-semibold rounded"
      >
        Place Order
      </Link>
    </div>
  );
}
