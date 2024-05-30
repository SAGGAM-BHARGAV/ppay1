import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import PaySaggam from './paysaggam.js';
import EditForm from './editform.js'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<EditForm />} />
      <Route path="/PaySaggam" element={<PaySaggam />} />
    </Routes>
  );
};

export default App;