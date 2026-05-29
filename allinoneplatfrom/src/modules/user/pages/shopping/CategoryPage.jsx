import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useEffect, useState } from "react";
import { getProductsAPI } from "../../../../services/AllAPI";
import Header from "./ShoppingHeader";
import Footer from "./Footer";

export default function CategoryPage() {

  const { type } = useParams();

  const { addToCart } = useCart();

  //  FIX: get toggleWishlist also
  const { toggleWishlist, wishlist } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProductsAPI(type);
      setProducts(result.data || []);
    };

    fetchProducts();
  }, [type]);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-5 py-14">

        <div className="mb-10">
          <h2 className="text-3xl font-semibold capitalize">
            {type} Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

          {products.map((item) => {
            const isWishlisted = wishlist.find((w) => w._id === item._id);
            const originalPrice = item.price;
            const discountedPrice = item.discount 
              ? Math.round(originalPrice - (originalPrice * item.discount / 100)) 
              : originalPrice;

            return (
              <div
                key={item._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* IMAGE */}
                <div className="relative h-80 overflow-hidden bg-gray-50 flex-shrink-0">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.name}
                    />
                  </Link>
                  {/* DISCOUNT BADGE */}
                  {item.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                      {item.discount}% OFF
                    </div>
                  )}

                  {/*  WISHLIST BUTTON */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`absolute top-4 right-4 rounded-full p-2.5 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100
                      ${isWishlisted ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"}`}
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  {/* ADD TO CART OVERLAY BUTTON */}
                  <button
                    onClick={() => addToCart(item)}
                    className="absolute inset-x-0 bottom-4 mx-auto w-11/12 bg-black text-white py-3 text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded shadow-2xl hover:bg-gray-900"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* INFO */}
                <div className="p-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    {item.offers && (
                      <p className="text-[10px] text-green-600 font-bold mb-2 uppercase tracking-tight truncate">
                        {item.offers}
                      </p>
                    )}
                  </div>

                  <div className="mt-3">
                    {item.discount > 0 ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400 line-through text-xs font-medium">₹{originalPrice}</span>
                        <span className="text-lg font-bold text-black font-serif">₹{discountedPrice}</span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-black font-serif">₹{originalPrice}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
      <Footer/>
    </>
  );
}