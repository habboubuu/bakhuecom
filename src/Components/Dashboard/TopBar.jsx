import React, { useContext, useEffect, useState } from 'react';
import '../../Style/components/TopBar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../Context/MenuContext';
import { WindowSize } from '../../Context/WindowContext';
import Cookie from "cookie-universal";
import Loading from '../Loading/Loading';
import axios from "axios";
import { baseURL, LOGOUT, USER } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import userimg from '../../Assets/user-logout.png';
import '../../Style/components/TopBar.css'

const TopBar = () => {
  const menu = useContext(Menu);
  //console.log(menu)
  const setIsOpen = menu.setIsOpen;

  //States
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  //Cookie
  const cookie = Cookie()
  const Navigate = useNavigate()

  //Get Current User
  useEffect(() => {
    axios.get(`${baseURL}/${USER}`, {headers :{
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    .then((data) => setName(data.data.name))
    .catch(() => Navigate('/login', {replace: true}));
  }, []);


  //Logout Function
  async function handleLogout(){
    setLoading(true);
     try{
      const res = await axios.get(`${baseURL}/${LOGOUT}`, {headers: {
        Authorization: "Bearer " + cookie.get("e-commerce"),
      },
    }) 
      cookie.remove("e-commerce")
      console.log(res)
      Navigate('/login')
     }catch(err){
      console.log(err)
     }
  }




  return (
    <div className='topbar'>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div className='item-topbar'>
          <FontAwesomeIcon onClick={() => setIsOpen((prev) => !prev)} cursor={"pointer"} className='bars-icons' icon={faBars} />
          <Link to='/' className='browse-website'>
            <FontAwesomeIcon className='iconbrowse' icon={faGlobe} />
            <p>Browse Website</p>
          </Link>
        </div>
        <div className='user-logout'>
          <div className='current-user'>
            <img src={userimg} className='img-current-user'/>
            <p>{name}</p>
          </div>
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={handleLogout} className='logout-btn' style={{cursor:"pointer"}}/>
        </div>
      </div>
    </div>
  )
}

export default TopBar
