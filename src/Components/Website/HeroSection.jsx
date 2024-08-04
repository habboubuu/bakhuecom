import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='hero'>
      <div className='hero-bar'>
        <h3>MEGA SALE!</h3>
        <div className='uptoff'>
            <p>UP TO</p>
            <h1>60% OFF</h1>
        </div>
        <h3>ALMOST  EVERTHING</h3>
      </div>
      <Link>
        <div className='hero-banner'></div>
      </Link>
    </div>
  )
}

export default HeroSection
