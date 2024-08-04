import React from 'react';
import './HomePage.css';
import Navbar from '../../Components/Website/Navbar';
import HeroSection from '../../Components/Website/HeroSection';
import ServicesData from '../../Components/Website/Services';
//import UIproduct from '../../Components/UIComponents/UIproduct';
import LatestSaleProduct from '../../Components/UIComponents/LatesSaleProduct';
import imgPost from '../../Assets/tshirt-33.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TopRated from '../../Components/UIComponents/ShowTopRated';
import NewsLatter from '../../Components/UIComponents/NewsLatter';
import Footer from '../../Components/Website/Footer';


const HomePage = () => {
  return (
    <div>
      {/* ===== Header ==== */}
      <Navbar />
      {/* ==== Hero Section ====*/}
      <div className='hero-section'>
        <HeroSection />
      </div>
      {/* ==== Services ==== */}
      <div className='Services'>
        <ServicesData />
      </div>
      {/* Latest Sale Product */}
      <div>
        <LatestSaleProduct />
      </div>
      {/*=========publicity========*/}
      <div className='publicity'>
        <div className='publicity-titles'>
          <h1>GIFT <span>50% OFF</span> PERFECT STYLES</h1>
          <p>Only until the end of this week. Terms and conditions apply</p>
        </div>
        <Link className='link-pub'>
          Discover Now
        </Link>
        
      </div>
      {/*=========publicity========*/}
      {/* Top Rated Products */}
      <div className='Section-Top-Rated'>
        <div className='bar-image'>
            <h2>New Trend Edition</h2>
            <img src={imgPost} />
            <Link style={{textDecoration:"none"}}>
              <div className='linkBar'>
                <p>Explore All</p>
                <FontAwesomeIcon icon={faArrowRight} fontSize=".8rem" />
              </div>
            </Link>
        </div>
        <div className="top-rated">
          <div>
            <div className='title-toprated'>
              <h1>Top Rated <span>&#128293;</span></h1>
              <div className='line'></div>
            </div>
            <TopRated />
          </div>
        </div>
      </div>
      {/* ========== NewsLatter ========= */}
      <div style={{marginBottom:"7rem"}}>
        <NewsLatter />
      </div>
      
      {/* ========== Footer ========= */}
      <div>
        <Footer />
      </div>
    </div>
    
  )
}

export default HomePage
