import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserState from './userstate.js';
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const { states, state, setState, district, setDistrict, category, setCategory, handleStateChange, handleDistrictChange, handleCategoryChange, categories } = useUserState();
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [validCodes, setValidCodes] = useState(['Ppay@1212', 'Lakshana@Bhargav']);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8084/');
      setPosts(filterNullValues(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async (searchParams) => {
    try {
      const response = await axios.get('http://localhost:8084/search', { params: searchParams });
      setPosts(filterNullValues(response.data));
    } catch (err) {
      console.error(err);
    }
  };
  
  const filterNullValues = (data) => {
    return data.map(post => {
      const filteredPost = {};
      for (const key in post) {
        if (post[key] !== '' && post[key] !== 0) {
          filteredPost[key] = post[key];
        }
      }
      return filteredPost;
    });
  };

  const handleSearch = () => {
    const searchParams = { state, district, category };
    fetchPosts(searchParams);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonVisible(validCodes.includes(value));
  };

  const handleEnterClick = () => {
    if (validCodes.includes(inputValue)) {
      navigate('/Ppay@1212saggam');
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const addValidCode = (newCode) => {
    setValidCodes([...validCodes, newCode]);
  };

  const removeValidCode = (codeToRemove) => {
    setValidCodes(validCodes.filter(code => code !== codeToRemove));
  };

  return (
    <div>
      <div className="header-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Logo</a>
        </nav>
      </div>
      <div className="scroll-container">
        <p className="scroll-text">This is a scrolling text moving from right to left, like news scrolling on TV.</p>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 search-container">
            <h1 className="text-2xl font-bold">Search Posts</h1>
            <div className="form-group">
              <label className="blue text-gray-700"></label>
              <select value={state} onChange={(e) => { handleStateChange(e); setState(e.target.value); }} className="form-control">
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label></label>
              <select value={district} onChange={(e) => { handleDistrictChange(e); setDistrict(e.target.value); }} className="form-control">
                <option value="">Select District</option>
                {states.find((s) => s.name === state)?.districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label></label>
              <select value={category} onChange={(e) => { handleCategoryChange(e); setCategory(e.target.value); }} className="form-control">
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSearch}>Search</button>
            <button className="btn btn-secondary mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={() => navigate('/create-post')}>Create Post</button>
          </div>
          <div className="col-md-6 posts-container">
          {posts.map((post) => (
        <div key={post.ID}>
          <p>{post.Textarea}</p>
          <p>{post.Mobile}</p>
          <p>{post.District}  {post.State}</p>
           </div>
      ))}
      {posts.map((post) =>
        post.Image && (
          <div key={post.ID}>
            <img
              src={`http://localhost:8084/uploads/${post.Image}`}
              alt=""
              width="150px"
              height="200px"
            />
              
          </div>
        )
      )}
          </div>
          <div className="col-md-3 note-container">
            <h1>Note</h1>
            <p className="text-20xl font-bold">Paragraph 1</p>
            <p>Paragraph 2</p>
            <p>Paragraph 3</p>
          </div>
        </div>
      </div>

      <div className="down-container text-center mt-4">
        <p>Follow us on</p>
        <p>Email: bhargavb272@gmail.com</p>
        <div className="mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="This is for developing use only"
          />
          {isButtonVisible && (
            <button
              className="btn btn-primary mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleEnterClick}
            >
              Enter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;




