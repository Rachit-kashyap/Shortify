import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './About';
import Contact from './Contact';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
 
  <BrowserRouter>
 <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
    
  </BrowserRouter></>
);
