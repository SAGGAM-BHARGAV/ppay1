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
      navigate('/PaySaggam');
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
      <div className="header-container fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src="https://i.ibb.co/9cVnhNw/Pngtree-3d-rendering-announcement-icon-8918401.png" width="70" height="50" class="d-inline-block align-top" alt="" />
            nearby<span class="com">.com</span>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link active " href="#">Home </a>
              <a class="nav-item nav-link" href="#">Careers</a>
              <a class="nav-item nav-link" href="#">About Us</a>
              <a class="nav-item nav-link disabled" href="#">Connect with Us</a>
            </div>
          </div>
        </nav>
      </div>
      
  
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 searc-container fixed-left">
            <h1 className="text-10xl font-bold">Search Ads</h1>
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
            <button className="btn btn-primary nav-item bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSearch}>Search</button> <br/>
            <button className="btn btn-secondary  bg-gray-500 text-white py-2 mt-1 px-1 rounded-md hover:bg-gray-600" onClick={() => navigate('/create-post')}>Create&Edit Post</button>
          </div>

          <div className="main-content">
          <div className="col-md-6 posts-container">
            {posts.map((post) => (
              <div key={post.ID} className="post-container">
                <p><span className="label">Ad:</span> {post.Textarea}</p>
                <p><span className="label">Phone:</span>{post.Mobile}</p>
                <p><span className="label">Place:</span>{post.District} , {post.State}.</p>
              </div>
            ))}
            {posts.map((post) =>
              post.Image && (
                <div key={post.ID} className="post-container">
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
          </div>
          <div className="col-md-3 note-container fixed-right">
            <h1>Note</h1>
            <p className="note-text">"Before responding to announcements from Nearby, we emphasize the importance of carefully verifying and not trusting fraudulent announcements."
</p>   <br/>
            <p className="note-text">"Nearby ద్వారా వెలువడే ప్రకటనలకు ప్రతిస్పందించే ముందు, తగిన విధంగా పరిశీలించి, మోసపూరిత ప్రకటనలను నమ్మవద్దని తెలుపుతున్నాము."
</p><br/>
            <p className="note-text">"Nearby द्वारा की गई घोषणाओं पर प्रतिक्रिया देने से पहले, हम यह बताना चाहते हैं कि सही तरीके से जांच करें और धोखाधड़ीपूर्ण घोषणाओं पर विश्वास न करें।</p>
          </div>
        </div>
      </div>
  
      <div className="dow-container text-center fixed-bottom mt-4">
        <p>Follow us on</p>
        <p>Email: nearbyteam4@gmail.com</p>
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




