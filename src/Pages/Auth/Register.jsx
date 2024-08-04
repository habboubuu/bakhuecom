import React, { useEffect, useRef, useState } from 'react';
import './Auth.css';
import logoauth from '../../Assets/logo.png';
import paymentMethods from '../../Assets/payment-img.png';
import Cookie from "cookie-universal";
import axios from "axios";
import { baseURL, REGISTER } from '../../Api/api';
import btnGoogle from '../../Assets/google-btn.png';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';


const Register = () => {

    //USE STATES
    const [form, setForm] = useState({
        name : "",
        email : "",
        password : "",
    })
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    //COOKIES
    const cookie = Cookie();

    //useRef
    const focus = useRef(null);
    useEffect(() => {
        focus.current.focus()
    },[]);

    //HANDLE FORM CHANGE 
    function handleformChange(e){
        setForm({...form, [e.target.name] : e.target.value})
        //console.log(form)
    }
    //HANDLE SUBMIT
    async function handleSubmit(e){
        e.preventDefault();     // man3 event lghadi ydar par default y3ni form mghadich tb9a trsl par default
        //console.log("test")
        setLoading(true)
    
        try{
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false);
            //console.log("succes");
            //console.log(res);
            const token = res.data.token;
            cookie.set('e-commerce', token); //takhzin token f cookie, ecommerce smiya token
            window.location.pathname = '/dashboard/users';
        }catch(err){
            setLoading(false);
            console.log(err);
            if(err.response.status === 422){
                setErr("Email is already been taken")
            }else{
                setErr("Internal Server ERR")
            }
            
            
        }
    }

  return (
    <>
        {loading && <Loading/>}
        <div className='auth-parent'>
            <div className='logo-auth'>
                <img src={logoauth} alt='Logo'/>
            </div>
            <div className='auth-row'>
                <form className="form" onSubmit={handleSubmit}>
                    <div className='custom-form'>
                        <Link to='/login' style={{display:"block", fontSize:"1rem"}}>Login ?</Link>
                        <h1>Create an Account</h1>
                        <div className='form-custom'>
                            <input
                                type='text'
                                name='name' // value dyal useState
                                id='name'
                                placeholder='Name...'
                                required
                                value={form.name}
                                onChange={handleformChange}
                                ref={focus}
                            />
                            <label htmlFor="name">Name :</label>
                        </div>
                        <div className='form-custom'>
                            <input
                                type='email'
                                name='email'
                                id='mail'
                                placeholder='email@exemple.com'
                                required
                                value={form.email}
                                onChange={handleformChange}
                            />
                            <label htmlFor="mail">Email :</label>
                        </div>
                        <div className='form-custom'>
                            <input
                                type='password'
                                name='password'
                                id='pass'
                                placeholder='password...'
                                required
                                minLength="8"
                                value={form.password}
                                onChange={handleformChange}
                            />
                            <label htmlFor='password' >Password</label>
                        </div>
                    </div>
                    <button className='button-submit'>Create</button>
                    <div className='google-btn'>
                        <a href={`http://127.0.0.1:8000/login-google`}>
                            <div className='google-wrapper'>
                                <img src={btnGoogle} alt='google-btn' className='google-icon'/>
                            </div>
                            <p>
                                Sign In with Google
                            </p>
                        </a>
                    </div>
                    {err !=="" && <span className='error'>{err}</span> }
                </form>
            </div>
            <div className='footer-auth'>
                <div className='fa-flex'>
                    <p>We Support</p>
                    <img src={paymentMethods}  alt='Payment Methods'/>
                </div>
                <p className='fa-copyright'>&copy; 2024 <span>Houssam Habboub</span>. All Rights Reserved </p>
            </div>
        </div>
    </>
  )
}

export default Register
