import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Order Successful 🎉</h2>
      <Link to="/orders" className="underline">
        View My Orders
      </Link>
    </div>
  );
}
