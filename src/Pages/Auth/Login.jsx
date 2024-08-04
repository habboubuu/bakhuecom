import React, { useEffect, useRef, useState } from 'react';
import './Auth.css';
import logoauth from '../../Assets/logo.png';
import paymentMethods from '../../Assets/payment-img.png';
import { baseURL, LOGIN } from '../../Api/api';
import Cookie from "cookie-universal";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import btnGoogle from '../../Assets/google-btn.png';
import Loading from '../../Components/Loading/Loading';



const Login = () => {

    //USE STATES
    const [form, setFrom] = useState({
        email: "",
        password: "",
    });
    const [err, setErr] = useState("");

    const [loading, setLoading] = useState(false)

    //COOKIES
    const cookie = Cookie();

    //useRef
    const focus = useRef(null);
    useEffect(() => {
        focus.current.focus()
    },[]);

    const navigate = useNavigate();

    //HANDLE FORM CHANGE
    function handlechange(e){
        setFrom({...form, [e.target.name] : e.target.value})
        //console.log(form)
    }
    //HANDLE SUBMIT
    async function handleSubmit(e){
        e.preventDefault();     // man3 event lghadi ydar par default
        setLoading(true);
        try{
            const res = await axios.post(`${baseURL}/${LOGIN}`, {
                email : form.email,
                password : form.password
            });
            setLoading(false);
            //console.log("succes");
            //console.log(res);
            const token = res.data.token;
            cookie.set('e-commerce', token);
            const role = res.data.user.role;
            const go = role === '1995' ? 'users' : 'writer';
            window.location.pathname = `/dashboard/${go}`;
            
       }catch(err){
            setLoading(false);
            //console.log(err)
            if(err.response.status === 401){
                setErr("Wrong Email Or Password")
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
                        <h1>Sign In</h1>
                        <div className='form-custom'>
                            <input
                                type='email'
                                name='email'
                                id='mail'
                                placeholder='email@exemple.com'
                                required
                                value={form.email}
                                onChange={handlechange}
                                ref={focus}
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
                                value={form.password}
                                onChange={handlechange}
                            />
                            <label htmlFor='password' >Password</label>
                        </div>
                    </div>
                    <button className='button-submit'>Sign In</button>
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
                    <Link to='/register' style={{marginTop:'1rem', display:"block", fontSize:"1.2rem"}}>Register ?</Link>
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

export default Login
