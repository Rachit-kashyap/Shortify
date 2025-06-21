import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';
import Header from './Header';
import Footer from './Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: '', type: '' });

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return setStatus({ text: 'Please fill in all fields.', type: 'error' });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return setStatus({ text: 'Please enter a valid email address.', type: 'error' });
    }

    setLoading(true);
    try {
      const response = await axios.post('https://shortify-qph7.onrender.com/contact', formData);
      setStatus({ text: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ text: 'Failed to send message. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
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
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="input"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {status.text && (
          <div className={`message ${status.type}`}>
            {status.text}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Contact;
