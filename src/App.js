import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users';
import EditUser from './Pages/Dashboard/EditUser';
import Err404 from './Pages/Auth/Err404';
import RequireAuth from './Pages/Auth/RequireAuth';
import Err403 from './Pages/Auth/Err403';
import Writer from './Pages/Dashboard/writer';
import AddUser from './Pages/Dashboard/AddUser';
import Categories from './Pages/Dashboard/Categories';
import EditCategory from './Pages/Dashboard/EditCategory';
import AddCategory from './Pages/Dashboard/AddCategory';
import Products from './Pages/Dashboard/Products';
import AddProduct from './Pages/Dashboard/AddProduct';
import EditProduct from './Pages/Dashboard/EditProduct';
import RequireBack from './Pages/Auth/RequireBack';
import ContactPage from './Pages/Website/ContactPage';
import AboutPage from './Pages/Website/AboutPage';
import ProductsPage from './Pages/Website/ProductsPage';
import ProductsDetails from './Pages/Website/ProductsDetails';

function App() {
  return( 
    <div className='App'>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='products/:id' element={<ProductsDetails />} />
        <Route element={<RequireBack />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />}/>
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack/>} />
        <Route path='*' element={<Err404 />} />
        {/*PROTACTED ROUTES */}
        <Route element={<RequireAuth allowedRole={["1995","1996", "1999"]}/>}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='403' element={<Err403 />} />
            {/*Users*/}
            <Route element={<RequireAuth allowedRole={["1995"]} />} >
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<EditUser />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            {/* ======== */}
            <Route element={<RequireAuth allowedRole={["1999", "1995"]}/>} >
              {/* Categories */}
              <Route path='categories' element={<Categories />} />
              <Route path='categories/:id' element={<EditCategory />} />
              <Route path='category/add' element={<AddCategory />} />
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<EditProduct />} />
              <Route path='product/add' element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />} >
              <Route path='writer' element={<Writer />} />
            </Route>
          </Route>
            
        </Route>    
      </Routes>
    </div>
  );
}

export default App;
