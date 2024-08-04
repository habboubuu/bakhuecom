import React from 'react';
import Navbar from '../../Components/Website/Navbar';
import Footer from '../../Components/Website/Footer';
import './ContactPage.css'

const ContactPage = () => {
  return (
    <div>
      {/* ===== Header ==== */}
      <Navbar />
      {/* ====== Hero Section */}
      <div className='hero-contact'>
        <div className='hero-contact-items'>
            <h1>Contact Us</h1>
        </div>
      </div>
        <div className='contact'>
            <div className='form-contact'>
                <h1>Get in Touch</h1>
                <form className='form-contactus'>
                    <div className='input-namephone'>
                        <input 
                            type='text'
                            placeholder='Name'
                            required
                        />
                        <input 
                            type='text'
                            placeholder='Phone'
                            required
                        />
                    </div>
                    <div className='input-emailcontactux'>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='input-textareacontactus'>
                        <textarea
                            placeholder='Messages...'
                            required
                        />
                    </div>
                    <button type='submit'>Submit Now</button>
                </form>
            </div>
            <div className='support-contact'>
                <h3>Support Contact</h3>
                <div className='support-item'>
                    <div className='icon-titlesuport'>
                        <i className="ri-customer-service-line"></i>
                        <h4>Phone</h4>
                    </div>
                    <div className='info-contact'>
                        <p>Mobile : <a href="tel:+4733378901">+212 23491536</a></p>
                        <p>Hotline : <a href="tel:+4733378901">+212 50441536</a></p>
                    </div>
                </div>
                <div className='support-item'>
                    <div className='icon-titlesuport'>
                        <i className="ri-mail-line"></i>
                        <h4>Email</h4>
                    </div>
                    <div className='info-contact'>
                        <p className='phover'><a href="mailto:someone@example.com">Contact@bakhu.com</a></p>
                        <p className='phover'><a href="mailto:someone@example.com">Infot@bakhu.com</a></p>
                    </div>
                </div>
                <div className='support-item'>
                    <div className='icon-titlesuport'>
                        <i className="ri-map-pin-line"></i>
                        <h4>Location</h4>
                    </div>
                    <div className='info-contact'>
                        <p>Casablanca, Ibn Tachefine 20250 </p>
                    </div>
                </div>
            </div>
        </div>
      {/* ========== Footer ========= */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ContactPage
