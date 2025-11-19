// Create a new router
const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index.ejs');
});

// About page
router.get('/about', (req, res) => {
  res.render('about.ejs');
});

// Export the router object so index.js can access it
module.exports = router;
