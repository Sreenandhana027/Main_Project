import { useWishlist } from "../shopping/context/WishlistContext";
import { useCart } from "../shopping/context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight, BookmarkX, ExternalLink } from "lucide-react";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const featured = wishlist[0];
    const rest = wishlist.slice(1);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .wishlist-root {
                    min-height: 100vh;
                    background: #f8f6f2;
                    font-family: 'DM Sans', sans-serif;
                    padding: 48px 24px 80px;
                }

                .wishlist-header {
                    max-width: 1100px;
                    margin: 0 auto 56px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    border-bottom: 1.5px solid #e0dbd0;
                    padding-bottom: 24px;
                }

                .wishlist-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.2rem, 5vw, 3.5rem);
                    font-weight: 800;
                    color: #1a1612;
                    line-height: 1;
                    letter-spacing: -1px;
                }

                .wishlist-title span {
                    font-style: italic;
                    color: #b5936b;
                }

                .wishlist-count {
                    font-size: 13px;
                    color: #9e9488;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-bottom: 6px;
                }

                /* FEATURED BIG CARD */
                .featured-card {
                    max-width: 1100px;
                    margin: 0 auto 40px;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 0;
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 4px 40px rgba(0,0,0,0.07);
                    position: relative;
                }

                @media (max-width: 720px) {
                    .featured-card { grid-template-columns: 1fr; }
                }

                .featured-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: #1a1612;
                    color: #f8f6f2;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    padding: 6px 14px;
                    border-radius: 100px;
                    z-index: 2;
                }

                .featured-img-wrap {
                    position: relative;
                    overflow: hidden;
                    height: 420px;
                }

                .featured-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .featured-card:hover .featured-img-wrap img {
                    transform: scale(1.04);
                }

                .featured-info {
                    padding: 44px 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .featured-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1a1612;
                    line-height: 1.2;
                    margin-bottom: 12px;
                }

                .featured-price {
                    font-size: 1.6rem;
                    font-weight: 600;
                    color: #b5936b;
                    margin-bottom: 8px;
                }

                .featured-stock {
                    font-size: 12px;
                    color: #7ab57a;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 32px;
                }

                .featured-stock::before {
                    content: '';
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #7ab57a;
                    display: inline-block;
                }

                .featured-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .btn-cart-featured {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    background: #1a1612;
                    color: #f8f6f2;
                    border: none;
                    border-radius: 12px;
                    padding: 16px 24px;
                    font-size: 14px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.15s;
                    letter-spacing: 0.03em;
                }

                .btn-cart-featured:hover {
                    background: #2d2620;
                    transform: translateY(-1px);
                }

                .featured-secondary {
                    display: flex;
                    gap: 10px;
                }

                .btn-remove {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: transparent;
                    border: 1.5px solid #e0dbd0;
                    border-radius: 12px;
                    padding: 12px;
                    font-size: 13px;
                    color: #9e9488;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-remove:hover {
                    border-color: #e8756a;
                    color: #e8756a;
                    background: #fff5f4;
                }

                .btn-view {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: transparent;
                    border: 1.5px solid #e0dbd0;
                    border-radius: 12px;
                    padding: 12px;
                    font-size: 13px;
                    color: #9e9488;
                    font-family: 'DM Sans', sans-serif;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .btn-view:hover {
                    border-color: #b5936b;
                    color: #b5936b;
                    background: #fdf8f3;
                }

                /* GRID CARDS */
                .grid-section {
                    max-width: 1100px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }

                .grid-card {
                    background: #fff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 2px 20px rgba(0,0,0,0.05);
                    transition: box-shadow 0.3s, transform 0.3s;
                }

                .grid-card:hover {
                    box-shadow: 0 8px 40px rgba(0,0,0,0.10);
                    transform: translateY(-3px);
                }

                .grid-img-wrap {
                    position: relative;
                    height: 220px;
                    overflow: hidden;
                }

                .grid-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .grid-card:hover .grid-img-wrap img {
                    transform: scale(1.06);
                }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(26,22,18,0.5) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    display: flex;
                    align-items: flex-end;
                    padding: 16px;
                }

                .grid-card:hover .grid-overlay {
                    opacity: 1;
                }

                .overlay-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #1a1612;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: background 0.2s;
                }

                .overlay-btn:hover { background: #f8f6f2; }

                .grid-info {
                    padding: 18px 20px 20px;
                }

                .grid-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: #1a1612;
                    margin-bottom: 6px;
                    line-height: 1.3;
                }

                .grid-price {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #b5936b;
                    margin-bottom: 14px;
                }

                .grid-actions {
                    display: flex;
                    gap: 8px;
                }

                .grid-btn-remove {
                    width: 36px; height: 36px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1.5px solid #e0dbd0;
                    border-radius: 10px;
                    background: transparent;
                    color: #c0b9ae;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .grid-btn-remove:hover {
                    border-color: #e8756a;
                    color: #e8756a;
                    background: #fff5f4;
                }

                .grid-btn-view {
                    width: 36px; height: 36px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1.5px solid #e0dbd0;
                    border-radius: 10px;
                    background: transparent;
                    color: #c0b9ae;
                    text-decoration: none;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .grid-btn-view:hover {
                    border-color: #b5936b;
                    color: #b5936b;
                    background: #fdf8f3;
                }

                /* EMPTY STATE */
                .empty-wrap {
                    max-width: 420px;
                    margin: 80px auto;
                    text-align: center;
                }

                .empty-icon {
                    width: 80px; height: 80px;
                    margin: 0 auto 24px;
                    background: #fff;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
                }

                .empty-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #1a1612;
                    margin-bottom: 10px;
                }

                .empty-sub {
                    font-size: 14px;
                    color: #9e9488;
                    margin-bottom: 28px;
                    line-height: 1.6;
                }

                .empty-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #1a1612;
                    color: #f8f6f2;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: 600;
                    transition: background 0.2s, transform 0.15s;
                }

                .empty-link:hover {
                    background: #2d2620;
                    transform: translateY(-1px);
                }
            `}</style>

            <div className="wishlist-root">

                {/* HEADER */}
                <div className="wishlist-header">
                    <div>
                        <p className="wishlist-count">Curated Collection</p>
                        <h1 className="wishlist-title">My <span>Wishlist</span></h1>
                    </div>
                    {wishlist.length > 0 && (
                        <p style={{ fontSize: 14, color: "#9e9488", fontWeight: 500 }}>
                            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                        </p>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="empty-wrap">
                        <div className="empty-icon">
                            <BookmarkX size={36} color="#c0b9ae" />
                        </div>
                        <h2 className="empty-title">Nothing saved yet</h2>
                        <p className="empty-sub">Browse our collection and save the pieces that speak to you.</p>
                        <Link to="/shopping" className="empty-link">
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* FEATURED FIRST ITEM */}
                        {featured && (
                            <motion.div
                                className="featured-card"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="featured-badge">✦ Top Pick</span>
                                <div className="featured-img-wrap">
                                    <img src={featured.image} alt={featured.name} />
                                </div>
                                <div className="featured-info">
                                    <div>
                                        <h2 className="featured-name">{featured.name}</h2>
                                        <p className="featured-price">₹{featured.price}</p>
                                        <p className="featured-stock">In Stock</p>
                                    </div>
                                    <div className="featured-actions">
                                        <button className="btn-cart-featured" onClick={() => addToCart(featured)}>
                                            <ShoppingCart size={16} /> Add to Cart
                                        </button>
                                        <div className="featured-secondary">
                                            <button className="btn-remove" onClick={() => removeFromWishlist(featured._id)}>
                                                <Trash2 size={14} /> Remove
                                            </button>
                                            <Link to={`/product/${featured._id}`} className="btn-view">
                                                <ExternalLink size={14} /> Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* REST AS GRID */}
                        {rest.length > 0 && (
                            <div className="grid-section">
                                <AnimatePresence>
                                    {rest.map((item, i) => (
                                        <motion.div
                                            key={item._id}
                                            className="grid-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.35, delay: i * 0.07 }}
                                        >
                                            <div className="grid-img-wrap">
                                                <img src={item.image} alt={item.name} />
                                                <div className="grid-overlay">
                                                    <button className="overlay-btn" onClick={() => addToCart(item)}>
                                                        <ShoppingCart size={15} /> Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid-info">
                                                <p className="grid-name">{item.name}</p>
                                                <p className="grid-price">₹{item.price}</p>
                                                <div className="grid-actions">
                                                    <button className="grid-btn-remove" onClick={() => removeFromWishlist(item._id)} title="Remove">
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <Link to={`/product/${item._id}`} className="grid-btn-view" title="View Details">
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}