import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Website/Navbar';
import Footer from '../../Components/Website/Footer';
import axios from "axios";
import Cookie from "cookie-universal";
import { baseURL, CATEGORIES, PRODUCTS } from '../../Api/api';
import './ProductsPage.css';
import UIproduct2 from '../../Components/UIComponents/UIproduct2'
import { Link } from 'react-router-dom';


const ProductsPage = () => {

  const [categories, setCategories] = useState([]);
  const [btnactive, setbtnActive] = useState("all");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const cookie = Cookie()



  //GET CATEGORIES TITLE
  useEffect(() => {
    axios.get(`${baseURL}/${CATEGORIES}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("e-commerce"),
      }
    })
    .then((res) => setCategories(res.data));
  }, [])


  //GET PRODUCTES
  useEffect(() => {
    axios.get(`${baseURL}/${PRODUCTS}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("e-commerce"),
      }
    })
    .then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data); // Initialize with all products
  });
  }, [])


  

  const categoriesShow = categories.slice(0, 5).map((item, key) => (
    <button 
      key={key}
      onClick={() => 
        handleClick(item.id)
        //setbtnActive(item.id)
      }
      className={btnactive === item.id ? "btnactive" : null}

      >
        {item.title}
    </button>
  ));


  const handleClick = (ButtonCategory) => {
    setbtnActive(ButtonCategory);
    if (ButtonCategory === "all") {
      setFilteredProducts(products); // Reset to all products
    } else {
      const newArr = products.filter((item) => {
        if (Array.isArray(item.category)) { //kay799 mnu waxh array
          return item.category.includes(ButtonCategory);
        } else {
          return item.category === ButtonCategory;
        }
      });
      setFilteredProducts(newArr);
    }
  }

  
  const ProductShow = filteredProducts.map((product, key) => {
    
    const discountPercent = product.discount || 0;
    const currentPrice = product.price || 0;
    const originalPrice = (currentPrice / (1 - discountPercent / 100)).toFixed(2);


 return( 
  <Link to={`/products/${product.id}`} key={key} style={{all:"unset"}}>
    <UIproduct2 key={key} product={product}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      //sale={product.discount}
      price={product.price}
      originalPrice={originalPrice}
      id={product.id}
    />
  </Link>
  
 );
});

 
    


  return (

    <div>
      {/* ===== Header ==== */}
      <Navbar />
      {/* ====== Hero Section */}
      <div className='hero-contact'>
        <div className='hero-contact-items'>
            <h1>Products</h1>
        </div>
      </div>
      {/* ======================= */}
      <div className='products'>
        <div className='button-categories'>
          <button 
            onClick={() => handleClick("all")}
            className={btnactive === "all" ? "btnactive" : null}

          >
            All Products
          </button>
          {categoriesShow}
        </div>

        <div className='flexcar'>
          {ProductShow}
        </div>
      </div>


      {/* ========== Footer ========= */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ProductsPage;
