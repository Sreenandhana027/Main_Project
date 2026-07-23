import { useWishlist } from "../shopping/context/WishlistContext";
import { useCart } from "../shopping/context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ShoppingCart, Trash2, ArrowRight, BookmarkX, ExternalLink } from "lucide-react";

/**
 * Shares the PrepVault design tokens used across Home / Cart / Category / New Arrivals:
 * ink #1E2A38 · ivory #FAF8F4 · paper #FFFFFF · gold #AD8A54
 * gold-tint #F1E9D8 · line #E7E2D6 · maroon #9B4B3E (remove/destructive accent)
 * Cormorant Garamond (display) + Jost (body/UI)
 *
 * Layout: single uniform grid (no special "featured" card) — every saved
 * piece gets the same treatment. Motion carries the personality instead:
 * staggered entrance on load, a smooth reflow + fade/scale exit on removal
 * (via layout + AnimatePresence popLayout), and a slower, more deliberate
 * hover choreography (image drifts, a gold rule draws in, actions rise).
 */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // New Arrivals stores the field as `img`, everywhere else it's `image` — fall back either way
  const imgOf = (item) => item.image || item.img;

  useEffect(() => {
    if (document.getElementById("prepvault-fonts")) return;
    const link = document.createElement("link");
    link.id = "prepvault-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1E2A38] py-14 px-6" style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .wl-rule {
          height: 1px;
          background: #AD8A54;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.65,0,0.35,1);
        }
        .wl-card:hover .wl-rule { transform: scaleX(1); }
        .wl-actions {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .wl-card:hover .wl-actions { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between border-b border-[#E7E2D6] pb-6 mb-14"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-3">Saved For Later</p>
            <h1 className="font-display italic text-4xl">Wishlist</h1>
          </div>
          {wishlist.length > 0 && (
            <p className="text-sm text-[#6B7480]">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          )}
        </motion.div>

        {/* EMPTY STATE */}
        {wishlist.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24 max-w-sm mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="w-16 h-16 mx-auto mb-6 border border-[#E7E2D6] rounded-full flex items-center justify-center"
            >
              <BookmarkX size={26} className="text-[#AD8A54]" />
            </motion.div>
            <p className="font-display italic text-3xl mb-3">Nothing saved yet</p>
            <div className="h-px w-16 bg-[#AD8A54] mx-auto mb-6" />
            <p className="text-sm text-[#6B7480] leading-relaxed mb-9">
              Browse the collection and save the pieces that speak to you.
            </p>
            <Link to="/shopping">
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E2A38] text-[#FAF8F4] text-[13px] tracking-widest uppercase hover:bg-[#AD8A54] hover:text-[#1E2A38] transition-colors duration-500">
                Explore Collection <ArrowRight size={15} />
              </button>
            </Link>
          </motion.div>
        )}

        {/* UNIFORM GRID — every item gets the same card, motion does the differentiation */}
        {wishlist.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  variants={cardVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                  className="wl-card group bg-white border border-[#E7E2D6] overflow-hidden"
                >
                  <div className="relative overflow-hidden h-64 bg-[#F5F2EB]">
                    <img
                      src={imgOf(item)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A38]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.button
                      onClick={() => removeFromWishlist(item._id)}
                      whileTap={{ scale: 0.9 }}
                      title="Remove from wishlist"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-[#9B4B3E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                    >
                      <Trash2 size={14} />
                    </motion.button>

                    <div className="wl-actions absolute inset-x-0 bottom-0 p-4">
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 bg-white py-3 text-xs uppercase tracking-widest text-[#1E2A38] hover:bg-[#AD8A54] hover:text-white transition-colors duration-300"
                      >
                        <ShoppingCart size={13} /> Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <Link to={`/product/${item._id}`} className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-display italic text-lg leading-snug line-clamp-1">{item.name}</p>
                      <ExternalLink size={13} className="text-[#C9C0AC] group-hover:text-[#AD8A54] transition-colors duration-300 mt-1.5 shrink-0" />
                    </Link>
                    <p className="font-display italic text-base text-[#1E2A38] mb-3">₹{item.price}</p>
                    <div className="wl-rule w-full" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}