import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import 'react-loading-skeleton/dist/skeleton.css'; //skeleton
import ShoppingCartProvider from "./Context/ShoppingCartContext"





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WindowContext>
        <MenuContext>
          <ShoppingCartProvider>
            <Router>
              <App />
            </Router>
          </ShoppingCartProvider>
        </MenuContext>
      </WindowContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
