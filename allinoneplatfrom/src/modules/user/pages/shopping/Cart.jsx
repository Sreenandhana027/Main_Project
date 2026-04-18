import { useCart } from "./context/CartContext";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export default function Cart() {

  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-4xl mb-4">🛒</p>
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>

        {/* CART ITEMS */}
        <div className="space-y-6">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex items-center gap-6 border-b pb-6"
            >
              {/* IMAGE */}
            <Link to={`/product/${item._id}`}>
              <img
                src={item.image}
                className="w-24 h-28 object-cover rounded-xl"
                alt={item.name}
              />
              </Link>

              {/* INFO */}
              <div className="flex-1">
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-gray-500 text-sm mb-2">
                  ${item.price}
                </p>

                <button
                 onClick={() => removeFromCart(item._id)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>

              {/* QTY */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(item._id, "dec")}
                  className="w-9 h-9 border rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  −
                </button>

                <span className="w-6 text-center font-medium">
                {item.qty}
                </span>

                <button
                  onClick={() => updateQty(item._id, "inc")}
                  className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="w-20 text-right font-semibold">
                ${item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-10 border-t pt-6">
          <div className="flex justify-between text-lg mb-4">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">${total}</span>
          </div>

       <button
  onClick={() => navigate("/shipping")}
  className="w-full bg-blue-600 text-white py-4 rounded-2xl"
>
  Continue to Shipping →
</button>
        </div>
      </div>
    </div>
  );
}
