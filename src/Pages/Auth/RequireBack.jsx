//y3ni lkan token kaydih Navigate mkykhalihx ydkhul page dyal login w register wkha yyrja3 b lur

import React from 'react';
import Cookie from "cookie-universal";
import { Navigate, Outlet } from 'react-router-dom';


const RequireBack = () => {
    const cookie = Cookie();
    const token = cookie.get('e-commerce');
  return token ? <Navigate to="/" /> : <Outlet />; 
}

export default RequireBack

//window.history.back()

