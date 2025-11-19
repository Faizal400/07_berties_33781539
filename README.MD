# Berties Books - Lab 7
> *A continuation of lab 6*

Sample code for Dynamic Web Applications module.

Uses node.js with Express, EJS, bcryptjs etc.

**Author:** Faizal Ali  
**Student ID:** 33781539  
**Lab 7: Password Hashing + Authentication + Audit Logging**

---

## Overview
This project extends the earlier Bertie’s Books application from Lab 6 (Express + MySQL) by introducing secure authentication features, including:
- Secure password hashing using bcryptjs
- Login with password verification
- An audit log recording all login attempts (success or failure)
- A default login account ("gold" / "smiths") inserted during deployment
- Use of a .env file to store database credentials
- Fully functional routes for searching, listing, adding books, and registering users

---

## Folder Structure

berties-books/
├── node_modules/
├── public/
│   └── main.css
├── routes/
│   ├── books.js
│   ├── main.js
│   └── users.js
├── views/
│   ├── about.ejs
│   ├── addbook.ejs
│   ├── index.ejs
│   ├── list.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── search.ejs
│   └── audit.ejs
├── create_db.sql
├── insert_test_data.sql
├── index.js
├── package.json
├── .env              ← (committed to GitHub)
└── README.md



| Route                  | Method | Purpose                          |
| ---------------------- | ------ | -------------------------------- |
| `/`                    | GET    | Home page                        |
| `/about`               | GET    | About page                       |
| `/books/search`        | GET    | Book search form                 |
| `/books/search-result` | GET    | Displays searched keyword        |
| `/books/list`          | GET    | Lists all books (in a table)     |
| `/books/addbook`       | GET    | Add-book form                    |
| `/books/bookadded`     | POST   | Inserts a new book into DB       |
| `/users/register`      | GET    | User registration form           |
| `/users/registered`    | POST   | Hashes password + inserts user   |
| `/users/login`         | GET    | Login form                       |
| `/users/loggedin`      | POST   | Verifies password + logs attempt |
| `/users/list`          | GET    | Lists all users (no passwords)   |
| `/users/audit`         | GET    | View login audit log             |

---

## Audit logging
Every login attempt is recorded:

| Field      | Description               |
| ---------- | ------------------------- |
| username   | Username attempted        |
| success    | 1 (success) or 0 (failed) |
| message    | Explanation               |
| ip_address | IP of the client          |
| user_agent | Browser/device details    |
| created_at | Timestamp                 |

## Default login (required for marking)

Inserted via ```insert_test_data.sql```:
```makefile
Username: gold
Password: smiths
```
Password is inserted as a correct bcryptjs hash.

---

## Setup

### Database setup

**__1️. Create Database__**
Run inside MySQL:
```sql
source create_db.sql;
source insert_test_data.sql;
```
This creates:
- `berties_books`
- `books`
- `users`
- `audit_log`
Application database user

And includes:
- `5 book entries`
- Default user gold / smiths (bcrypt hashed)

**__2. Verify__**
```sql
USE berties_books;
SELECT * FROM books;
```
---

### Running the app
```cmd
npm install
node index.js
npm install express ejs mysql2 bcryptjs dotenv
```
### Full list of dependencies used:
**Core**
- express – web framework
- ejs – templating engine
- mysql2 – MySQL client
- dotenv – loads `.env` variables
**Security**
- bcryptjs – password hashing
(Older bcrypt versions seem to incompatible or not work with the Goldsmiths VM)

---

**To access locally:** http://localhost:8000/
