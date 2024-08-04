import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES, PRODUCT, PRODUCTS, baseURL } from '../../Api/api';
import Cookie from "cookie-universal";
import Loading from '../../Components/Loading/Loading';
import './Dashboard.css';

const EditProduct = () => {
  const [form, setForm] = useState({
    category: "Select Category", //had value hiya likatkun f option bach tla par default
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });


  //States
  const [images, setImages] = useState([]); //fach kankuno baghin nhutu bzaf 9yam ndiro array
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idImagefromServer, setIdimageFromServer] = useState([]); //id dyal tsawer lkaynin f server

  const { id } = useParams();

  console.log(idImagefromServer);
  console.log(imagesFromServer);
  //Cookie
  const cookie = Cookie()

  const Navigate = useNavigate();

  //useRef
  const focus = useRef();
  useEffect(() => {
    focus.current.focus();
  }, [])
  //useRef dyal button delete
  const ids = useRef([]);


  //imageUpload Ref
  const openImage = useRef(null);
  //function openimage
  function handleOpenImage(){
    openImage.current.click();
  }

  //current product
  useEffect(() => {
    //setLoading(true);
    axios.get(`${baseURL}/${PRODUCT}/${id}`, {headers : {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    .then((data) => {
      setForm(data.data[0])
      setImagesFromServer(data.data[0].images); //[0] howa lkaydakhlina l array
  })

  }, [])


  
  //Get Categories
  useEffect(() => {
    axios.get(`${baseURL}/${CATEGORIES}`, {headers: {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    .then((data) => setCategories(data.data))
    .catch((err) => console.log(err));
  }, []);

  //handleSubmit
  async function handleEdit(e){
    setLoading(true);
      e.preventDefault();
      try {
        //hna kandiro api dyal delete 3la image lkaynin f backend bach maytmas7u 7ta ndiro save
        for (let i = 0; i < idImagefromServer.length; i++) {
          await axios.delete(`${baseURL}/product-img/${idImagefromServer[i]}`, {headers : 
            {
              Authorization: "Bearer " + cookie.get("e-commerce"),
            }
          })
        }
        const res = await axios.post(`${baseURL}/${PRODUCT}/edit/${id}`, form, {
            headers: {
                Authorization: "Bearer " + cookie.get("e-commerce"),
            }
        });
        Navigate('/dashboard/products');
    } catch (err) {
        setLoading(false);
        console.log(err);
    }
  }

  

  // Handle Change 
  async function handleChange(e){
    setForm({...form, [e.target.name] : e.target.value});
  }
  // Handle Image Change
  const j = useRef(-1);
  async function handleImageChange(e){
    setImages((prev) => [...prev, ...e.target.files]);
    console.log(e.target.files)
    const imagesAsFiles = e.target.files; // swr ltla7u
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++){
      j.current++;
      data.append('image', imagesAsFiles[i]);
      data.append('product_id', id); //id dyal product
      try{
        /*api bach n7uto img f database kif nkhtarhum 9bl mndir add, huwa bach ghaytal3 progress
        - bach ytrslu images huma lawlin wnkhdmu m3ahum progress */
        const res = await axios.post(`${baseURL}/product-img/add`, data, {headers: 
          {
            Authorization: "Bearer " + cookie.get("e-commerce"),
          },
          onUploadProgress : (progress) => {
            const { loaded, total } = progress; //loaded : dakchi li t7amel, total : t7mil kuli
            const percent = Math.floor((loaded * 100) / total); //math floor kat7yd fasila
            if (percent % 20 === 0){ // ghadi yb9a yw9af ghir 3and moda3afat 20  , bach nkhafu request
              setUploading(percent)
            }
          },
        });
        ids.current[j.current] = res.data.id
      }catch(err){
        console.log(err)
      }
    }
  }
  //HandleImageDelete
  async function handleImgDelete(id, file){
    const findId = ids.current[id];
     try{
       const res = await axios.delete(`${baseURL}/product-img/${findId}`, {headers : 
         {
           Authorization: "Bearer " + cookie.get("e-commerce"),
         }
       });
       setImages(prev => prev.filter((image) => image !== file)); //nms7 img f blasa
       ids.current = ids.current.filter((i) => i !== findId);//kay7ayd error bach nmsa7 kulshi
       --j.current; // hadi fach kanmsah wnbghi nzid mdirch error
     }catch(err){
       console.log(err);
     }
  }

  //HandleImageDelete FROMSERVER
  async function handleImgDeleteFromServer(id){
    setImagesFromServer((prev) => prev.filter(img => img.id !== id)); //had code kaykhlina nms7u sora lkayna deja f blassa
    setIdimageFromServer((previd) => { //kanghznu haduk lbghina n7yduhm f state bach 7ta ndieu save 3ad yms7u official
      return [...previd, id];
    });
  }
 
  // MAPPING
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>{item.title}</option>
  ));

  const imagesShow = images.map((img, key) => (
    <div key={key} style={{border:"1px solid #D3D3D3",marginBottom:"1rem", padding:".5rem", width:"100%"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", marginBottom:".5rem", gap:".5rem" }}>
        <img src={URL.createObjectURL(img)} width="40px" alt='product'></img> {/* cose lt7at f src kan7tuh lkan object file */}
        <div style={{display:"flex",alignItems:"centre" , justifyContent:"space-between", width:"100%"}}>
          <div>
            <p style={{marginBottom:"1rem"}}>{img.name.slice(1, 20)}</p>
            <p>{img.size / 1024 < 900 
            ? (img.size / 1024).toFixed(2) + "KB"
            : (img.size / (1024 * 1024)).toFixed(2) + "MB"}</p>
          </div>

          <div onClick={() => handleImgDelete(key, img)} className='button-progressx'>Delete</div>

        </div>
      </div>
      <div className='custom-progress'> {/* css dyalo kayn dashboard.css*/ }
        <span percent={`${uploading}%`} style={{width:`${uploading}%`}} className='inner-progress'></span>
      </div>
    </div>
  ))


  const imagesFrpmServerShow = imagesFromServer.map((img, key) => (
    <div key={key} style={{border:"1px solid #D3D3D3",marginBottom:"1rem", padding:".5rem", width:"100%"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", marginBottom:".5rem", gap:".5rem" }}>
        <img src={img.image} width="40px" alt='product'></img> {/* cose lt7at f src kan7tuh lkan object file */}
        <div style={{display:"flex",alignItems:"centre" , justifyContent:"space-between", width:"100%"}}>
          <div></div>
          <div onClick={() => handleImgDeleteFromServer(img.id)} className='button-progress'>Delete</div>

        </div>
      </div>
    </div>
  ))

  return (
    <>
      {loading && <Loading />}
      <div className='Edituser'>
        <form onSubmit={handleEdit}>
          <div className='form-edit'>
            <label htmlFor='cat'>Category :</label>
            <select 
              value={form.category}
              onChange={handleChange}
              name='category'
              id='cat'
              ref={focus}
            >
              <option disabled >Select Category</option>
                {categoriesShow}
            </select>
          </div>
          <div className='form-edit'>
            <label htmlFor='title'>Title :</label>
            <input
              name='title'
              type='text'
              placeholder='title...'
              id='title'
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit'>
            <label htmlFor='desc'>Description :</label>
            <input
              type='text'
              placeholder='desc...'
              id='desc'
              name='description'
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit'>
            <label htmlFor='$'>Price :</label>
            <input
              name='price'
              type='text'
              placeholder='price...'
              id='$'
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit'>
            <label htmlFor='$'>Discount :</label>
            <input
              name='discount'
              type='text'
              placeholder='discount...'
              id='$'
              value={form.discount}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit'>
            <label htmlFor='abt'>About :</label>
            <input
              type='text'
              placeholder='about...'
              id='abt'
              name='About'
              value={form.About}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit'>
            <label htmlFor='img'>Image :</label>
            <input
              hidden
              type='file'
              multiple //aktar mn sora
              id='img'
              onChange={handleImageChange} //dyal multi images .files sf
              ref={openImage}
            />
          </div>
          {/* div dyal chakel image upload jdid */}
          <div onClick={handleOpenImage} style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center", 
            justifyContent:"center", 
            border: "2px dashed #1C8ADB",
            marginBottom:"1rem",
            padding: "1rem",
            cursor: "pointer",
            borderRadius: "6px",
            }}>
            <img src={require('../../Assets/Upload-Image.png')} alt='upload-img' 
            width="80px"
            />
            <p style={{marginTop:".5rem", color: "#1C8ADB", fontWeight:"bold"}}>Upload Images</p>
          </div>

          <div>{imagesFrpmServerShow}</div>

          <div>{imagesShow}</div>
          
          <button className='category-btn' >Save</button>
        </form>
      </div>
    </>
  )
}

export default EditProduct
