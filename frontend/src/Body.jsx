import React, { useState } from 'react';
import './Body.css';

function Body() {
  const [inputUrl, setInputUrl] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBtn = async () => {
    setMessage({ text: '', type: '' });
    setShortUrl('');

    if (!inputUrl) {
      setMessage({ text: 'Please enter a URL to shorten.', type: 'error' });
      return;
    }

    if (!(inputUrl.startsWith('http://') || inputUrl.startsWith('https://'))) {
      setMessage({ text: 'Please enter a valid URL (starting with http/https).', type: 'error' });
      return;
    }

    if (inputUrl.length <= 8 || inputUrl.length > 400) {
      setMessage({ text: 'URL length seems invalid.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://shortify-qph7.onrender.com/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await response.json();
      if (data.success) {
        setShortUrl(data.shortUrl);
        localStorage.setItem('length', data.length);
        setMessage({ text: 'URL shortened successfully!', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to shorten URL.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Server error. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-container">
      <h1 className="title">🔗 URL Shortener</h1>
      <p className="subtitle">Paste a long URL and get a clean, short link instantly.</p>

      <div className="input-group">
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="input"
          placeholder="e.g. https://example.com/very/long/path"
        />
        <button onClick={handleBtn} className="button" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {shortUrl && (
        <div className="short-url">
          🔍 Short URL:&nbsp;
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              setMessage({ text: 'Short URL copied to clipboard!', type: 'success' });
            }}
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default Body;
