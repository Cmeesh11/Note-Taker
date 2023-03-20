// Requiring modules
const express = require('express');
const { join } = require('path');
const api = require('./routes/index.js');
// Setting port to 3001
const port = process.env.PORT || 3001;

// Creating instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
// References static files in the public folder
app.use(express.static('public'));

// Loads notes.html page
app.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, 'public/notes.html'));
});

// Loads index.html page
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
})


// Listening for port 3001
app.listen(port, () => {
  console.log(`Server running at port ${port}.`);
})