import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, ChevronRight, SlidersHorizontal } from "lucide-react";
import ModernDropdown from "../../../../components/ModernDropdown";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useEffect, useState } from "react";
import { getProductsAPI } from "../../../../services/AllAPI";
import Header from "./ShoppingHeader";
import Footer from "./Footer";

/**
 * Shares the PrepVault design tokens used across Home / Cart:
 * ink #1E2A38 · ivory #FAF8F4 · paper #FFFFFF · gold #AD8A54
 * gold-tint #F1E9D8 · line #E7E2D6 · maroon #9B4B3E (sale accent)
 * Cormorant Garamond (display) + Jost (body/UI)
 */

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function CategoryPage() {
  const { type } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getProductsAPI(type);
      setProducts(result.data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [type]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[#FAF8F4] text-[#1E2A38]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`.font-display { font-family: 'Cormorant Garamond', serif; }`}</style>

      <Header />

      <div className="max-w-7xl mx-auto px-5 py-14">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#8A8272] uppercase tracking-wide mb-6">
          <Link to="/" className="hover:text-[#AD8A54] transition-colors duration-300">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#1E2A38] capitalize">{type}</span>
        </div>

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-8 border-b border-[#E7E2D6]">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-3">Collection</p>
            <h2 className="font-display italic text-4xl capitalize">
              {type} Collection
            </h2>
            {!loading && (
              <p className="text-sm text-[#6B7480] mt-3">
                {sortedProducts.length} {sortedProducts.length === 1 ? "piece" : "pieces"} curated for you
              </p>
            )}
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#AD8A54]" />
            <label className="text-xs uppercase tracking-widest text-[#6B7480] sr-only" htmlFor="sort">
              Sort
            </label>
            <ModernDropdown
              options={SORT_OPTIONS}
              value={sort}
              onChange={setSort}
              placeholder="Sort by"
              variant="minimal"
              className="w-52"
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-[#F0ECE3]" />
                <div className="h-3 w-3/4 bg-[#F0ECE3] mt-5 mx-auto" />
                <div className="h-3 w-1/3 bg-[#F0ECE3] mt-3 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="font-display italic text-3xl mb-3">Nothing here yet</p>
            <div className="h-px w-16 bg-[#AD8A54] mx-auto mb-5" />
            <p className="text-sm text-[#6B7480] max-w-sm mx-auto mb-8">
              We're still tailoring the {type} collection. Explore another category while it comes together.
            </p>
            <Link to="/">
              <button className="px-8 py-3.5 bg-[#1E2A38] text-[#FAF8F4] text-[13px] tracking-widest uppercase hover:bg-[#AD8A54] hover:text-[#1E2A38] transition-colors duration-500">
                Back to Home
              </button>
            </Link>
          </div>
        )}

        {/* PRODUCT GRID */}
        {!loading && sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {sortedProducts.map((item) => {
              const isWishlisted = wishlist.find((w) => w._id === item._id);
              const originalPrice = item.price;
              const discountedPrice = item.discount
                ? Math.round(originalPrice - (originalPrice * item.discount) / 100)
                : originalPrice;

              return (
                <div
                  key={item._id}
                  className="group bg-white overflow-hidden border border-[#E7E2D6] hover:border-[#AD8A54] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  {/* IMAGE */}
                  <div className="relative h-80 overflow-hidden bg-[#F5F2EB] flex-shrink-0">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                        alt={item.name}
                      />
                    </Link>

                    {/* DISCOUNT BADGE */}
                    {item.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-[#9B4B3E] text-white text-[10px] font-medium px-2.5 py-1 uppercase tracking-widest shadow-sm">
                        {item.discount}% Off
                      </div>
                    )}

                    {/* WISHLIST BUTTON */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className={`absolute top-4 right-4 rounded-full p-2.5 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100
                        ${isWishlisted ? "bg-[#1E2A38] text-white" : "bg-white text-[#1E2A38] hover:text-[#AD8A54]"}`}
                    >
                      <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* ADD TO CART OVERLAY BUTTON */}
                    <button
                      onClick={() => addToCart(item)}
                      className="absolute inset-x-0 bottom-4 mx-auto w-11/12 bg-[#1E2A38] text-white py-3 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:bg-[#AD8A54] hover:text-[#1E2A38] flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={13} />
                      Add to Cart
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-[#1E2A38] mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      {item.offers && (
                        <p className="text-[10px] text-[#7A8B5C] font-medium mb-2 uppercase tracking-tight truncate">
                          {item.offers}
                        </p>
                      )}
                    </div>

                    <div className="mt-3">
                      {item.discount > 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[#9A9382] line-through text-xs">₹{originalPrice}</span>
                          <span className="font-display italic text-xl text-[#1E2A38]">₹{discountedPrice}</span>
                        </div>
                      ) : (
                        <p className="font-display italic text-xl text-[#1E2A38]">₹{originalPrice}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}