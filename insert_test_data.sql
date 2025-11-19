# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99), ('Trees of Great Britain', 42.00), ('Atlas of the World', 25.00) ;

USE berties_books;

INSERT INTO users (first, last, email, password_hash)
VALUES 
('Gold', 'User', 'gold@smiths.com', '$2b$10$3mxnY7K1JK6Tc3MASuf7oOmfwyjqf7/YEfI3sCDQ7yG0jSYi0Bt7W');