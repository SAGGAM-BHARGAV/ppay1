import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Userstate from './userstate.js';

const PaySaggam = () => {
  const [Textarea, setTextarea] = useState('');
  const [Mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [userdata, setUserData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [duration, setDuration] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [setSearchResult] = useState(null);
  const [posts, setPosts] = useState([]);

  const {
    states,
    state,
    district,
    category,
    categories,
    handleStateChange,
    handleDistrictChange,
    handleCategoryChange,
  } = Userstate();

  const durationPrices = {
    '30': 39,
    '90': 51,
    '2592000': 99, // 1 month
    '5184000': 179, // 2 months
    '15552000': 549, // 6 months
    '31536000': 999, // 12 months
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      const currentDate = new Date();
      userdata.forEach(async (user) => {
        const userExpiryDate = new Date(user.createdAt).getTime() + user.duration;
        if (userExpiryDate <= currentDate.getTime()) {
          await handleDelete(user.ID);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userdata]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8084');
      setUserData(filterNullValues(response.data));
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

  const handleTextMobileSubmit = async (e) => {
    e.preventDefault();
    if (!Textarea || !Mobile || !password) {
      alert('Please fill in Textarea, Mobile, and Password');
      return;
    }
    if (Mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits');
      return;
    }
    if (password.length !== 6) {
      alert('Password must be exactly 6 digits');
      return;
    }
  
    const formData = new FormData();
    formData.append('Textarea', Textarea);
    formData.append('Mobile', Mobile);
    formData.append('password', password);
    formData.append('State', state);
    formData.append('District', district);
    formData.append('Category', category);
    formData.append('duration', duration * 1000); // Convert duration to milliseconds
  
    try {
      if (editMode) {
        await axios.put(`http://localhost:8084/userdata/${editUserId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:8084/userdata', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload');
      return;
    }
    if (!Mobile || !password) {
      alert('Please fill in  Mobile, and Password');
      return;
    }
    if (Mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits');
      return;
    }
    if (password.length !== 6) {
      alert('Password must be exactly 6 digits');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);   
    formData.append('Mobile', Mobile);
    formData.append('password', password);
    formData.append('State', state);
    formData.append('District', district);
    formData.append('Category', category);
    formData.append('duration', duration * 1000); // Convert duration to milliseconds
    formData.append('createdAt', new Date());

    try {
      await axios.post('http://localhost:8084/userdata', formData);
      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (userdata) => {
    setEditMode(true);
    setEditUserId(userdata.ID);
    setTextarea(userdata.Textarea);
    setMobile(userdata.Mobile);
    setPassword('');
    setPosts([]); // Clear the password input
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8084/userdata/${userId}`);
      fetchUsers();
      setPosts([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreview = () => {
    if (!Textarea || !Mobile || !state || !district || !category) {
      alert('Please fill in all fields to preview');
      return;
    }
    setPreviewData({
      Textarea,
      Mobile,
      State: state,
      District: district,
      Category: category,
    });
    setPosts(null);
  };

  const fetchPosts = async (searchParams) => {
    try {
      const response = await axios.get('http://localhost:8084/search', { params: searchParams });
      setPosts(filterNullValues(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    const searchParams = { Mobile: Mobile, password: password };
    fetchPosts(searchParams);
    setPreviewData(null);
  };

  const resetForm = () => {
    setTextarea('');
    setMobile('');
    setPassword('');
    handleStateChange({ target: { value: '' } });
    handleDistrictChange({ target: { value: '' } });
    handleCategoryChange({ target: { value: '' } });
    setDuration('');
    setEditMode(false);
    setEditUserId(null);
    setSearchResult(null);
  };

  const handleImageDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8084/userdata/${userId}`);
      fetchUsers();
      setPosts([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-form">
      <div className="left-container">
      <h2>User Details Form</h2>
      <form onSubmit={handleTextMobileSubmit}>
      <label htmlFor="Textarea">Textarea: </label>
      <textarea
    type="text"
    id="Textarea"
    name="Textarea"
    value={Textarea}
    onChange={(e) => setTextarea(e.target.value)}
  />
  <label htmlFor="Mobile">Mobile: </label>
        <input
          type="text"
          id="Mobile"
    name="Mobile"
          value={Mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter mobile number"
        />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
    name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create your 6 digit password"
          required
        />
        {!editMode && (
          <>
            <select value={state} onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <select value={district} onChange={handleDistrictChange}>
              <option value="">Select District</option>
              {states
                .find((s) => s.name === state)?.districts?.map((districtOption) => (
                  <option key={districtOption} value={districtOption}>
                    {districtOption}
                  </option>
                ))}
            </select>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
              <option value="">Select Duration</option>
              <option value={30}>30 seconds</option>
              <option value={90}>90 seconds</option>
              <option value={2592000}>1 month</option>
              <option value={5184000}>2 months</option>
              <option value={15552000}>6 months</option>
              <option value={31536000}>12 months</option> required
            </select>
            <button type="button" onClick={handlePreview}>Preview</button>
          </>
        )}
        <button type="submit">{editMode ? 'Update' : `Pay $${durationPrices[duration] || 0}`}</button>
      </form>
      </div>

      <div className="middle-container">
      <h2>Posted Details</h2>
      {previewData && !posts && (
          <div>
            <p>{previewData.Textarea}</p>
            <p>{previewData.Mobile}</p>
            <p>{previewData.State}</p>
            <p>{previewData.District}</p>
            <p>{previewData.Category}</p>
          </div>
        )} 
        {!previewData && posts && (
        <div >
          {posts.map((post) => (
            <div key={post.ID}>
            {post.Image && post.Mobile ? (
            <>
              <img
                src={`http://localhost:8084/uploads/${post.Image}`}
                alt=""
                width="150px"
                height="200px"
              /> <br />
              <button onClick={() => handleImageDelete(post.ID)}>Delete Image</button>
            </>
          ) : (
            <>
              <p>{post.Textarea}</p>
              <p>{post.Mobile}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => handleDelete(post.ID)}>Delete</button>
            </>
          )}
          </div>
          ))}
          </div>  
        )}
      </div>

      <div className="right-container">
      <h3>Image Upload</h3>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {!editMode && (
          <>
            <input
              type="text"
              value={Mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create your 6 digit password"
              required
            />
            <select value={state} onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <select value={district} onChange={handleDistrictChange}>
              <option value="">Select District</option>
              {states
                .find((s) => s.name === state)?.districts?.map((districtOption) => (
                  <option key={districtOption} value={districtOption}>
                    {districtOption}
                  </option>
                ))}
            </select>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
              <option value="">Select Duration</option>
              <option value={30}>30 seconds</option>
              <option value={90}>90 seconds</option>
              <option value={2592000}>1 month</option>
              <option value={5184000}>2 months</option>
              <option value={15552000}>6 months</option>
              <option value={31536000}>12 months</option>
            </select>
          </>
        )}
        <button type="submit">Pay ${durationPrices[duration] || 0}</button>
      </form>
      <div className="search-container">
        <h3>Search User</h3>
        <div >
             <div >
              <label>Mobile Number</label>
              <input type="text" value={Mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-primary mt-2" onClick={() => {
      if (!Mobile || !password) {
        alert('Both Mobile and Password are required');
        return;
      }
      handleSearch();
    }}>Search</button>
          </div>
          
      </div>
      </div>
    </div>
  );
};

export default PaySaggam;




 