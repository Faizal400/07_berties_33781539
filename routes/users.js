// Create a new router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const saltRounds = 10;

// Registration form
router.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Handle registration – hash password and store in DB
router.post('/registered', (req, res, next) => {
  const { username, first, last, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    const sql =
      'INSERT INTO users (username, first, last, email, password_hash) VALUES (?, ?, ?, ?, ?)';
    const params = [username, first, last, email, hashedPassword];

    db.query(sql, params, (err2, result) => {
      if (err2) {
        return next(err2);
      }

      let msg =
        'Hello ' +
        first +
        ' ' +
        last +
        ' you are now registered!  We will send an email to you at ' +
        email;
      // Lab 7 asks you to output both password + hash (for debugging only!)
      msg +=
        '<br>Your password is: ' +
        password +
        ' and your hashed password is: ' +
        hashedPassword;

      res.send(msg);
    });
  });
});

// List users (no passwords)
router.get('/list', (req, res, next) => {
  const sql = 'SELECT id, username, first, last, email FROM users ORDER BY id';

  db.query(sql, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('users_list.ejs', { users: result });
  });
});

// Login form
router.get('/login', (req, res) => {
  res.render('login.ejs');
});

// Handle login – compare password + record audit log
router.post('/loggedin', (req, res, next) => {
  const { username, password } = req.body;

  const sql = 'SELECT id, username, password_hash FROM users WHERE username = ?';

  db.query(sql, [username], (err, rows) => {
    if (err) {
      return next(err);
    }

    if (rows.length === 0) {
      const message = 'Login failed: user not found';
      return logAudit(username, false, message, req, (logErr) => {
        if (logErr) return next(logErr);
        res.send(message);
      });
    }

    const user = rows[0];
    const hashedPassword = user.password_hash;
    console.log("HASHEDPASSWORD:", hashedPassword);
    console.log("DEBUG: Comparing now…");
    console.log("TYPEOF password:", typeof password);
    console.log("TYPEOF hash:", typeof hashedPassword);
    console.log("PASSWORD LENGTH:", password.length);
    console.log("HASH LENGTH:", hashedPassword.length);
    bcrypt.compare(password, hashedPassword, (err2, match) => {
        console.log("RAW COMPARE RESULT:", match);
        console.log("ERROR FROM COMPARE:", err2);
      if (err2) {
        return next(err2);
      }

      if (match) {
        const message = 'Login successful. Welcome, ' + user.username + '!';
        logAudit(username, true, message, req, (logErr) => {
          if (logErr) return next(logErr);
          res.send(message);
        });
      } else {
        const message = 'Login failed: incorrect password';
        logAudit(username, false, message, req, (logErr) => {
          if (logErr) return next(logErr);
          res.send(message);
        });
      }
    });
  });
});

// Helper: write an audit log entry
function logAudit(username, success, message, req, callback) {
  const sql =
    'INSERT INTO audit_log (username, success, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)';
  const params = [
    username || '',
    success ? 1 : 0,
    message,
    req.ip || '',
    req.headers['user-agent'] || '',
  ];

  db.query(sql, params, callback);
}

// View audit log
router.get('/audit', (req, res, next) => {
  const sql =
    'SELECT id, username, success, message, ip_address, user_agent, created_at FROM audit_log ORDER BY created_at DESC';

  db.query(sql, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('audit.ejs', { auditEntries: result });
  });
});

// TEMP: debug route to generate a hash for "smiths"
router.get('/debug-hash-smiths', (req, res, next) => {
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;

  bcrypt.hash('smiths', saltRounds, (err, hash) => {
    if (err) return next(err);
    console.log('DEBUG SMITHS HASH:', hash);
    res.send('Hash for "smiths": ' + hash);
  });
});

// Export the router object so index.js can access it
module.exports = router;
