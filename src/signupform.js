import React, { useState } from 'react';
import { sendOTP } from './sms';

const App = () => {
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isLogInFormOpen, setIsLogInFormOpen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [users, setUsers] = useState([]);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setIsOtpSent(true);
    sendOTP(mobileNumber, newOtp);
  };

  const handleSignUpFormSubmit = () => {
    if (otp === generatedOtp) {
      const newUser = { username, mobileNumber, email, address };
      setUsers([...users, newUser]);
      alert('Successfully Submitted');
      setIsSignUpFormOpen(false);
      setUsername('');
      setMobileNumber('');
      setEmail('');
      setAddress('');
      setOtp('');
      setGeneratedOtp('');
      setIsOtpSent(false);
    } else {
      alert('Please enter your correct OTP');
    }
  };

  const handleLogInFormSubmit = () => {
    if (otp === generatedOtp) {
      // Display ads posting page (omitted for simplicity)
      console.log('Ads posting page');
      setIsLogInFormOpen(false);
      setMobileNumber('');
      setOtp('');
      setGeneratedOtp('');
      setIsOtpSent(false);
    } else {
      alert('Please enter your correct OTP');
    }
  };

  return (
    <div>
      <button onClick={() => setIsSignUpFormOpen(true)}>Sign up</button>
      <button onClick={() => setIsLogInFormOpen(true)}>Log in</button>

      {isSignUpFormOpen && (
        <div>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button onClick={generateOtp}>Enter</button>
          {isOtpSent && (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <button onClick={handleSignUpFormSubmit}>Submit</button>
              <span onClick={generateOtp}>Resend OTP</span>
            </div>
          )}
        </div>
      )}

      {isLogInFormOpen && (
        <div>
          <h2>Log In</h2>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <button onClick={generateOtp}>Enter</button>
          {isOtpSent && (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <button onClick={handleLogInFormSubmit}>Submit</button>
              <span onClick={generateOtp}>Resend OTP</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'nearby',
});

// POST route to add user details
app.post('/api/users', upload.single('image'), (req, res) => {
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const query = 'INSERT INTO userdata (Textarea, Mobile, Image, State, District, Category) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category], (err, result) => {
    if (err) throw err;
    res.send('User details added successfully');
  });
});

// GET route to fetch all user details
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM userdata';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// PUT route to update user details
app.put('/api/users/:id', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const query = 'UPDATE userdata SET Textarea = ?, Mobile = ?, Image = ?, State = ?, District = ?, Category = ? WHERE ID = ?';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category, userId], (err, result) => {
    if (err) throw err;
    res.send('User details updated successfully');
  });
});

// DELETE route to delete user details
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT Image FROM userdata WHERE ID = ?';
  db.query(query, [userId], (err, result) => {
    if (err) throw err;
    const imagePath = result[0].Image;
    if (imagePath) {
      fs.unlink(imagePath, (err) => {
        if (err) throw err;
        const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
        db.query(deleteQuery, [userId], (err, result) => {
          if (err) throw err;
          res.send('User details deleted successfully');
        });
      });
    } else {
      const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
      db.query(deleteQuery, [userId], (err, result) => {
        if (err) throw err;
        res.send('User details deleted successfully');
      });
    }
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});



const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nearby',
});

// POST route to add user details
app.post('/userdata', upload.single('image'), (req, res) => {
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const query = 'INSERT INTO userdata (Textarea, Mobile, Image, State, District, Category) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category], (err, result) => {
    if (err) throw err;
    res.send('User details added successfully');
  });
});

// GET route to fetch all user details
app.get('/', (req, res) => {
  const query = 'SELECT * FROM userdata';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// PUT route to update user details
app.put('/userdata/:id', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const query = 'UPDATE userdata SET Textarea = ?, Mobile = ?, Image = ?, State = ?, District = ?, Category = ? WHERE ID = ?';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category, userId], (err, result) => {
    if (err) throw err;
    res.send('User details updated successfully');
  });
});

// DELETE route to delete user details
app.delete('/userdata/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT Image FROM userdata WHERE ID = ?';
  db.query(query, [userId], (err, result) => {
    if (err) throw err;
    const imagePath = result[0].Image;
    if (imagePath) {
      fs.unlink(imagePath, (err) => {
        if (err) throw err;
        const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
        db.query(deleteQuery, [userId], (err, result) => {
          if (err) throw err;
          res.send('User details deleted successfully');
        });
      });
    } else {
      const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
      db.query(deleteQuery, [userId], (err, result) => {
        if (err) throw err;
        res.send('User details deleted successfully');
      });
    }
  });
});

app.listen(8084, () => {
  console.log('Server is running on port 8080');
});








/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nearby',
});

// POST route to add user details
app.post('/userdata', upload.single('image'), (req, res) => {
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : '';

  const query = 'INSERT INTO userdata (Textarea, Mobile, Image, State, District, Category) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category], (err, result) => {
    if (err) throw err;
    res.send('User details added successfully');
  });
});

// GET route to fetch all user details
app.get('/', (req, res) => {
  const query = 'SELECT * FROM userdata';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// PUT route to update user details
app.put('/userdata/:id', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const { Textarea, Mobile, State, District, Category } = req.body;
  const imagePath = req.file ? req.file.path : '';

  const query = 'UPDATE userdata SET Textarea = ?, Mobile = ?, Image = ?, State = ?, District = ?, Category = ? WHERE ID = ?';
  db.query(query, [Textarea, Mobile, imagePath, State, District, Category, userId], (err, result) => {
    if (err) throw err;
    res.send('User details updated successfully');
  });
});

// DELETE route to delete user details
app.delete('/userdata/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT Image FROM userdata WHERE ID = ?';
  db.query(query, [userId], (err, result) => {
    if (err) throw err;
    const imagePath = result[0].Image;
    if (imagePath) {
      fs.unlink(imagePath, (err) => {
        if (err) throw err;
        const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
        db.query(deleteQuery, [userId], (err, result) => {
          if (err) throw err;
          res.send('User details deleted successfully');
        });
      });
    } else {
      const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';
      db.query(deleteQuery, [userId], (err, result) => {
        if (err) throw err;
        res.send('User details deleted successfully');
      });
    }
  });
});

app.listen(8084, () => {
  console.log('Server is running on port 8080');
}); */

import React, { useState } from 'react';
import axios from 'axios';
import OTPVerification from './components/OTPVerification/index.js';
import './EditForm.css'; // Add your CSS here

const EditForm = () => {
  const [mobile, setMobile] = useState('');
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const validateMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const handleOtpSuccess = () => {
    setOtpVerified(true);
    if (triggerSearch) {
      handleSearch();
      setTriggerSearch(false);
    }
  };

  const fetchPosts = async (searchParams) => {
    try {
      const response = await axios.get('http://localhost:8084/search', { params: searchParams });
      const filteredPosts = filterNullValues(response.data);
      if (filteredPosts.length > 0) {
        setPost(filteredPosts[0]); // Assuming you want to display the first matching post
        setMessage('');
      } else {
        setPost(null);
        setMessage('There are no posts above this number or your post has expired.');
      }
    } catch (err) {
      console.error('Error fetching post details:', err);
    }
  };

  const filterNullValues = (data) => {
    return data.map(post => {
      const filteredPost = {};
      for (const key in post) {
        if (post[key] !== '' && post[key] !== 0 && post[key] !== null) {
          filteredPost[key] = post[key];
        }
      }
      return filteredPost;
    });
  };

  const handleSearch = () => {
    if (!validateMobile(mobile)) {
      alert('Enter your exact post number');
      return;
    }

    if (otpVerified) {
      fetchPosts({ mobile });
    } else {
      setTriggerSearch(true);
    }
  };

  const handleEdit = () => {
    // Implement edit logic
  };

  const handleDelete = () => {
    // Implement delete logic
  };

  return (
    <div className="edit-form">
      <div className="left-container">
        <input
          type="text"
          placeholder="Enter 10 digit post number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="middle-container">
        {otpVerified ? (
          post ? (
            <div>
              <textarea value={post.Textarea} readOnly />
              <input type="text" value={post.Mobile} readOnly />
              {post.Image && <img src={`http://localhost:8084/${post.Image}`} alt="Post" />}
              <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          ) : (
            <p>{message}</p>
          )
        ) : (
          <OTPVerification onSuccess={handleOtpSuccess} />
        )}
      </div>

      <div className="right-container">
        {/* Additional content can be added here */}
      </div>
    </div>
  );
};

export default EditForm;
