import React, { useContext, useEffect, useState } from 'react';
import '../../Style/components/SideBar.css';
import logo2 from '../../Assets/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../../Style/components/SideBar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { Links } from '../../Components/Dashboard/Navlinks';
import axios from "axios";
import { USER, baseURL } from '../../Api/api';
import Cookie from 'cookie-universal';
import { Menu } from '../../Context/MenuContext';
import { WindowSize } from '../../Context/WindowContext';



const SideBar = () => {
  //****context li kyn9us mn sidebar****
  const menu = useContext(Menu);
  //console.log(menu)
  const isOpen = menu.isOpen;
  //console.log(isOpen)

  //****context kaykhli sidebar t7ayd f mobile ****
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  //console.log(windowSize);
  


  const [user, setUser] = useState("");
  const Navigate = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    axios.get(`${baseURL}/${USER}`, {headers: {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    //.then((data) => console.log(data.data.role))
    .then((data) => setUser(data.data))
    .catch(() => Navigate('/login', {replace : true}));
  }, [])




  return (
    <div className='sidebar' style={{
      left: windowSize < '768' ? (isOpen ? 0 : "-100%") : 0,
      width: isOpen ? "16rem" : "fit-content",
      position: windowSize < '768' ? 'fixed' : 'sticky',
      transition: ".3s ease",
      }}>
      <div className='logo-title'>
        <img src={logo2} alt='logo'/>
      </div>
      <div className='nav-links'>
          {Links.map((item, key) => (
            item.role.includes(user.role) && (
          
          <NavLink
            key={key}
            activeclassname="active"
            to={item.path}
            className="sidebar-links"
            >
            <FontAwesomeIcon
              icon={item.icons}
              className='icon-sidbar-links'
            />
            <p style={{display: isOpen ? "block" : "none"}}>{item.name}</p>
          </NavLink>
          
          )))}
      </div>
    </div>
  )
}

export default SideBar
