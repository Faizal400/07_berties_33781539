# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

**Author:** Faizal Ali  
**Student ID:** 33781539  
**Lab 6: Express + MySQL Integration**

---

## Overview
This project is a Node.js + Express web application for a fictional bookstore **Bertie’s Books**.  
It demonstrates integration between an Express.js server and a MySQL database using the `mysql2` module.  
The app provides features for:
- Searching books
- Viewing book listings
- Adding new books
- Registering users with email validation

---

## Folder Structure

berties-books/
├── node_modules/
├── public/
│ └── main.css
├── routes/
│ ├── books.js
│ ├── main.js
│ └── users.js
├── views/
│ ├── about.ejs
│ ├── addbook.ejs
│ ├── index.ejs
│ ├── list.ejs
│ ├── register.ejs
│ └── search.ejs
├── create_db.sql
├── insert_test_data.sql
├── index.js
├── package.json
└── README.md


| Route                  | Method | Description                  |
| ---------------------- | ------ | ---------------------------- |
| `/`                    | GET    | Home page                    |
| `/about`               | GET    | About page                   |
| `/users/register`      | GET    | User registration form       |
| `/users/registered`    | POST   | Validates and registers user |
| `/books/search`        | GET    | Search for books             |
| `/books/search_result` | GET    | Shows search results         |
| `/books/list`          | GET    | Displays all books           |
| `/books/addbook`       | GET    | Add new book form            |
| `/books/bookadded`     | POST   | Adds book to database        |

## Setup

### Database setup

**__1️. Create Database__**
Run inside MySQL:
```sql
source create_db.sql;
source insert_test_data.sql;
```

**__2. Verify__**
```sql
USE berties_books;
SELECT * FROM books;
```

### Running the app
```cmd
npm install
node index.js
```
**To access locally:** http://localhost:8000/
