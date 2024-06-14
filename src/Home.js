import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import useUserState from './userstate.js';
import './Home.css';
import './AboutUs.css';

const Home = () => {
  const { states, state, setState, district, setDistrict, category, setCategory, handleStateChange, handleDistrictChange, handleCategoryChange, categories } = useUserState();
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [validCodes] = useState(['Ppay@1212', 'Lakshana@Bhargav']);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(null);

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
 
  const handleContentClick = (content) => {
    setShowContent(content);
    window.history.pushState(null, '', `#${content}`);
  };

  const AboutUsContent = () => {
    const navigateHome = useNavigate();

    const handleHomeClick = () => {
      setShowContent(null);
      navigateHome('/');
    };

    return (
      <div className="about-us-container hh">
        <h2>About Us</h2>
        <p>
          Welcome to Nearby, your go-to platform for local ads. Whether you're looking for a job, trying to sell something, or searching for real estate opportunities, Nearby connects you with people and businesses in your area. Our mission is to make it easy for you to find what you need, right where you are. We believe in the power of community and the convenience of local connections. That's why we designed Nearby to be user-friendly, secure, and effective for all your advertising needs. Join us and start exploring what's nearby today!
        </p>
        <a href="#" onClick={handleHomeClick}>
          Home
        </a>
      </div>
    );
  };

  const ContactUsContent = () => {
    

    const handleHomeClick = () => {
      setShowContent(null);
      navigateHome('/');
    };

    return (
      <div className="contact-us-container hh">
        <h2>Contact Us</h2>
        <p>If you have any questions, suggestions, or need support, please feel free to reach out to us at:</p>
        <p>Email: nearbyteam4@gmail.com</p>
        <p>We're here to help you make the most of your Nearby experience!</p>
        <a href="#" onClick={handleHomeClick}>
          Home
        </a>
      </div>
    );
  };

  const PrivacyPolicyContent = () => {
   

    const handleHomeClick = () => {
      setShowContent(null);
      navigateHome('/');
    };

    return (
      <div className="privacy-policy-container hh">
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us at Nearby. We are committed to protecting the personal information you share with us. This policy outlines how we collect, use, and safeguard your data.</p>
        <p>Information Collection: We collect information that you provide when you register, post ads, and interact with our site. This includes your name, contact details, and ad content.</p>
        <p>Use of Information: The information we collect is used to provide and improve our services, process transactions, and communicate with you.</p>
        <p>Data Security: We implement various security measures to ensure your personal information is protected.</p>
        <p>Third-Party Disclosure: We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law.</p>
        <p>Cookies: We use cookies to enhance your experience on our site. You can choose to disable cookies through your browser settings.</p>
        <p>By using our site, you consent to our privacy policy.</p>
        <a href="#" onClick={handleHomeClick}>
          Home
        </a>
      </div>
    );
  };

  const TermsAndConditionsContent = () => {
   

    const handleHomeClick = () => {
      setShowContent(null);
      navigateHome('/');
    };

    return (
      <div className="hh terms-and-conditions-container">
        <h2>Terms &amp; Conditions</h2>
        <p>Welcome to Nearby! By using our website, you agree to the following terms and conditions:</p>
        <p>Ad Posting: Users must provide accurate and truthful information in their ads. Any form of misleading or fraudulent ads is strictly prohibited.</p>
        <p>User Responsibility: Users are responsible for the content they post. Ensure your ads comply with all applicable laws and regulations.</p>
        <p>Prohibited Content: Ads containing offensive, harmful, or illegal content are not allowed. We reserve the right to remove such ads without notice.</p>
        <p>No Additional Charges: Once an ad is posted, the poster cannot request additional money from respondents.</p>
        <p>Termination: We reserve the right to terminate user accounts for violations of these terms.</p>
        <p>Disclaimer: While we strive to keep our platform safe, we are not liable for any damages or losses resulting from the use of our site.</p>
        <a href="#" onClick={handleHomeClick}>
          Home
        </a>
      </div>
    );
  };
  const navigateHome = useNavigate();
  const handleHomeClick = () => {
    setShowContent(null);
    navigateHome('/');
  };
  const CancellationRefundPoliciesContent = () => {
    const navigateHome = useNavigate();

    const handleHomeClick = () => {
      setShowContent(null);
      navigateHome('/');
    };

    return (
      <div className="hh cancellation-refund-policies-container">
        <h2>Cancellation/Refund Policies</h2>
        <p>At Nearby, we aim to provide a straightforward and transparent service. Due to the nature of our platform:</p>
        <p>No Refunds: Once an ad is posted and payment is processed, we do not offer refunds. This policy is in place because your ad is immediately published and accessible to the public.</p>
        <p>No Collections: We do not collect any ongoing fees or additional charges beyond the initial payment for ad posting.</p>
        <p>Ad Removal: If you wish to remove your ad before the end of its paid duration, you can do so from your account settings. However, this does not entitle you to a refund.</p>
        <p>Thank you for using Nearby. We appreciate your understanding and cooperation in adhering to these policies.</p>
        <a href="#" onClick={handleHomeClick}>
          Home
        </a>
      </div>
    );
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
            <a className="nav-item nav-link active" href="#" onClick={handleHomeClick}>Home </a>
              <a className="nav-item nav-link" href="#" onClick={() => handleContentClick('aboutUs')}>About Us</a>
              <a className="nav-item nav-link" href="#" onClick={() => handleContentClick('contactUs')}>Contact Us</a>
<a className="nav-item nav-link" href="#" onClick={() => handleContentClick('privacyPolicy')}>Privacy Policy</a>
<a className="nav-item nav-link" href="#" onClick={() => handleContentClick('termsAndConditions')}>Terms & Conditions</a>
<a className="nav-item nav-link" href="#" onClick={() => handleContentClick('cancellationRefundPolicies')}>Cancellation/Refund Policies</a>
            </div>
          </div>
        </nav>
      </div>
    
      <div className="container mt-4">
      {showContent === 'aboutUs' && <AboutUsContent />}
    {showContent === 'contactUs' && <ContactUsContent />}
    {showContent === 'privacyPolicy' && <PrivacyPolicyContent />}
    {showContent === 'termsAndConditions' && <TermsAndConditionsContent />}
    {showContent === 'cancellationRefundPolicies' && <CancellationRefundPoliciesContent />}
    {!showContent && (
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
        )}
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
