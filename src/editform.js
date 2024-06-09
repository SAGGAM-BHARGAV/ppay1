import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Userstate from './userstate.js';
import { useNavigate } from 'react-router-dom';
import './EditForm.css';

const EditForm = () => {
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
  const navigate = useNavigate();
  const [] = useState(new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }));
  const [isTextMode, setIsTextMode] = useState(false); // New state to track text mode
  const [isImageMode, setIsImageMode] = useState(false);

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
    '2592000': 99,
    '5184000': 179,
    '15552000': 549,
    '31536000': 999,
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

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount, isImageUpload) => {
    if (!Mobile || !password) {
      alert('Please fill in Mobile, and Password');
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
  
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
    if (!res) {
      alert('You are offline... Failed to load Razorpay SDK');
      return;
    }
  
    const options = {
      key: 'rzp_test_n7o7FtkWD4wV92',
      currency: 'INR',
      amount: amount * 100,
      name: 'nearby',
      description: 'Thanks for purchasing',
      image: 'https://images.app.goo.gl/mCnzZoJ2AYPvYK6N6',
  
      handler: async function (response) {
        const formData = new FormData();
        formData.append('Textarea', Textarea);
        if (isImageUpload && image) {
          formData.append('image', image);
        }
        formData.append('Mobile', Mobile);
        formData.append('password', password);
        formData.append('State', state);
        formData.append('District', district);
        formData.append('Category', category);
        formData.append('duration', duration * 1000);
        formData.append('createdAt', new Date());
  
        try {
          await axios.post('http://localhost:8084/userdata', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);
          alert("your ad was created");
          fetchUsers();
          resetForm();
        } catch (err) {
          console.error(err);
        }
      },
      prefill: {
        name: 'nearby',
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleTextMobileSubmit = async (e) => {
    e.preventDefault();
    if (!Textarea || !Mobile || !password) {
      alert('Please fill in Textarea, Mobile, and Password');
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
    

    setIsTextMode(true); 
    setIsImageMode(false);
    if (editMode) {
        try {
          await axios.put(`http://localhost:8084/userdata/${editUserId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          alert('Data updated successfully');
          fetchUsers();
          resetForm();
        } catch (err) {
          console.error(err);
        }
      } else {
        displayRazorpay(durationPrices[duration], formData, false);
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
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('Mobile', Mobile);
    formData.append('password', password);
    formData.append('State', state);
    formData.append('District', district);
    formData.append('Category', category);
    formData.append('duration', duration * 1000); // Convert duration to milliseconds
    formData.append('createdAt', new Date());
    
    setIsTextMode(false);
    setIsImageMode(true);
    if (editMode) {
        try {
          await axios.put(`http://localhost:8084/userdata/${editUserId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          alert('Data updated successfully');
          fetchUsers();
          resetForm();
        } catch (err) {
          console.error(err);
        }
      } else {
        displayRazorpay(durationPrices[duration], formData, true);
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
    setIsTextMode(true); // Set text mode to true
    setIsImageMode(false);
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
    setIsTextMode(false); // Set text mode to false
    setIsImageMode(false);
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
    setIsTextMode(false); // Reset text mode
    setIsImageMode(false);
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
              <a class="nav-item nav-link active " onClick={() => navigate('/')}>Home </a>
              <a class="nav-item nav-link" href="#">Careers</a>
              <a class="nav-item nav-link" href="#">About Us</a>
              <a class="nav-item nav-link disabled" href="#">Connect with Us</a>
            </div>
          </div>
        </nav>
      </div>
    <div className="scroll-container">
        <p className="scroll-text">"The announcements will be displayed in the same language in which you enter and post them." & "మీరు మీ ప్రకటనలను ఎలాంటి భాషలో నమోదు చేసి పోస్ట్ చేస్తారో, అదే భాషలో అవి ప్రదర్శించబడతాయి." & "आप जिस भाषा में अपनी घोषणाएँ दर्ज और पोस्ट करेंगे, उसी भाषा में वे प्रदर्शित की जाएँगी।" </p>
      </div>

      <div className="left-container">
      <div>
      <button
        className="btn btn-primary mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={() => navigate('/')}
      >
        Home
      </button>
        <h2 className="hh">Create Your Ad</h2>
        <form onSubmit={handleTextMobileSubmit}>
          {!isImageMode && (
            <div className="form-group">
              <label htmlFor="Textarea"  >Textarea: </label>
              <textarea
                type="text"
                id="Textarea"
                name="Textarea"
                value={Textarea}
                onChange={(e) => setTextarea(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
          <label htmlFor="Mobile">Mobile: </label>
          <input
            type="text"
            id="Mobile"
            name="Mobile"
            value={Mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />
          </div>
<div className="form-group">
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
          </div>
          {!editMode && !isImageMode && (
            <>
            <div className="form-group">
              <select value={state} onChange={handleStateChange}>
                <option value="">Select State</option>
                {states.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
</div>
              <div className="form-group">
              <select value={district} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                {states
                  .find((s) => s.name === state)?.districts?.map((districtOption) => (
                    <option key={districtOption} value={districtOption}>
                      {districtOption}
                    </option>
                  ))}
              </select>
</div>
              <div className="form-group">
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              </div>
              <div className="form-group">
              <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
                <option value="">Select Duration</option> 
                <option value={2592000}>1 month</option>
                <option value={5184000}>2 months</option>
                <option value={15552000}>6 months</option>
                <option value={31536000}>12 months</option>
              </select>
              </div>
              <button type="button"  className="form-group btn btn-primary mt-1" onClick={handlePreview}>Preview</button>
            </>
          )}
          <button type="submit" className="form-group btn btn-primary mt-1">
            {editMode ? 'Update' : `Pay $${durationPrices[duration] || 0}`}
          </button>
        </form>
      </div>
</div>
          <div className="main-content">  
      <div className="middle-container text-center">
        <h2 className="label">Ad Details</h2>
        {previewData && !posts && isTextMode && (
          <div>
            <p><span className="label">Ad:</span>{previewData.Textarea}</p>
            <p><span className="label">Phone:</span>{previewData.Mobile}</p>
            <p><span className="label">State:</span>{previewData.State}</p>
            <p><span className="label">District:</span>{previewData.District}</p>
            <p><span className="label">Category:</span>{previewData.Category}</p>
          </div>
        )}
        {!previewData && posts && (
          <div>
            {posts.map((post) => (
              <div key={post.ID}>
                {post.Image && post.Mobile ? (
                  <>
                    <img
                      src={`http://localhost:8084/uploads/${post.Image}`}
                      alt=""
                      width="150px"
                      height="200px"
                    />
                    <br />
                    <button className="form-group btn btn-primary" onClick={() => handleImageDelete(post.ID)}>Delete Image</button>
                  </>
                ) : (
                  <>
                    <p><span className="label">Ad:</span>{post.Textarea}</p>
                    <p><span className="label">Phone:</span>{post.Mobile}</p>
                    <button className="form-group btn btn-primary" onClick={() => handleEdit(post)}>Edit</button>
                    <button className="form-group btn btn-primary" onClick={() => handleDelete(post.ID)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
</div>
      <div className="right-container">
        <h3 className="hh">Image Upload</h3>

        <form onSubmit={handleImageUpload}>
          {!isTextMode && (
            <div className="form-group">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            </div>
          )}
          <div className="form-group">
          <input
            type="text"
            value={Mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />
          </div>
<div className="form-group">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create your 6 digit password"
            required
          />
          </div>
          {!editMode && !isTextMode && (
            <>
            <div className="form-group">
              <select value={state} onChange={handleStateChange}>
                <option value="">Select State</option>
                {states.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
</div>
              <div className="form-group">
              <select value={district} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                {states
                  .find((s) => s.name === state)?.districts?.map((districtOption) => (
                    <option key={districtOption} value={districtOption}>
                      {districtOption}
                    </option>
                  ))}
              </select>
</div>
              <div className="form-group">
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
</div>
              <div className="form-group">
              <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
                <option value="">Select Duration</option> 
                <option value={2592000}>1 month</option>
                <option value={5184000}>2 months</option>
                <option value={15552000}>6 months</option>
                <option value={31536000}>12 months</option>
              </select>
              </div>
            </>
          )}
          <button type="submit" className="form-group btn btn-primary mt-2">
            Pay ${durationPrices[duration] || 0}
          </button>
        </form>
        <div className="">
          <h3 className="hh">Edit & Delete Your Ad</h3>
          <div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                if (!Mobile || !password) {
                  alert('Both Mobile and Password are required');
                  return;
                }
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="down-container text-center fixed-bottom mt-4">
        <p>Follow us on</p>
        <p>Email: nearbyteam4@gmail.com</p>
        </div>
    </div>
  );
};

export default EditForm;
