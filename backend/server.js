const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// File paths
const dataPath = path.join(__dirname, 'data.json');
const contactFilePath = path.join(__dirname, 'contact.json');

// Allow only specific origins and methods
const corsOptions = {
origin: 'https://gleaming-starship-0d78b7.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Utility Functions
function readData() {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '{}');
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function generateKey(existing) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_@#%';
  let key;
  do {
    key = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (existing[key]);
  return key;
}

// Shorten URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return res.status(400).json({ success: false, message: 'Invalid URL' });
  }

  const data = readData();
  const newKey = generateKey(data);
  data[newKey] = url;
  writeData(data);

  return res.json({
    success: true,
    shortUrl: `https://shortify-qph7.onrender.com/${newKey}`,
    length: Object.keys(data).length
  });
});

// Redirect
app.get('https://shortify-qph7.onrender.com/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();

  const originalUrl = data[id];

  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.status(404).send('URL not found');
  }
});

// Total URL Count
app.get("/", (req, res) => {
  const data = readData();
  return res.json({ success: true, length: Object.keys(data).length });
});

// Contact file utilities
function ensureContactFile() {
  if (!fs.existsSync(contactFilePath)) {
    fs.writeFileSync(contactFilePath, '[]');
  }
}

function readContacts() {
  ensureContactFile();
  return JSON.parse(fs.readFileSync(contactFilePath, 'utf-8'));
}

function writeContacts(data) {
  fs.writeFileSync(contactFilePath, JSON.stringify(data, null, 2));
}

// Contact API
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const contacts = readContacts();
  const newContact = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  contacts.push(newContact);
  writeContacts(contacts);

  res.status(201).json({ success: true, message: 'Contact saved successfully.' });
});

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} OR https://shortify-qph7.onrender.com`);
});
