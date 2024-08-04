import React, { useEffect, useState } from 'react';
import './AddCategory.css';
import axios from "axios";
import Cookie from "cookie-universal";
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORY, baseURL } from '../../Api/api';
import Loading from '../../Components/Loading/Loading';

const EditCategory = () => {
  //States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [diseble, setDiseble] = useState(true);

  //Cookie
  const cookie = Cookie();

  const Navigate = useNavigate();

  const { id } = useParams();

  //Current Category
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/${CATEGORY}/${id}`, {headers : {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    .then((data) => {
      setTitle(data.data.title);
      setLoading(false);
    })
    .then(() => setDiseble(false))
    .catch((err) => Navigate('/dashboard/categories/page/404', {replace: true})); // kan3tuw url khata2 bach ydina 404
  }, []);

  //function hadleSubmit
  async function handleSubmit(e){
    setLoading(true);
      e.preventDefault();
      // n9dr ndir ghir bhal f adduser
      const form = new FormData();
      form.append("title", title);
      form.append("image", image);
      try{
        const res = await axios.post(`${baseURL}/${CATEGORY}/edit/${id}`, form
        , {
          headers : {
            Authorization: "Bearer " + cookie.get("e-commerce"),
        }});
        window.location.pathname = '/dashboard/categories';
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
          <button disabled={diseble} style={{background: diseble ? "#7b95d8" : "#0044ff"}} className='category-btn'>Edit Category</button>
        </form>
      </div>
    </>
  )
}

export default EditCategory
