import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditUser.css';
import Cookie from "cookie-universal"
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import { USER, baseURL } from '../../Api/api';


const EditUser = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [diseble, setDiseble] = useState(true);
  const [loading, setLoading] = useState(false);

  //Cookie
  const cookie = Cookie();

  const Navigate = useNavigate();

  const { id } = useParams();

  // SET DATA IN INPUT
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/${USER}/${id}`, {headers : {
      Authorization: "Bearer " + cookie.get("e-commerce")
    }})
    .then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setLoading(false);
    })
    .then(() => setDiseble(false))
    .catch((err) => Navigate('dashboard/users/page/404', {replace: true})) // kan3tuw url khata2 bach ydina 404
  }, [])

  // HANDLE SUBMIT
  async function handleSubmit(e){
    setLoading(true);
      e.preventDefault();
      try{
        const res = await axios.post(`${baseURL}/${USER}/edit/${id}`, {
          //key : value (value 3andna hna f frontend)
          name : name,
          email: email,
          role: role,
        }, {
          headers:{
            Authorization: "Bearer " + cookie.get("e-commerce"),
          }
        });
        window.location.pathname = "/dashboard/users";
      }catch(err){
        setLoading(false);
        console.log(err);
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
          />
        </div>
        <div className='form-edit'>
          <label htmlFor='mail'>Role :</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled value="">Choose Role</option>
            <option value="1995">Admin</option>
            <option value="1999">Product Manger</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
          </select>
        </div>
        <button disabled={diseble} style={{background: diseble ? "#7b95d8" : "#0044ff"}} className='edit-btn'>Edit</button>
      </form>
    </div>
  </>
  )
}

export default EditUser

