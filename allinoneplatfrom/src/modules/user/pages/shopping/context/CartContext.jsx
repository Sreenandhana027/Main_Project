import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    //  Load from localStorage
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    //  Save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //  ADD TO CART (WITH TOAST)
    const addToCart = (product) => {

        const exists = cart.find(item => item._id === product._id);

        if (exists) {
            setCart(
                cart.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );

            toast.success(`${product.name} quantity updated `);
        } else {
            setCart([...cart, { ...product, qty: 1 }]);

            toast.success(`${product.name} added to cart `);
        }
    };

    // REMOVE FROM CART
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));

        toast.error("Item removed from cart ");
    };

    //  UPDATE QUANTITY
    const updateQty = (id, type) => {
        setCart(
            cart.map(item =>
                item._id === id
                    ? {
                        ...item,
                        qty:
                            type === "inc"
                                ? item.qty + 1
                                : Math.max(1, item.qty - 1)
                    }
                    : item
            )
        );
    };

    // TOTAL PRICE
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQty, total }}
        >
            {children}
        </CartContext.Provider>
    );
};