import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Website/Navbar';
import Footer from '../../Components/Website/Footer';
import './ProductsDetails.css';
import axios from "axios";
import Cookie from "cookie-universal";
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL, PRODUCT } from '../../Api/api';
import TopRated from '../../Components/UIComponents/ShowTopRated';
import { useShoppingCart } from '../../Context/ShoppingCartContext';


const ProductsDetails = () => {

    //State
    
    const [product, setProduct] = useState([]);
    const [activeImage, setActiveImage] = useState();

    const { cartItems, getItemsQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useShoppingCart();


    const cookie = Cookie();
    const { id } = useParams();
    let quantity = getItemsQuantity(id);

    useEffect(() => {
        axios.get(`${baseURL}/${PRODUCT}/${id}`, {headers: {
            Authorization: "Bearer " + cookie.get("e-commerce"),
        }})
        .then((res) => {
          //console.log(res.data[0])
          setProduct(res.data)
        })
        .catch((err) => console.log(err))
    }, [])



    const ProductShow = product.map((item, key) => {

      return(
        <div className='productitems' key={key}>
          <div className='gallery-product'>
            {/* التحقق من وجود الصور: استخدم ? للتأكد من وجود الصورة قبل محاولة الوصول إليها */}
            {/* fach tkun activeImage khawya f bdya kaydir item.images[0].images */}
            <img src={activeImage || item.images[0]?.image} className='imageActive'/>
            <div className='outersImage'>
              {
                item.images.map((img, index) => (
                  <img
                    src={img.image}
                    onClick={() => setActiveImage(img.image)}
                    key={index}
                    alt='product-img'
                  />
                ))}
            </div>
          </div>
          <div className='info-products'>
            <h2>{item.title}</h2>
            <p>
              {item.description}
            </p>
            <h2 className='price-item'>${item.price * quantity}</h2>
            <span className='count' onClick={() => decreaseCartQuantity(id)}><i className="ri-subtract-line"></i></span>
            <span className='number'>{quantity}</span>
            <span className='count' onClick={() => increaseCartQuantity(id)}><i className="ri-add-line"></i></span>
            <button onClick={() => increaseCartQuantity(id)}>
              Add to Cart
            </button>
          </div>
        </div>
        
      )
    })


  return (
    <>
      <Navbar />
      <div className='productDetails'>
        {ProductShow}
      </div>

      <div style={{marginTop:"6rem"}} className='productfromtoprated'>
        <h1 style={{textAlign:"center", marginBottom:"1rem"}}>Top Rated <span style={{fontSize:"1.7rem"}}>&#128293;</span></h1>
        <TopRated />
      </div>
      <Footer />
    </>
  )
}

export default ProductsDetails
