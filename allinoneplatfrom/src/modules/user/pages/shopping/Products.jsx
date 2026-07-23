import { useParams } from "react-router-dom";
import { useCart } from "../shopping/context/CartContext";
import { useEffect, useState } from "react";
import { getProductsAPI } from "../../../../services/AllAPI";
import toast from "react-hot-toast";

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductsAPI(category);
        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-widest text-center mb-12">
        {categoryTitle}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to your bag!`);
  };

  // Calculate discounted price
  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? Math.round(originalPrice - (originalPrice * product.discount / 100))
    : originalPrice;

  return (
    <div className="group relative border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white flex flex-col">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
            {product.discount}% OFF
          </div>
        )}

        {/* Add to Cart Button - Hover Reveal */}
        <button
          onClick={handleAddToCart}
          className="absolute inset-x-0 bottom-4 mx-auto w-11/12 bg-black text-white py-3 text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded shadow-2xl hover:bg-gray-900"
        >
          Add to Bag
        </button>
      </div>

      {/* Product Details */}
      <div className="p-6 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-800 mb-1 font-medium line-clamp-1">
            {product.name}
          </h3>
          {product.offers && (
            <p className="text-xs text-green-600 font-semibold mb-2 truncate">
              {product.offers}
            </p>
          )}
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-2 mb-3">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-auto">
          {product.discount > 0 ? (
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
              <span className="text-xl font-bold text-black">₹{discountedPrice}</span>
            </div>
          ) : (
            <p className="text-xl font-bold text-black">₹{originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
}