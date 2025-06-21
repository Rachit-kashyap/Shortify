import React, { useEffect, useState } from 'react';
import './About.css';
import Header from './Header';
import Footer from './Footer';

function About() {
  const [length, setLength] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLength = async () => {
      try {
        const response = await fetch('https://shortify-qph7.onrender.com', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (data.success) {
          localStorage.setItem('length', data.length);
          setLength(data.length);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error('Error fetching URL length:', err);
        setError(true);
      }
    };

    fetchLength();
  }, []);

  return (
    <>
      <Header />
      <div className="about-container">
        <h1 className="about-title">About Shortify</h1>
        <p className="about-text">
          Welcome to <strong>Shortify</strong> — your simple and fast URL shortener. <br />
          <strong>
            {error
              ? 'Unable to fetch the total URLs at the moment.'
              : `We have shortened ${length ?? '...'} URLs.`}
          </strong>
        </p>
        <p className="about-text">
          Whether you're a student, developer, marketer, or just sharing cool content with friends,
          <strong> Shortify </strong> lets you shorten URLs with just one click.
        </p>
        <p className="about-text">
          This project was built using <strong>React</strong> and <strong>Express.js</strong>,
          with a passion for learning and helping others navigate the web more efficiently.
        </p>
        <p className="about-text">Thank you for using Shortify! 🚀</p>
      </div>
      <Footer />
    </>
  );
}

export default About;
