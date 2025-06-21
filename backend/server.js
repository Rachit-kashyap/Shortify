const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require("dotenv").config()
const app = express();
const PORT = 5000;
const dataPath = path.join(__dirname, 'data.json');
const contactFilePath = path.join(__dirname, 'contact.json');



const corsOptions = {
  origin: ['http://localhost:5173', 'http://gleaming-starship-0d78b7.netlify.app'],
  methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json());


app.use(express.json());

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

app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || (!url.startsWith('http://') && !url.startsWith('http://'))) {
    return res.status(400).json({ success: false, message: 'Invalid URL' });
  }

  const data = readData();

  // Always generate a new key, even if the URL exists
  const newKey = generateKey(data);
  data[newKey] = url;
  writeData(data);

  return res.json({
    success: true,
    shortUrl: `http://shortify-qph7.onrender.com/${newKey}`,
    length: `${Object.keys(data).length}`
  });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();

  const originalUrl = data[id];

  if (originalUrl) {
    return res.redirect(originalUrl); 
  } else {
    return res.status(404).send('URL not found');
  }
});

app.get("/",(req,res)=>{
    const data = readData();
    if(Object.keys(data).length==0)
    {
     return res.json({ success: true,length:0 }); 
    }
 return res.json({ success: true,length:`${Object.keys(data).length}` });
})

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
app.listen(PORT, () => {
  console.log(`Server running on http://shortify-qph7.onrender.com`);
});
