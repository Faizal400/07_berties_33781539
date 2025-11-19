// Create a new router
const express = require('express');
const router = express.Router();

// Show search form
router.get('/search', (req, res) => {
  res.render('search.ejs');
});

// Advanced search: title contains keyword (case-insensitive)
router.get('/search-result', (req, res, next) => {
  const keyword = req.query.keyword || '';

  const sqlquery = 'SELECT name, price FROM books WHERE name LIKE ?';
  const searchTerm = '%' + keyword + '%';

  db.query(sqlquery, [searchTerm], (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('search_results.ejs', { keyword, results: result });
  });
});

// List all books
router.get('/list', (req, res, next) => {
  const sqlquery = 'SELECT name, price FROM books ORDER BY name';

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('list.ejs', { availableBooks: result });
  });
});

// Bargain books (< £20)
router.get('/bargainbooks', (req, res, next) => {
  const sqlquery = 'SELECT name, price FROM books WHERE price < 20 ORDER BY price';

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(err);
    }
    // Re-use list.ejs to keep it simple
    res.render('list.ejs', { availableBooks: result });
  });
});

// Show add-book form
router.get('/addbook', (req, res) => {
  res.render('addbook.ejs');
});

// Handle add-book submission
router.post('/bookadded', (req, res, next) => {
  const newrecord = [req.body.name, req.body.price];
  const sqlquery = 'INSERT INTO books (name, price) VALUES (?, ?)';

  db.query(sqlquery, newrecord, (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(
      ' This book is added to database, name: ' +
        req.body.name +
        ' price ' +
        req.body.price
    );
  });
});

// Export the router object so index.js can access it
module.exports = router;
