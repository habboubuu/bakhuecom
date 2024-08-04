import React, { useEffect, useState } from 'react';
import { baseURL, LatestSale } from '../../Api/api';
import Cookie from "cookie-universal";
import axios from "axios";
import UIproduct from './UIproduct';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';


const LatestSaleProduct = () => {



    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const cookie = Cookie();

    useEffect(() => {
        axios.get(`${baseURL}/${LatestSale}`, {
            headers: {
                Authorization: "Bearer " + cookie.get("e-commerce"),
            }
        })
        .then((res) => setProducts(res.data))
        .finally(() => setLoading(false));
    }, [])

    //console.log(products);

    const ProductShow = products.map((product, key) => {
    
        const discountPercent = product.discount || 0;
        const currentPrice = product.price || 0;
        const originalPrice = (currentPrice / (1 - discountPercent / 100)).toFixed(2);

    
     return( 
     <Link to={`/products/${product.id}`} key={key} style={{all:"unset"}}>
        <UIproduct /*key={key}*/ product={product}
        title={product.title}
        description={product.description}
        img={product.images[0].image}
        sale={product.discount}
        price={product.price}
        originalPrice={originalPrice}
        //rating={product.rating}       
    />
     </Link>
     
     );
    });




  return (
    <>
      <h1 className='titleProductSection'>Latest Products On Sale</h1>
      <div style={{display:'flex', alignItems:"stretch", justifyContent:'center', gap:".8rem" , flexWrap:"wrap", marginBottom:'4rem'}}>
        {loading ? (
          <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:"1rem"}}>
            <Skeleton height="300px" width="250px"/>
            <Skeleton height="300px" width="250px"/>
            <Skeleton height="300px" width="250px"/>
            <Skeleton height="300px" width="250px"/>
          </div>
        )  :  (ProductShow) }
      </div>
    </>
  )
}

export default LatestSaleProduct;
