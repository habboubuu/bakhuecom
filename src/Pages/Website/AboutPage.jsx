import React from 'react';
import Navbar from '../../Components/Website/Navbar';
import Footer from '../../Components/Website/Footer';
import './AboutPage.css';
import aboutimg from './../../Assets/aboutImg.jpg';

const AboutPage = () => {
  return (
    <div>
      {/* ===== Header ==== */}
      <Navbar />
      {/* ======= Hero Section ======= */}
      <div className='hero-About'>
        <div className='hero-about-items'>
            <h1>About</h1>
        </div>
      </div>
      {/* ======= About content ======== */}
      <div className='about-intro'>
        <h1>
            "Uncountable and unrivalled world's largest online and offline fashion house since 1990"
        </h1>
      </div>
      <div className='about'>
        <div className='about-img'> 
            <img src={aboutimg} alt='img-about'/>
        </div>
        <div className='about-content'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ipsa voluptatibus
                provident atque, blanditiis iusto quis reiciendis cumque! Atque vero ullam explicabo
                impedit blanditiis hic quam perspiciatis consequuntur alias laboriosam!
            </p>
            <hr className='hr-about'/>
            <p style={{color:"#887878"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptas saepe
                dicta, odit eum delectus non rerum ipsum magnam, nihil nemo, repellendus earum fugit
                optio. Quisquam sunt dignissimos aut placeat.
            </p>
        </div>

      </div>

      {/* ========== Footer ========= */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AboutPage
