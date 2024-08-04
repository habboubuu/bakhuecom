import React from 'react';
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom';
import './Footer.css';
import payment from '../../Assets/payment-img.png';


const Footer = () => {
  return (
    <div className='footer'>
      <div className='TopFooter'>
        <div className='intro-footer'>
            <img src={logo} />
            <p>bakhu is a fashion theme for presents a complete wardrobe of uniquely
                rafted Ethnic Wear, Casuals, Edgy Denims, & Accessories inspired from
                the most contemporary
            </p>
            <div className='iconsFooter'>
                <i className="ri-facebook-circle-fill"></i>
                <i className="ri-twitter-x-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-linkedin-line"></i>
            </div>
        </div>
        <div className='footer-itemsx'>
            <div className='footer-Topitems'>
                <h6>Information</h6>
                <ul>
                    <li><Link to='/#' className='footer-link'>About Company</Link></li>
                    <li><Link to='/#' className='footer-link'>Payment Type</Link></li>
                    <li><Link to='/#' className='footer-link'>Awards Winning</Link></li>
                    <li><Link to='/#' className='footer-link'>World Media Partner</Link></li>
                    <li><Link to='/#' className='footer-link'>Become an Agent</Link></li>
                    <li><Link to='/#' className='footer-link'>Refund Policy</Link></li>
                </ul>
            </div>
            <div className='footer-Topitems'>
                <h6>Category</h6>
                <ul>
                    <li><Link to='/#' className='footer-link'>Handbags & Wallets</Link></li>
                    <li><Link to='/#' className='footer-link'>Women's Clothing</Link></li>
                    <li><Link to='/#' className='footer-link'>Plus Sizes</Link></li>
                    <li><Link to='/#' className='footer-link'>Complete Your look</Link></li>
                    <li><Link to='/#' className='footer-link'>Baby Corner</Link></li>
                    <li><Link to='/#' className='footer-link'>Man & Woman Shoe</Link></li>
                </ul>
            </div>
            <div className='footer-Topitems'>
                <h6>Help & Support</h6>
                <ul>
                    <li><Link to='/#' className='footer-link'>Dealers & Agents</Link></li>
                    <li><Link to='/#' className='footer-link'>FAQ Information</Link></li>
                    <li><Link to='/#' className='footer-link'>Return Policy</Link></li>
                    <li><Link to='/#' className='footer-link'>Shipping & Delivery</Link></li>
                    <li><Link to='/#' className='footer-link'>Order Tranking</Link></li>
                    <li><Link to='/#' className='footer-link'>List of Shops</Link></li>
                </ul>
            </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className='copyright-footerbottom'>
            <p>&copy; 2024 <Link to="https://www.linkedin.com/in/houssam-habboub/" target="_blank">Houssam Habboub.</Link> All Rights Reserved</p>
        </div>
        <div className='list-footerbottom'>
            <ul>
                <li><Link to="/#">Privacy Policy</Link></li>
                <li><Link to="/#">Terms & Conditions</Link></li>
                <li><Link to="/#">Sitemap</Link></li>
            </ul>
        </div>
        <div className='payment-m'>
            <p>We Support</p>
            <img src={payment} alt='methode-payment'/>
        </div>
      </div>
    </div>
  )
}

export default Footer;
