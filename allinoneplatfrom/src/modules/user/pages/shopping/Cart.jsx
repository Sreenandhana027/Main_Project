import { useCart } from "./context/CartContext";
import { Trash2, ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Shares the PrepVault design tokens used on the home page:
 * ink #1E2A38 · ivory #FAF8F4 · paper #FFFFFF · gold #AD8A54
 * gold-tint #F1E9D8 · line #E7E2D6 · Cormorant Garamond + Jost
 */

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, total } = useCart();
  const [promo, setPromo] = useState("");

  const shipping = total > 150 ? 0 : 12;
  const estimatedTax = Math.round(total * 0.08 * 100) / 100;
  const orderTotal = (total + shipping + estimatedTax).toFixed(2);

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F4] text-[#1E2A38] px-6"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-4">Your Bag</p>
        <h1 className="font-display text-4xl italic mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Your cart is empty
        </h1>
        <div className="h-[1.5px] w-16 bg-[#AD8A54] mb-6" />
        <p className="text-[#6B7480] text-sm max-w-sm text-center mb-10 leading-relaxed">
          Formal wear, interview essentials, and finishing accessories are waiting.
          Start building a look that makes the right first impression.
        </p>
        <Link to="/">
          <button className="px-8 py-3.5 bg-[#1E2A38] text-[#FAF8F4] text-[13px] tracking-widest uppercase hover:bg-[#AD8A54] hover:text-[#1E2A38] transition-colors duration-500">
            Continue Shopping
          </button>
        </Link>

        <div className="grid grid-cols-3 gap-8 mt-16 text-center max-w-lg">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={18} className="text-[#AD8A54]" />
            <p className="text-[11px] text-[#6B7480] tracking-wide">Secure Checkout</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck size={18} className="text-[#AD8A54]" />
            <p className="text-[11px] text-[#6B7480] tracking-wide">Free Shipping Over $150</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RotateCcw size={18} className="text-[#AD8A54]" />
            <p className="text-[11px] text-[#6B7480] tracking-wide">30-Day Returns</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#FAF8F4] text-[#1E2A38] py-14 px-4"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      <style>{`.font-display { font-family: 'Cormorant Garamond', serif; }`}</style>

      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-3">Your Bag</p>
          <div className="flex items-end justify-between">
            <h1 className="font-display italic text-4xl">Shopping Cart</h1>
            <p className="text-sm text-[#6B7480]">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="h-px w-full bg-[#E7E2D6] mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 bg-white border border-[#E7E2D6] rounded-sm p-8">
            <div className="divide-y divide-[#F0ECE3]">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-6 py-7 first:pt-0 last:pb-0">
                  {/* IMAGE */}
                  <Link to={`/product/${item._id}`} className="shrink-0">
                    <div className="overflow-hidden w-24 h-28 border border-[#E7E2D6] bg-[#F5F2EB]">
                      <img
                        src={item.image || item.img}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        alt={item.name}
                      />
                    </div>
                  </Link>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[15px] truncate">{item.name}</p>
                    <p className="text-[#6B7480] text-sm mb-3">${item.price}</p>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#9B4B3E] hover:text-[#AD8A54] transition-colors duration-300"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => updateQty(item._id, "dec")}
                      className="w-8 h-8 border border-[#E7E2D6] rounded-full flex items-center justify-center hover:border-[#AD8A54] hover:text-[#AD8A54] transition-colors duration-300"
                    >
                      −
                    </button>

                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item._id, "inc")}
                      className="w-8 h-8 bg-[#1E2A38] text-white rounded-full flex items-center justify-center hover:bg-[#AD8A54] hover:text-[#1E2A38] transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="w-20 text-right font-medium shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#1E2A38] border-b border-[#1E2A38] pb-1 mt-8 hover:text-[#AD8A54] hover:border-[#AD8A54] transition-colors duration-300"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E7E2D6] rounded-sm p-8 sticky top-24">
              <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-2">Summary</p>
              <h2 className="font-display italic text-2xl mb-6">Order Total</h2>

              <div className="space-y-3 text-sm text-[#3E4954]">
                <div className="flex justify-between">
                  <span className="text-[#6B7480]">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7480]">Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7480]">Estimated Tax</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* PROMO CODE */}
              <div className="mt-6 pt-6 border-t border-[#E7E2D6]">
                <label className="text-[11px] uppercase tracking-widest text-[#6B7480] mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border-b border-[#C9C0AC] outline-none text-sm py-2 bg-transparent placeholder-[#9A9382] focus:border-[#AD8A54] transition-colors duration-300"
                  />
                  <button className="text-xs uppercase tracking-widest text-[#1E2A38] hover:text-[#AD8A54] transition-colors duration-300 px-2">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-baseline mt-6 pt-6 border-t border-[#E7E2D6]">
                <span className="text-sm text-[#6B7480]">Total</span>
                <span className="font-display italic text-3xl">${orderTotal}</span>
              </div>

              <button
                onClick={() => navigate("/shipping")}
                className="w-full mt-7 bg-[#1E2A38] text-[#FAF8F4] py-4 text-[13px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#AD8A54] hover:text-[#1E2A38] transition-colors duration-500"
              >
                Continue to Shipping
                <ArrowRight size={15} />
              </button>

              {/* TRUST STRIP */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#E7E2D6] text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#AD8A54]" />
                  <p className="text-[10px] text-[#8A8272] leading-tight">Secure Checkout</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Truck size={16} className="text-[#AD8A54]" />
                  <p className="text-[10px] text-[#8A8272] leading-tight">Free Over $150</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RotateCcw size={16} className="text-[#AD8A54]" />
                  <p className="text-[10px] text-[#8A8272] leading-tight">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}