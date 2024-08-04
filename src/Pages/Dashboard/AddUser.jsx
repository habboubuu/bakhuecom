import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Cookie from "cookie-universal";
import axios from "axios";
import { USER, baseURL } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    //UseStates
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    
    //Cookies
    const cookie = Cookie();

    const Navigate = useNavigate();

    //useRef
    const focus = useRef(null);
    useEffect(() => {
        focus.current.focus();
    }, []);
    //handleSubmit
    async function handleSubmit(e){
        setLoading(true);
            e.preventDefault();
            try{
                const res = await axios.post(`${baseURL}/${USER}/add`, {
                    //key : value (value 3andna hna f frontend)
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                }, {
                    headers:{
                        Authorization: "Bearer " + cookie.get("e-commerce"),
                    }
                });
                Navigate('/dashboard/users');
            }catch(err){
                console.log(err);
                setLoading(false);
            }

    }




  return (
    <>
    {loading && <Loading />}
    <div className='Edituser'>
      <form onSubmit={handleSubmit}>
        <div className='form-edit'>
          <label htmlFor='name'>Username :</label>
          <input
            type='text'
            placeholder='Username...'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            ref={focus}
          />
        </div>
        <div className='form-edit'>
          <label htmlFor='mail'>Email :</label>
          <input
            type='email'
            placeholder='Email...'
            id='mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-edit'>
          <label htmlFor='pass'>Password :</label>
          <input
            type='password'
            placeholder='Password...'
            id='pass'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-edit'>
          <label htmlFor='mail'>Role :</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option disabled value="">Choose Role</option>
            <option value="1995">Admin</option>
            <option value="1999">Product Manger</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
          </select>
        </div>
        <button className='edit-btn' style={{background:"#0044ff"}}
            disabled={
                name.length > 4 &&
                email.length > 9 &&
                password.length > 6 &&
                role !== ""
                ? false
                : true
            }
        >Edit</button>
      </form>
    </div>
    </>
  )
}

export default AddUser
