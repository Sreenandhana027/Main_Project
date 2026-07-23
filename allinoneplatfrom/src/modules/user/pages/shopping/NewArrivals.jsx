import { useState, useEffect } from "react";
import { Heart, Search, ShoppingBag, User, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { getFilteredNewArrivalsAPI } from "../../../../services/AllAPI";
import ModernDropdown from "../../../../components/ModernDropdown";

/**
 * Shares the PrepVault design tokens used across Home / Cart / Category:
 * ink #1E2A38 · ivory #FAF8F4 · paper #FFFFFF · gold #AD8A54
 * gold-tint #F1E9D8 · line #E7E2D6 · Cormorant Garamond + Jost
 */

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];
const categories = ["Outerwear", "Knitwear", "Tailoring", "Shirts"];

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const { wishlist, addToWishlist } = useWishlist();
  const { cart, addToCart } = useCart(); // ⬅ fix: addToCart was missing, causing the ReferenceError

  useEffect(() => {
    if (document.getElementById("prepvault-fonts")) return;
    const link = document.createElement("link");
    link.id = "prepvault-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  // ─── Fetch from API whenever filters or sort changes ───
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getFilteredNewArrivalsAPI(
          selectedCategories.join(","), // e.g. "Shirts,Outerwear"
          sortOption,
          {} // reqHeader — add token here if needed: { Authorization: `Bearer ${token}` }
        );

        if (result.status === 200) {
          setProducts(result.data.data); // { success, count, data: [...] }
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, sortOption]); // re-fetch on filter/sort change

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  return (
    <div className="bg-[#FAF8F4] min-h-screen text-[#1E2A38]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`.font-display { font-family: 'Cormorant Garamond', serif; }`}</style>

      {/* HEADER */}
      <header className="border-b border-[#E7E2D6] sticky top-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display italic text-2xl tracking-wide">PrepVault</Link>

          <nav className="hidden md:flex gap-9 text-[13px] tracking-wide uppercase text-[#3E4954]">
            <a href="#" className="hover:text-[#AD8A54] transition-colors duration-300">Collections</a>
            <Link to="/category/men" className="hover:text-[#AD8A54] transition-colors duration-300">Men</Link>
            <Link to="/category/women" className="hover:text-[#AD8A54] transition-colors duration-300">Women</Link>
            <Link to="/category/accessories" className="hover:text-[#AD8A54] transition-colors duration-300">Accessories</Link>
            <a href="#" className="hover:text-[#AD8A54] transition-colors duration-300">Editorial</a>
          </nav>

          <div className="flex items-center gap-5 text-[#1E2A38]">
            <Search size={18} className="hover:text-[#AD8A54] transition-colors duration-300 cursor-pointer" />

            <Link to="/wishlist" className="relative hover:text-[#AD8A54] transition-colors duration-300">
              <Heart size={18} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#AD8A54] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative hover:text-[#AD8A54] transition-colors duration-300">
              <ShoppingBag size={18} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#AD8A54] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <User size={18} className="hover:text-[#AD8A54] transition-colors duration-300 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-12 gap-10">

        {/* FILTERS SIDEBAR */}
        <aside className="col-span-12 md:col-span-3">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E7E2D6]">
            <h3 className="font-display italic text-2xl">Filters</h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-widest text-[#9B4B3E] hover:text-[#AD8A54] transition-colors duration-300 flex items-center gap-1"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#AD8A54] mb-4">Category</p>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 accent-[#1E2A38] cursor-pointer"
                  />
                  <span className="text-sm text-[#3E4954] group-hover:text-[#AD8A54] transition-colors duration-300">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#AD8A54] mb-4">Size</p>
            <div className="grid grid-cols-4 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className="border border-[#E7E2D6] py-2 text-xs text-[#3E4954] hover:border-[#AD8A54] hover:text-[#AD8A54] transition-colors duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <section className="col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-[#E7E2D6]">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-3">Just In</p>
              <h1 className="font-display italic text-4xl">New Arrivals</h1>
              <p className="text-[#6B7480] text-sm mt-2">
                {loading ? "Loading..." : `Showing ${products.length} pieces`}
              </p>
            </div>

            <ModernDropdown
              options={SORT_OPTIONS}
              value={sortOption}
              onChange={setSortOption}
              placeholder="Sort by"
              variant="default"
              className="w-56"
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 size={28} className="animate-spin text-[#AD8A54]" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-24">
              <p className="text-[#9B4B3E] text-base">{error}</p>
              <button
                onClick={() => setSortOption(sortOption)}
                className="mt-4 text-xs uppercase tracking-widest text-[#1E2A38] border-b border-[#1E2A38] pb-1 hover:text-[#AD8A54] hover:border-[#AD8A54] transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p) => {
                const isWishlisted = wishlist?.some((w) => w._id === p._id);
                return (
                  <div
                    key={p._id}
                    className="bg-white border border-[#E7E2D6] hover:border-[#AD8A54] overflow-hidden group hover:shadow-xl transition-all duration-500 relative"
                  >
                    {p.tag && (
                      <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-medium bg-white px-3 py-1.5 shadow-sm text-[#1E2A38]">
                        {p.tag}
                      </span>
                    )}

                    <div className="relative">
                      <button
                        onClick={() => addToWishlist(p)}
                        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-md transition-all duration-300
                          ${isWishlisted
                            ? "bg-[#1E2A38] text-white opacity-100"
                            : "bg-white text-[#1E2A38] opacity-0 group-hover:opacity-100 hover:text-[#AD8A54]"}`}
                      >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>

                      <Link to={`/newarrival/${p._id}`}>
                        <div className="overflow-hidden h-80 bg-[#F5F2EB]">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                          />
                        </div>
                      </Link>

                      {/* Add to Cart overlay button */}
                      <button
                        onClick={() => addToCart(p)}
                        className="absolute inset-x-0 bottom-4 mx-auto w-11/12 bg-[#1E2A38] text-white py-3 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:bg-[#AD8A54] hover:text-[#1E2A38] flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={13} />
                        Add to Cart
                      </button>
                    </div>

                    <Link to={`/newarrival/${p._id}`} className="block">
                      <div className="p-5">
                        <p className="text-sm text-[#1E2A38] leading-tight mb-2 line-clamp-2">
                          {p.name}
                        </p>
                        <p className="font-display italic text-xl text-[#1E2A38]">
                          ${p.price}.00
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display italic text-3xl mb-3">No pieces match yet</p>
              <div className="h-px w-16 bg-[#AD8A54] mx-auto mb-6" />
              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-widest text-[#1E2A38] border-b border-[#1E2A38] pb-1 hover:text-[#AD8A54] hover:border-[#AD8A54] transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FAF8F4] border-t border-[#AD8A54]/40 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between text-xs text-[#8A8272] uppercase tracking-wide gap-4">
          <p>© 2026 PrepVault. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">About</span>
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Shipping</span>
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Sustainability</span>
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}