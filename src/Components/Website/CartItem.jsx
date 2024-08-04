import React, { useEffect, useState } from 'react';
import { useShoppingCart } from '../../Context/ShoppingCartContext';
import axios from 'axios';
import { baseURL, PRODUCT } from '../../Api/api';
import Cookie from "cookie-universal";
import './CartItem.css';

const CartItem = ({ id, quantity }) => {
    const { removeItemFromCart } = useShoppingCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const cookie = Cookie();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseURL}/${PRODUCT}/${id}`, {
                    headers: {
                        Authorization: "Bearer " + cookie.get("e-commerce"),
                    }
                });
                setProduct(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setLoading(false);
            }
        };

        // Check if product data is already available
        if (!product) {
            fetchProduct();
        } else {
            setLoading(false);
        }
    }, [id, cookie, product]);

    if (loading) return <div>Loading...</div>;
    if (!product || !product.images[0]?.image) {
        return <div>Product not found</div>;
    }

    return (
        <div className="cart-item">
            <img
                src={product.images[0].image}
                alt={product.title}
                className="cart-item-img"
            />
            <div className="cart-item-details">
                <div className="cart-item-info">
                    <div className="cart-item-name">
                        {product.title}
                        {quantity > 1 && (
                            <span className="cart-item-quantity">
                                x{quantity}
                            </span>
                        )}
                    </div>
                    <div className="cart-item-price">
                        ${product.price}
                    </div>
                </div>
                <div className="cart-item-total">
                    ${product.price * quantity}
                </div>
            </div>
            <button className="cart-item-remove" onClick={() => removeItemFromCart(id)}>
                &times;
            </button>
        </div>
    );
};

export default CartItem;
