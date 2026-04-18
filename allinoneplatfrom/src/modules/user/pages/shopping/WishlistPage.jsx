import { useWishlist } from "../shopping/context/WishlistContext";
import { useCart } from "../shopping/context/CartContext";
import { Link } from "react-router-dom";

export default function WishlistPage() {

    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">

            <h1 className="text-2xl font-semibold mb-6">
                 Your Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-lg">Your wishlist is empty </p>
                    <Link
                        to="/shopping"
                        className="text-blue-600 underline mt-2 inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-5">

                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center"
                        >

                            {/* IMAGE */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full md:w-40 h-40 object-cover rounded"
                            />

                            {/* DETAILS */}
                            <div className="flex-1 w-full">

                                <h2 className="text-lg font-medium">
                                    {item.name}
                                </h2>

                                <p className="text-green-600 font-semibold mt-1">
                                    ₹{item.price}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    In stock
                                </p>

                                {/* ACTIONS */}
                                <div className="flex flex-wrap gap-3 mt-4">

                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1.5 text-sm rounded"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(item._id)}
                                        className="border px-4 py-1.5 text-sm rounded hover:bg-gray-100"
                                    >
                                        Remove
                                    </button>

                                    <Link
                                        to={`/product/${item._id}`}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}