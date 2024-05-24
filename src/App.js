import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Ppaysaggam from './Ppay@1212saggam.js';
import EditForm from './editform.js';

 
 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<EditForm />} />
      <Route path="/Ppay@1212saggam" element={<Ppaysaggam />} />
    </Routes>
  );
};

export default App;
