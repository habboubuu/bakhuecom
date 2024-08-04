import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookie from "cookie-universal";
import { Link } from 'react-router-dom';
import { PRODUCT, PRODUCTS, baseURL } from '../../Api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


const Pruducts = () => {

  //States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePro, setDeletePro] = useState(false);
  const [searchTerm, setSearchTearm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemspage = 10;

  console.log(products);
  //Cookie
  const cookie = Cookie()

  useEffect(() => {
    axios.get(`${baseURL}/${PRODUCTS}`, {headers :{
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    //.then((data) => console.log(data.data))
    .then((data) => setProducts(data.data))
    .then(() => setLoading(false))
    .catch((err) => console.log(err));
  }, [deletePro]);

  

  //functionDelete
  async function handleDelete(id){
    try{
      const res = await axios.delete(`${baseURL}/${PRODUCT}/${id}`, {headers: {
      Authorization: "Bearer " + cookie.get("e-commerce"),
      }});
      setDeletePro((d) => !d);
    }catch(err){
      console.log(err);
    }

  }

  //handleSearch
  function handleSearch(e){
    setSearchTearm(e.target.value);
  }
  //filterSearch
  const FilterProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  //Render Pagination Buttons
  function RenderPagination(){
    const totalPages = Math.ceil(FilterProducts.length / itemspage);
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          style={{
            padding: ".3rem",
            color: "#222",
            outline: "none",
            border: "none",
            cursor: "pointer",
            width: "2rem"
          }}
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}

        >
          {i}
        </button>
      );
    }
    return pages;
  };

  //Mapping Data For Paginate
  const indexOfLastItem = currentPage * itemspage;
  const indexOfFirstItem = indexOfLastItem - itemspage;
  const currentProducts = FilterProducts.slice(indexOfFirstItem, indexOfLastItem);

  const ProductsShow = currentProducts.map((item, key) => (
    <tr key={key}>
      <td>{indexOfFirstItem + key + 1}</td>
      {/* kanchufu dakchi lbghina nafichiwh mn backend wndiruh */}
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td>{item.discount}</td>
      <td>
      {item.images.map((imageObj, key) => (
          <img 
            key={key} 
            src={imageObj.image} 
            alt={`Product ${key}`} 
            style={{ width: '30px', height: '30px', marginRight: '10px' }} 
          />
        ))}
      </td>
      <td>
        <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
          <Link to={`${item.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} cursor={'pointer'} className='action-icon' color='#272829' />
          </Link>
          <FontAwesomeIcon 
            icon={faTrash}
            color='#FF2626'
            cursor={'pointer'}
            className='action-icon'
            onClick={() => handleDelete(item.id)}
          />
        </div>
      </td>
    </tr>
  ))


  return (
    <div className='users'>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <h1 className='title-users'>Products Pages</h1>
        <input
          type='search'
          placeholder='Search'
          className='search-dashboard'
          onChange={handleSearch}
        />
      </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} style={{textAlign: "center"}}>Loading...</td>
            </tr>
          ) : FilterProducts.length === 0 ? (
            <tr>
              <td colSpan={7} style={{textAlign: "center"}}>No Categories Found</td>
            </tr>
          ) : (
            ProductsShow
          )}
          </tbody>
        </table>
        <div className="pagination" style={{ marginTop: "1rem", display: "flex", gap: ".3rem" }}>
          {RenderPagination()}
        </div>
    </div>
  )
}

export default Pruducts
