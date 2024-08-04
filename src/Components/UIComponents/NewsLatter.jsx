import React from 'react';
import './NewsLatter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NewsLatter = () => {
  return (
    <div className='NewsLatter'>
        <div className='NewsLatter-card'>
            <h1>Subscribe Newsletter</h1>
            <p>Enter your email below to be the first to know about new collections and product launches.</p>
            <div>
                <form>
                    <div className='newsletter-input'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input 
                            type='email'
                            placeholder='Entre your email'
                        />
                        <button className='btn-NewsLatter'>
                            <span>Subscribe</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                    
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default NewsLatter
