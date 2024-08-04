/* KANMCHIW L GOOGLE COULD NDIRU URIS1: http://localhost:3000/auth/google/callback bach mydinach server backend fach nbghiw ndkhlo b google

HAD PAGE BACH NJIBO ACCES TOKEN FYAL USER DKHAL B GOOGLE
*/


import React, { useEffect } from 'react';
import { GOOGLE_CALL_BACK, baseURL } from '../../Api/api';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Cookie from "cookie-universal";

const GoogleCallBack = () => {
    const cookie = Cookie();
    const location = useLocation();//kayjib location

    useEffect(() => {
        async function Googlecall(){
            try{
              //had api kyjib data mn backend dyal user fach kydkhul b google "acces token , google token ..."
                const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`);//${location} //lien kyjib bayanat  //"googlecloud" kyji m3ah token
                console.log(res);
                const token = res.data.access_token;
                cookie.set("e-commerce", token);
                window.location.pathname = '/'
            }catch(err){
                console.log(err);
            }
        }
        Googlecall();
    }, [])

  return (
    <div>
      google callback
    </div>
  )
}

export default GoogleCallBack
