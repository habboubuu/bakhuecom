import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookie from "cookie-universal";
import { USER, USERS, baseURL } from '../../Api/api';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';



const Users = () => {

  const [users, setUsers] = useState([]);
  const [CurrentUser, setCurrentUser] = useState("");
  const [deleteUser, setDeleteUser] = useState(false); //had state bach ndiruha f useeffect bach ytmsa7 user f blasa 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // saf7a 7alya
  const itemsPage = 10; //3adad 3anaser f page

  
  const cookie = Cookie();

  /** CURRENT USER  **/
  useEffect(() => {
    axios.get(`${baseURL}/${USER}`, {headers: {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    .then((res) => setCurrentUser(res.data));
  }, [])


  /***  GET ALL USERS  ***/
  useEffect(() => {
    axios.get(`${baseURL}/${USERS}`, {headers: {
      Authorization: "Bearer " + cookie.get("e-commerce"),
    }})
    //.then((data) => console.log(data.data))
    .then((data) => setUsers(data.data))
    .then(() => setLoading(false))
    .catch((err) => console.log(err));
  }, [deleteUser])


  //handleDelete
  async function handleDelate(id){
    if (CurrentUser.id !== id){ //man7dfuch user ldkhlin bih
      try{
        const res = await axios.delete(`${baseURL}/${USER}/${id}`, {headers: {
          Authorization: "Bearer " + cookie.get("e-commerce"),
        }})
        setDeleteUser((d) => !d); // (d) => !d y3ni nb9a ndir w n3awd
      }catch(err){
        console.log(err);
      }
    }
  }

  //handleSearch
  function handleSearch(e){
    setSearchTerm(e.target.value);
  }
  //filterSearch
  const FilterUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())); 

  //Render Pagination buttons:
  function renderPagination(){
    const totalPages = Math.ceil(FilterUsers.length / itemsPage);
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

  /*
  currentPage عند الضغط على أحد أزرار الترقيم الصفحي، يتم تحديث  
  وهذا يؤدي إلى إعادة حساب الفهارس وبالتالي إعادة عرض العناصر التي تنتمي للصفحة الجديدة
  */


  //Mapping Data Fro Current Page
  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentUsers = FilterUsers.slice(indexOfFirstItem, indexOfLastItem)

  const usersShow = currentUsers.map((item, key) => (
    <tr key={key}>
      <td>{indexOfFirstItem + key + 1}</td>
      <td>{item.name === CurrentUser.name ? item.name + " (You)" : item.name}</td>
      <td>{item.email}</td>
      <td>{ //Permission
      item.role === "1995" ? "Admin"
      : item.role === "1999" ? "Product Manger"
      : item.role === "1996" ? "Writer"
      : item.role === "2001" ? "User"
      : "Uknown Role"
      }</td>
  
      <td>
        <div style={{display:"flex", justifyContent:"flex-start", gap:"1.2rem"}}>
          <Link to={`${item.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} cursor={'pointer'} className='action-icon' color='#272829' />
          </Link>
          {CurrentUser.name !== item.name &&
          <FontAwesomeIcon 
            icon={faTrash}
            color='#FF2626'
            cursor={'pointer'}
            className='action-icon'
            onClick={() => handleDelate(item.id)}
          />
          }
        </div>
      </td>
    </tr>
  ));

  return (
    <div className='users'>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <h1 className='title-users'>Users Pages</h1>
        <input 
        type='search'
        className='search-dashboard'
        placeholder='Search'
        onChange={handleSearch}
        value={searchTerm}
        />
      </div>
        <table>
          <thead>
            <tr>
              <th style={{width:"3rem"}}>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{width:"6rem", textAlign:"center"}}>Action</th>
            </tr>
          </thead>
          <tbody>{loading ? (
            <tr>
              <td colSpan={5} style={{textAlign:"center"}}>Loading...</td>
            </tr>
          ) : FilterUsers.length === 0  ? ( // lkan NoUser true
            <tr>
              <td colSpan={5} style={{textAlign:"center"}}>No Users Found</td>
            </tr>
          ) : (usersShow)}</tbody>
        </table>
        <div className="pagination" style={{ marginTop: "1rem", display: "flex", gap: ".3rem" }}>
          {renderPagination()}
        </div>
    </div>
    
  )
}

export default Users
