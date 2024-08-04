import React from 'react';
import './Err404.css';
import { Link } from 'react-router-dom';

const Err404 = () => {
  return (
    <div className='Error404'>
        <h1 className='title-404'>404</h1>
        <p className='subtitile-404'>Page Not Found!</p>
        <Link className="err404-link" to={'/'}>
            Go to Home
        </Link>
    </div>
  )
}

export default Err404
