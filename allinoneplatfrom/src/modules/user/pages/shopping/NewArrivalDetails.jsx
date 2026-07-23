import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share2, ArrowLeft, Star, ShoppingCart, Check, Truck, RotateCcw, Shield, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { getNewArrivalByIdAPI } from "../../../../services/AllAPI";
import { motion, AnimatePresence } from "framer-motion";

export default function NewArrivalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openSection, setOpenSection] = useState("desc");
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = wishlist?.some((w) => w._id === id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setLoadError(null);

      const result = await getNewArrivalByIdAPI(id, {});
      console.log("products",result);
      

      // Normalise: new-arrivals use `img` while the detail page expects `image`
      const raw = result?.data?.data || result?.data;

      if (!raw || !raw._id) {
        // API responded but didn't actually return a product (bad id, wrong shape, etc.)
        setLoadError("We couldn't find that product.");
        setProduct(null);
        return;
      }

      setProduct({
        ...raw,
        image: raw.image || raw.img, // map `img` → `image` if needed
      });
    } catch (err) {
      console.log(err);
      setLoadError(
        err?.response?.status === 404
          ? "This item is no longer available."
          : "Something went wrong loading this product."
      );
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const pageShell = (content) => (
    <div style={{
      minHeight: "100vh", display: "grid", placeItems: "center",
      background: "#f8f6f2", fontFamily: "'DM Sans', sans-serif", padding: "24px"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      {content}
    </div>
  );

  // LOADING STATE
  if (loading) {
    return pageShell(
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#b5936b" }}
      >
        Loading...
      </motion.div>
    );
  }

  // ERROR / NOT FOUND STATE — this replaces what used to be an infinite spinner
  if (loadError || !product) {
    return pageShell(
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <AlertCircle size={32} color="#e8756a" style={{ margin: "0 auto 16px" }} />
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.5rem",
          color: "#1a1612", marginBottom: 8, fontWeight: 700
        }}>
          {loadError || "Product not found"}
        </p>
        <p style={{ color: "#6b6259", fontSize: 14, marginBottom: 28 }}>
          It may have sold out, been renamed, or the link may be out of date.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={fetchProduct}
            style={{
              background: "#1a1612", color: "#f8f6f2", border: "none",
              borderRadius: 14, padding: "12px 22px", fontSize: 13,
              fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer"
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/newarrival")}
            style={{
              background: "#fff", color: "#1a1612", border: "1.5px solid #e0dbd0",
              borderRadius: 14, padding: "12px 22px", fontSize: 13,
              fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer"
            }}
          >
            Back to New Arrivals
          </button>
        </div>
      </div>
    );
  }

  const colors = ["#111827", "#d6b98c", "#6b7280", "#fefce8"];
  const sizes = ["S", "M", "L", "XL"];

  const discountedPrice = product.discount > 0
    ? Math.round(product.price - (product.price * product.discount / 100))
    : product.price;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pd-root {
          min-height: 100vh;
          background: #f8f6f2;
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 100px;
        }

        /* TOP BAR */
        .pd-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(248,246,242,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e2d8;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pd-back {
          display: flex; align-items: center; gap: 8px;
          background: #fff;
          border: 1.5px solid #e0dbd0;
          border-radius: 100px;
          padding: 8px 16px 8px 12px;
          font-size: 13px;
          font-weight: 600;
          color: #1a1612;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .pd-back:hover { background: #1a1612; color: #f8f6f2; border-color: #1a1612; }

        .pd-topbar-actions { display: flex; gap: 10px; }

        .pd-icon-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: #fff;
          border: 1.5px solid #e0dbd0;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          color: #9e9488;
        }
        .pd-icon-btn:hover { border-color: #1a1612; color: #1a1612; }
        .pd-icon-btn.wishlisted { border-color: #e8756a; background: #fff5f4; color: #e8756a; }

        /* LAYOUT */
        .pd-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 0;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .pd-layout { grid-template-columns: 1fr; gap: 24px; padding: 24px 16px 0; }
        }

        /* IMAGE SIDE */
        .pd-img-col { position: sticky; top: 80px; }

        .pd-img-main {
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 8px 48px rgba(0,0,0,0.10);
          position: relative;
        }

        .pd-img-main img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .pd-img-main:hover img { transform: scale(1.04); }

        .pd-badge {
          position: absolute;
          top: 20px; left: 20px;
          background: #e8756a;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .pd-tag-badge {
          position: absolute;
          top: 20px; left: 20px;
          background: #1a1612;
          color: #f8f6f2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .pd-rating-badge {
          position: absolute;
          bottom: 20px; right: 20px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 8px 16px;
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700;
          color: #1a1612;
          box-shadow: 0 4px 20px rgba(0,0,0,0.10);
        }

        /* INFO SIDE */
        .pd-info-col { padding-top: 8px; }

        .pd-category {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b5936b;
          margin-bottom: 12px;
        }

        .pd-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #1a1612;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
        }

        /* PRICE */
        .pd-price-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;
        }

        .pd-price-main {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1612;
        }

        .pd-price-original {
          font-size: 1.1rem;
          color: #c0b9ae;
          text-decoration: line-through;
        }

        .pd-discount-tag {
          background: #fdf3ee;
          color: #e8756a;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        /* DIVIDER */
        .pd-divider {
          height: 1px;
          background: #e8e2d8;
          margin: 24px 0;
        }

        /* COLOR */
        .pd-section-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9e9488;
          margin-bottom: 14px;
        }

        .pd-colors { display: flex; gap: 12px; margin-bottom: 28px; }

        .pd-color-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          outline-offset: 3px;
          padding: 0;
        }

        .pd-color-btn.active { outline: 2px solid #b5936b; }

        /* SIZE */
        .pd-sizes { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }

        .pd-size-btn {
          min-width: 52px; height: 48px;
          border-radius: 12px;
          border: 1.5px solid #e0dbd0;
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          color: #1a1612;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          padding: 0 16px;
        }

        .pd-size-btn:hover { border-color: #b5936b; }
        .pd-size-btn.active { background: #1a1612; color: #f8f6f2; border-color: #1a1612; }

        /* ACTIONS */
        .pd-actions { display: flex; gap: 12px; margin-bottom: 28px; }

        .pd-cart-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #1a1612;
          color: #f8f6f2;
          border: none;
          border-radius: 14px;
          padding: 16px 24px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }

        .pd-cart-btn:hover { background: #2d2620; transform: translateY(-1px); }
        .pd-cart-btn.added { background: #7ab57a; }

        .pd-wish-btn {
          width: 54px; height: 54px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid #e0dbd0;
          border-radius: 14px;
          background: #fff;
          cursor: pointer;
          transition: all 0.25s;
          color: #c0b9ae;
          flex-shrink: 0;
        }

        .pd-wish-btn:hover { border-color: #e8756a; color: #e8756a; background: #fff5f4; }
        .pd-wish-btn.active { background: #fff5f4; border-color: #e8756a; color: #e8756a; }

        /* TRUST BADGES */
        .pd-trust {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        .pd-trust-item {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          background: #fff;
          border: 1px solid #e8e2d8;
          border-radius: 12px;
          padding: 14px 8px;
          text-align: center;
        }

        .pd-trust-label {
          font-size: 11px;
          font-weight: 600;
          color: #9e9488;
          letter-spacing: 0.05em;
        }

        /* ACCORDION */
        .pd-accordion { border-top: 1px solid #e8e2d8; }

        .pd-acc-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0;
          background: none; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #1a1612;
          cursor: pointer;
          border-bottom: 1px solid #e8e2d8;
        }

        .pd-acc-btn:last-child { border-bottom: none; }

        .pd-acc-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #f0ebe3;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          color: #b5936b;
          font-weight: 700;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .pd-acc-content {
          padding: 0 0 18px;
          font-size: 14px;
          line-height: 1.7;
          color: #6b6259;
          border-bottom: 1px solid #e8e2d8;
        }

        /* MOBILE FIXED BAR */
        .pd-mobile-bar {
          position: fixed;
          inset-x: 0; bottom: 0;
          background: rgba(248,246,242,0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid #e8e2d8;
          padding: 16px 20px;
          display: flex; gap: 12px;
          z-index: 100;
        }

        @media (min-width: 900px) {
          .pd-mobile-bar { display: none; }
        }
      `}</style>

      <div className="pd-root">

        {/* TOP BAR */}
        <div className="pd-topbar">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="pd-topbar-actions">
            <button
              className={`pd-icon-btn ${isWishlisted ? "wishlisted" : ""}`}
              onClick={handleWishlist}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} fill={isWishlisted ? "#e8756a" : "none"} />
            </button>
            <button className="pd-icon-btn" title="Share">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="pd-layout">

          {/* IMAGE COLUMN */}
          <motion.div
            className="pd-img-col"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pd-img-main">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <span className="pd-badge">{product.discount}% OFF</span>
              )}
              {!product.discount && product.tag && (
                <span className="pd-tag-badge">{product.tag}</span>
              )}
              <div className="pd-rating-badge">
                <Star size={14} fill="#f5a623" color="#f5a623" />
                {product.rating || "4.5"}
              </div>
            </div>
          </motion.div>

          {/* INFO COLUMN */}
          <motion.div
            className="pd-info-col"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.category && (
              <p className="pd-category">{product.category}</p>
            )}

            <h1 className="pd-name">{product.name}</h1>

            {/* PRICE */}
            <div className="pd-price-row">
              <span className="pd-price-main">${discountedPrice}.00</span>
              {product.discount > 0 && (
                <>
                  <span className="pd-price-original">${product.price}.00</span>
                  <span className="pd-discount-tag">{product.discount}% off</span>
                </>
              )}
            </div>

            <div className="pd-divider" />

            {/* COLOR */}
            <p className="pd-section-label">Color</p>
            <div className="pd-colors">
              {colors.map((c, i) => (
                <button
                  key={i}
                  className={`pd-color-btn ${selectedColor === i ? "active" : ""}`}
                  style={{ backgroundColor: c, border: "3px solid transparent" }}
                  onClick={() => setSelectedColor(i)}
                />
              ))}
            </div>

            {/* SIZE */}
            <p className="pd-section-label">Size</p>
            <div className="pd-sizes">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`pd-size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="pd-actions">
              <button
                className={`pd-cart-btn ${addedToCart ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Check size={18} /> Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <ShoppingCart size={18} /> Add to Cart — ${discountedPrice}.00
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className={`pd-wish-btn ${isWishlisted ? "active" : ""}`}
                onClick={handleWishlist}
                title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? "#e8756a" : "none"} />
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="pd-trust">
              <div className="pd-trust-item">
                <Truck size={18} color="#b5936b" />
                <span className="pd-trust-label">Free Delivery</span>
              </div>
              <div className="pd-trust-item">
                <RotateCcw size={18} color="#b5936b" />
                <span className="pd-trust-label">Easy Returns</span>
              </div>
              <div className="pd-trust-item">
                <Shield size={18} color="#b5936b" />
                <span className="pd-trust-label">Secure Pay</span>
              </div>
            </div>

            {/* ACCORDION */}
            <div className="pd-accordion">
              <AccordionItem
                title="Product Details"
                isOpen={openSection === "desc"}
                onToggle={() => setOpenSection(openSection === "desc" ? "" : "desc")}
              >
                Premium quality {product.category?.toLowerCase()} piece from our New Arrivals collection.
                Crafted with attention to detail and designed for contemporary style.
              </AccordionItem>
              <AccordionItem
                title="Shipping & Returns"
                isOpen={openSection === "ship"}
                onToggle={() => setOpenSection(openSection === "ship" ? "" : "ship")}
              >
                Free shipping on orders above $99. Returns accepted within 7 days of delivery.
              </AccordionItem>
            </div>

          </motion.div>
        </div>

        {/* MOBILE FIXED BAR */}
        <div className="pd-mobile-bar">
          <button
            className={`pd-wish-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleWishlist}
          >
            <Heart size={20} fill={isWishlisted ? "#e8756a" : "none"} />
          </button>
          <button
            className={`pd-cart-btn ${addedToCart ? "added" : ""}`}
            style={{ flex: 1 }}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <><Check size={16} /> Added to Cart!</>
            ) : (
              <><ShoppingCart size={16} /> Add to Cart — ${discountedPrice}.00</>
            )}
          </button>
        </div>

      </div>
    </>
  );
}

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div>
      <button className="pd-acc-btn" onClick={onToggle}>
        <span>{title}</span>
        <span className="pd-acc-icon" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pd-acc-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}