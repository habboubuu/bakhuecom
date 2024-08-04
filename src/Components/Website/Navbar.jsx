import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMagnifyingGlass, faUser, faBars, faXmark, faShop } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../Context/ShoppingCartContext';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const { OpenCart } = useShoppingCart();

    function toggle(){
        setMenu((p) => !p);
    }


  return (
    <div className='Navbar' >
        <div className="homePage-topbar">
            <p>Fashion Everyday</p>
            <h1>Unrivalled Fashion House</h1>
        </div>
        {/* first navbar */}
        <div className='first-navbar'>
            <div className='search-item'>
                <input
                    type='search'
                    placeholder='Search Product...' 
                    className='search-homePage'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='iconSearch-HomePage'/>
            </div>
            <Link to='/'>
                <div className='logo-homePage'>
                    <img src={logo} alt='logo'/>
                </div>
            </Link>
            <div className='login-cart'>
                <Link to="/login" style={{all:'unset'}}>
                    <div className='login-cart-item'>
                        <FontAwesomeIcon icon={faUser} className='cartx-loginx' />
                        <p>Sign in</p>
                    </div>
                </Link>    
                <div className='login-cart-item' onClick={OpenCart}>
                    <FontAwesomeIcon icon={faBagShopping} className='cartx-loginx'/>
                    <p>Cart</p>
                    <div className='cart-number'>
                        
                    </div>
                </div>
                <div className='menu-homePage'>
                    <FontAwesomeIcon icon={faBars} onClick={toggle} className='menux'/>
                </div>
            </div>
        
        </div>
        {/*middele navbar*/}
        <div className='middele-navbar'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </div>
        {/* mobile , mobile-navbar*/}
        <div className={menu ? 'mobile-navbar' : 'mobile-close'}>
            <div className='logoicon'>
                <img src={logo} alt='logo'/>
                <FontAwesomeIcon icon={faXmark} className='icon-mobilenav' onClick={toggle}/>
            </div>
            <div className='menuMobile-list'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>
        </div>
        <div className={menu ? 'overlayx' : 'overlay'} onClick={toggle}>

        </div>

        {/* shopping Cart */}
        
        {/* HEADER BOTTOM */}
        <div className='header-bottom'>
            <Link className='items-hbottom' to='/login'>
                <FontAwesomeIcon icon={faUser} className='icon-hbottom'/>
                <p>Sign in</p>
            </Link>
            <Link className='items-hbottom' to='/products'>
                <FontAwesomeIcon icon={faShop} className='icon-hbottom' />
                <p>Shop</p>
            </Link>
            <Link className='items-hbottom' >
                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-hbottom' />
                <p>Search</p>
            </Link>
            <Link className='items-hbottom' onClick={OpenCart}>
                <FontAwesomeIcon icon={faBagShopping} className='icon-hbottom' />
                <p>Cart</p>
            </Link>
            
        </div>
    </div>
  )
}

export default Navbar
