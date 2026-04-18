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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {products.map((item) => {

            const isWishlisted = wishlist.find(
              (w) => w._id === item._id
            );

            return (
              <div
                key={item._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >

                {/* IMAGE */}
                <div className="relative">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      className="h-[260px] w-full object-cover"
                      alt={item.name}
                    />
                  </Link>

                  {/*  WISHLIST BUTTON */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`absolute top-3 right-3 rounded-full p-2 shadow transition 
                      ${isWishlisted ? "bg-black text-white" : "bg-white"}`}
                  >
                    <Heart size={16} />
                  </button>
                </div>

                {/* INFO */}
                <div className="p-4">

                  <h3 className="text-sm font-medium">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    ${item.price}
                  </p>

                  {/*  ADD TO CART */}
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>

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