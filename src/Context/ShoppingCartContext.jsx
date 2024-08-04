import React, { createContext, useContext, useEffect, useState } from 'react';
import ShoppingCart from '../Components/Website/ShoppingCart';

const ShoppingCartContext = createContext({});

const intialCartItems = localStorage.getItem("shopping-cart") ? JSON.parse(localStorage.getItem("shopping-cart")) : [];

const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(intialCartItems);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const OpenCart = () => {
        setIsOpen(true);
    }

    const CloseCart = () => {
        setIsOpen(false);
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );
    const getItemsQuantity = (id) => {
        return cartItems.find((item) => item.id === id)?.quantity || 1;
    }

    const increaseCartQuantity = (id, price) => {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1, price }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            return currItems.map((item) => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            });
        });
    }

    const removeItemFromCart = (id) => {
        setCartItems((currentItem) => currentItem.filter((item) => item.id !== id));
    }

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <ShoppingCartContext.Provider value={{ cartItems, getItemsQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, OpenCart, CloseCart, cartQuantity, totalPrice }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartProvider;

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};
