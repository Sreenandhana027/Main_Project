import { Link } from "react-router-dom"
import { Heart, ShoppingBag, Search, User } from "lucide-react"
import { useCart } from "./context/CartContext"
import { useWishlist } from "./context/WishlistContext"

export default function Header() {
    const { cart } = useCart()
    const { wishlist } = useWishlist()

    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="font-semibold tracking-wide">PrepVault</div>

                <nav className="hidden md:flex gap-8 text-sm">
                    <Link to="/category/men">Men</Link>
                    <Link to="/category/women">Women</Link>
                    <Link to="/category/accessories">Accessories</Link>
                    <Link to="/newarrival">New Arrivals</Link>
                    <Link to="/category/bags">Bags</Link>
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

                </div>
            </div>
        </header>
    )
}
