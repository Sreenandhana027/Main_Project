import { useState, useEffect } from "react";
import { Heart, Search, ShoppingBag, User, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { getFilteredNewArrivalsAPI } from "../../../../services/AllAPI";


const categories = ["Outerwear", "Knitwear", "Tailoring", "Shirts"];

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const { wishlist, addToWishlist } = useWishlist();
  const { cart } = useCart();

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
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="font-semibold tracking-wide">PrepVault</div>

          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#">Collections</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Accessories</a>
            <a href="#">Editorial</a>
          </nav>

          <div className="flex items-center gap-4">
            <Search size={18} />

            <Link to="/wishlist" className="relative">
              <Heart size={18} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingBag size={18} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <User size={18} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-12 gap-10">

        {/* FILTERS SIDEBAR */}
        <aside className="col-span-12 md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-xl">Filters</h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <X size={16} /> Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <p className="font-medium mb-3 text-gray-700">Category</p>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-5 h-5 accent-black"
                  />
                  <span className="text-lg">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-10">
            <p className="font-medium mb-3 text-gray-700">Size</p>
            <div className="grid grid-cols-4 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className="border border-gray-300 py-2 text-sm hover:border-black transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <section className="col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">New Arrivals</h1>
              <p className="text-gray-500 mt-1">
                {loading ? "Loading..." : `Showing ${products.length} products`}
              </p>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 px-5 py-3 rounded-lg text-sm focus:outline-none focus:border-black"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={32} className="animate-spin text-gray-400" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={() => setSortOption(sortOption)}
                className="mt-4 text-black underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Products Grid — same design as original */}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {p.tag && (
                    <span className="absolute top-4 left-4 z-10 text-xs font-medium bg-white px-3 py-1 rounded-full shadow">
                      {p.tag}
                    </span>
                  )}

                  <div className="relative">
                    <button
                      onClick={() => addToWishlist(p)}
                      className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <Heart size={18} />
                    </button>

                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <p className="font-medium text-base leading-tight mb-2 line-clamp-2">
                      {p.name}
                    </p>
                    <p className="text-xl font-semibold text-black">
                      ${p.price}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No products found</p>
              <button onClick={clearFilters} className="mt-6 text-black underline">
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between text-sm text-gray-500 gap-4">
          <p>© 2026 LUXE CLOTHING. All rights reserved.</p>
          <div className="flex gap-6">
            <span>About</span>
            <span>Shipping</span>
            <span>Sustainability</span>
            <span>Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}