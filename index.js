// Load environment variables
require('dotenv').config();

// Import modules
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql2');

// Create the express application object
const app = express();
const port = process.env.PORT || 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser
app.use(express.urlencoded({ extended: true }));

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')));

// Define our application-specific data (available in all templates as shopData)
app.locals.shopData = { shopName: "Bertie's Books" };

// Define the database connection pool (using dotenv with safe defaults)
const db = mysql.createPool({
  host: 'localhost',
  user: process.env.BB_USER,
  password: process.env.BB_PASSWORD,
  database: process.env.BB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
global.db = db;

// Load the route handlers
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const booksRoutes = require('./routes/books');
app.use('/books', booksRoutes);

// Start the web app listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
