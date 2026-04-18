// src/modules/user/pages/shopping/Products.jsx
import { useParams } from "react-router-dom";
import { useCart } from "../shopping/context/CartContext"; // Adjust path if needed
import { Link } from "react-router-dom";

const allProducts = [
  // ===== BAGS =====
  { id: 1, name: "Executive Leather Bag", category: "bags", price: 2499, img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" },
  { id: 2, name: "Office Handbag", category: "bags", price: 1999, img: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg" },
  { id: 3, name: "Minimal Tote Bag", category: "bags", price: 1799, img: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg" },
  { id: 4, name: "Premium Leather Satchel", category: "bags", price: 3299, img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" },
  { id: 5, name: "Canvas Crossbody Bag", category: "bags", price: 1599, img: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg" },

  // ===== ACCESSORIES =====
  { id: 10, name: "Pearl Earrings", category: "accessories", price: 699, img: "https://images.pexels.com/photos/1413421/pexels-photo-1413421.jpeg" },
  { id: 11, name: "Classic Watch", category: "accessories", price: 2999, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
  { id: 12, name: "Leather Belt", category: "accessories", price: 899, img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" },
  { id: 13, name: "Gold Necklace", category: "accessories", price: 1499, img: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg" },
  { id: 14, name: "Sunglasses", category: "accessories", price: 2199, img: "https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg" },

  // ===== CLOTHING =====
  { id: 16, name: "Formal Blazer", category: "clothing", price: 3999, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
  { id: 17, name: "Retro Office Dress", category: "clothing", price: 2999, img: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg" },
  { id: 18, name: "Tailored Suit", category: "clothing", price: 6499, img: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg" },
  { id: 19, name: "Casual Shirt", category: "clothing", price: 1899, img: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg" },
  { id: 20, name: "Slim Fit Trousers", category: "clothing", price: 2499, img: "https://images.pexels.com/photos/157675/fashion-man-person-157675.jpeg" },

  // ===== SHOES =====
  { id: 24, name: "Classic Heels", category: "shoes", price: 3499, img: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
  { id: 25, name: "Office Loafers", category: "shoes", price: 2899, img: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg" },
  { id: 26, name: "Formal Pumps", category: "shoes", price: 3299, img: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg" },
  { id: 27, name: "Leather Brogues", category: "shoes", price: 4199, img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" },
  { id: 28, name: "Running Sneakers", category: "shoes", price: 3799, img: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
];

export default function Products() {
  const { category } = useParams();

  const filteredProducts = allProducts.filter(
    (product) => product.category === category
  );

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-widest text-center mb-12">
        {categoryTitle}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
    
    // Optional: You can replace alert with toast later
    alert(`${product.name} added to your bag!`);
  };

  return (
    <div className="group relative border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-50">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Add to Cart Button - Hover Reveal */}
        <button
          onClick={handleAddToCart}
          className="absolute inset-x-0 bottom-4 mx-auto w-48 bg-black text-white py-3 text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-md shadow-lg hover:bg-gray-900"
        >
          Add to Bag
        </button>
      </div>

      {/* Product Details */}
      <div className="p-6 text-center">
        <h3 className="text-sm uppercase tracking-wide text-gray-700 mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-semibold text-black">₹{product.price}</p>
      </div>
    </div>
  );
}