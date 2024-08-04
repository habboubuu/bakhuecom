import React, { useEffect, useState } from 'react';
import Cookie from "cookie-universal";
import { Link } from 'react-router-dom';
import { CATEGORY, CATEGORIES, baseURL } from '../../Api/api';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [deleteCat, setDeleteCat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // لمعرفة عدد الصفحات
  const itemsPerPage = 10; // عدد العناصر في كل صفحة
  const [searchTerm, setSearchTerm] = useState('');


  // Cookie
  const cookie = Cookie();

  // GET ALL CATEGORIES
  useEffect(() => {
      setLoading(true);
        axios.get(`${baseURL}/${CATEGORIES}`, {
          headers: {
            Authorization: "Bearer " + cookie.get("e-commerce"),
          }
        })
        .then((data) => setCategories(data.data))
        .then(() => setLoading(false))
        .catch((err) => console.log(err))    
  }, [deleteCat]);

  // HANDLE SEARCH
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // FILTER CATEGORIES BASED ON SEARCH TERM
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // DELETE CATEGORY
  async function handleDelete(id){
    try {
      await axios.delete(`${baseURL}/${CATEGORY}/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("e-commerce"),
        }
      });
      setDeleteCat(!deleteCat);
    } catch (err) {
      console.log(err);
    }
  };

  // RENDER PAGINATION BUTTONS
  function renderPagination(){
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const pages = [];
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

  // MAPPING DATA FOR CURRENT PAGE
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const categoriesShow = currentCategories.map((item, key) => (
    <tr key={key}>
      <td>{indexOfFirstItem + key + 1}</td>
      <td>{item.title}</td>
      <td>
        <img src={item.image} alt='category-image' width="40px" />
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
  ));

  return (
    <div className='users'>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 className='title-users'>Categories Page</h1>
        <input
          type="search"
          placeholder='Search'
          className='search-dashboard'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "3rem" }}>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th style={{ width: "6rem", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>Loading...</td>
            </tr>
          ) : filteredCategories.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>No Categories Found</td>
            </tr>
          ) : (
            categoriesShow
          )}
        </tbody>
      </table>
      <div className="pagination" style={{ marginTop: "1rem", display: "flex", gap: ".3rem" }}>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Categories;
