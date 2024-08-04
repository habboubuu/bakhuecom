import React from 'react';
import img from '../../Assets/1/images.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; 
import {faStar as solid } from "@fortawesome/free-solid-svg-icons";
import './UIproduct.css';
import { useShoppingCart } from '../../Context/ShoppingCartContext';

const UIproduct = (props) => {
    const stars = Math.min(props.rating, 5);
    const ShowGoldStars = Array.from({length: stars}).map((item , index) => (
        <FontAwesomeIcon key={index} icon={solid} color='gold'/>

    ));
    const ShowEmptyStars = Array.from({length:5 - stars}).map((item , index) => (
        <FontAwesomeIcon key={index} icon={regularStar} />

    ))

    const { increaseCartQuantity } = useShoppingCart();


  return (
    <div className='UIproduct'>
        <div className='ProductItems'>
            <h3>{(props.title).slice(0, 30)}</h3>
            <p>{(props.description).slice(0, 50)}</p>
            <div className='img-product'>
                <img src={props.img}/>
                <div className='discount-product'>
                    <p>-{props.sale}%</p>
                </div>
            </div>
            <div className='product-static'>
                <div>
                    <div className='stars-products'>
                        {ShowGoldStars}
                        {ShowEmptyStars}
                    </div>
                    <div className='Price-Product'>
                        <h2>{props.price}$</h2>
                        <p>{props.originalPrice}$</p>
                    </div>
                </div>
                <div className='product-cart'>
                    <FontAwesomeIcon icon={faBagShopping} className='UiBag-icon' onClick={() => increaseCartQuantity(props.id)} />
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default UIproduct
