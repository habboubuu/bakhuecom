import React from 'react';
import './ShoppingCart.css'; // تأكد من أنك قمت بإنشاء هذا الملف
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useShoppingCart } from '../../Context/ShoppingCartContext';
import CartItem from './CartItem';

const ShoppingCart = ({ isOpen }) => {

    const { cartItems, CloseCart, totalPrice  } = useShoppingCart();

    return (
        <div className={`shopping-cart ${isOpen ? 'open' : ''}`}>
            <div className="shopping-cart-header">
                <h2>Cart</h2>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={CloseCart} />
            </div>
            <div className="shopping-cart-body">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))
                ) : (
                    <p className="empty-cart">Your cart is empty</p>
                )}
            </div>
            <div className="shopping-cart-footer">
                <div className="total-price">
                    Total: ${totalPrice}
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
}

export default ShoppingCart;
