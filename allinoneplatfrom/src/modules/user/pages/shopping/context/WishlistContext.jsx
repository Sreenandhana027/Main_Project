import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {

    // ✅ Load from localStorage
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    // ✅ Save to localStorage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // ✅ ADD
    const addToWishlist = (item) => {
        const exists = wishlist.find((w) => w._id === item._id);

        if (!exists) {
            setWishlist([...wishlist, item]);

            toast.success(`${item.name} added to wishlist ❤️`, {
                position: "bottom-center",
            });
        } else {
            toast("Already in wishlist 💙", {
                position: "bottom-center",
            });
        }
    };

    // ✅ REMOVE
    const removeFromWishlist = (id) => {
        const removedItem = wishlist.find((w) => w._id === id);

        setWishlist(wishlist.filter((w) => w._id !== id));

        toast.error(`${removedItem?.name || "Item"} removed ❌`, {
            position: "bottom-center",
        });
    };

    // ✅ TOGGLE (BEST UX)
    const toggleWishlist = (item) => {
        const exists = wishlist.find((w) => w._id === item._id);

        if (exists) {
            removeFromWishlist(item._id);
        } else {
            addToWishlist(item);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}