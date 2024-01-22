// server.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control'); // Add Cache-Control to the allowed headers
  next();
});

app.get('/github/users', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
