import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Cookie from "cookie-universal";
import './AddCategory.css';
import { CATEGORY, baseURL } from '../../Api/api';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  //Cookie
  const cookie = Cookie()

  const Navigate = useNavigate();

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus()
  }, [])

  //handlesubmit function
  async function handleSubmit(e){
    setLoading(true);
      e.preventDefault();
      // n9dr ndir ghir bhal f adduser
      const form = new FormData();
      form.append("title", title);
      form.append("image", image);

      try{
        const res = await axios.post(`${baseURL}/${CATEGORY}/add`, form
          , {
            headers: {
              Authorization: "Bearer " + cookie.get("e-commerce"),
            }
          });
          Navigate('/dashboard/categories');

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
          <div className='form-category'>
            <label htmlFor='title'>Title :</label>
            <input
              type='text'
              placeholder='Title...'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              ref={focus}
            />
          </div>
          <div className='form-categoryfile'>
            <label htmlFor='img'>Image :</label>
            <input
              type='file'
              id='img'
              onChange={(e) => setImage(e.target.files.item(0))}
              
            />
          </div>
          <button disabled={
            title.length > 2 
              ? false
              : true

          } className='category-btn'>Add Category</button>
        </form>
      </div>
    </>
  )
}

export default AddCategory
