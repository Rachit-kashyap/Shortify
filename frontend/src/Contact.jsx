import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'; // Link your CSS file here
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
if(!formData.name || !formData.email || !formData.message) return setStatus("Please Enter Field");  
if(!(formData.email.includes("@"))) return setStatus("Please Enter Valid email");  
    try {
      const response = await axios.post('https://shortify-qph7.onrender.com/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Try again.');
    }
  };


  

  return (
    <>
    <Header/>
    <div className="about-container">
      <h1 className="about-title">Contact Us</h1>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="input"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="button">Send</button>
      </form>
      {status && <div className="message success">{status}</div>}
    </div>
    <Footer/>
    </>
  );
}

export default Contact;
