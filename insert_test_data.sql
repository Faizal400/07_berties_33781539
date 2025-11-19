USE berties_books;

INSERT INTO books (name, price) VALUES
('Brighton Rock', 20.25),
('Brave New World', 25.00),
('Animal Farm', 12.99),
('Trees of Great Britain', 42.00),
('Atlas of the World', 25.00);

INSERT INTO users (username, first, last, email, password_hash)
VALUES 
('gold', 'Gold', 'User', 'gold@smiths.com',
'$2b$10$3sIl0pYzYThEqSE2RvUC2u5Rk4Mv3I/2b3V0KivXHPN8QTnMGnSJm');
