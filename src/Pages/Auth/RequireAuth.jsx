//PROTACTED ROUTE LKAN TOKEN YDINI DASHBORD MKANX LOGIN & permmision

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { USER, baseURL } from '../../Api/api';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import Err403 from './Err403'; //kyst3ml prop role fach kaukun err

//kandiru allowedRole f props
const RequireAuth = ({allowedRole}) => { 
    // User | yt7a9e9 mn token wach s7i7, 7ut y9dar y diru l3rf smitu lhacker
    const [user, setUser] = useState("");
    //console.log(user);
    const Navigate = useNavigate();

    const cookie = Cookie()


    useEffect(() => {
      axios.get(`${baseURL}/${USER}`, {headers: {
        Authorization: "Bearer " + cookie.get("e-commerce"),
      }})
      //.then((data) => console.log(data.data))
      .then((data) => setUser(data.data))
      .catch(() => Navigate('/login', {replace : true})); 
    }, []);

    //console.log(allowedRole);

    // Token & Cookie
    const token = cookie.get('e-commerce');
    // condition 1 : lkan tokn ghadi ytab9 () lawl lmaknx () tani
    // condition dakhiliya : ila ba9i mt7mlux bayanat user ydir loading , lkan ydina outlet
  return token ? (user === "" ? (<Loading />) : allowedRole.includes(user.role) ? (<Outlet />) : <Err403 role={user.role}/>)  : (<Navigate to={'/login'} replace={true} />); //rplace true bach mayrja3x blor
}

//includes = ta7tawi kat3ti True or False kat9bl array

/*
f error kandir role={user.role}
bach n7ut props f err403.js 
bach ytla3 msg 3la hsab kul user
*/


export default RequireAuth
