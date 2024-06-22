-- Data Dummy untuk tabel User
INSERT INTO User (id, name, username, email, password, role, jenis_kelamin, birth_date, profile_picture, phone_number, bio, address)
VALUES
(UUID(), 'John Doe', 'johndoe', 'john.doe@example.com', 'password123', 'client', 'Pria', '1985-01-15', NULL, '1234567890', 'Bio John Doe', '123 Street, City, Country'),
(UUID(), 'Jane Smith', 'janesmith', 'jane.smith@example.com', 'password123', 'worker', 'Wanita', '1990-02-20', NULL, '0987654321', 'Bio Jane Smith', '456 Avenue, City, Country'),
(UUID(), 'Alice Johnson', 'alicejohnson', 'alice.johnson@example.com', 'password123', 'client', 'Wanita', '1992-03-25', NULL, '1112223334', 'Bio Alice Johnson', '789 Boulevard, City, Country'),
(UUID(), 'Bob Brown', 'bobbrown', 'bob.brown@example.com', 'password123', 'worker', 'Pria', '1988-04-30', NULL, '4445556667', 'Bio Bob Brown', '321 Drive, City, Country'),
(UUID(), 'Charlie Davis', 'charliedavis', 'charlie.davis@example.com', 'password123', 'client', 'Pria', '1980-05-10', NULL, '7778889990', 'Bio Charlie Davis', '654 Lane, City, Country');

-- Data Dummy untuk tabel Client
INSERT INTO Client (id, rating)
VALUES
((SELECT id FROM User WHERE email = 'john.doe@example.com'), 4.5),
((SELECT id FROM User WHERE email = 'alice.johnson@example.com'), 4.0),
((SELECT id FROM User WHERE email = 'charlie.davis@example.com'), 3.8);

-- Data Dummy untuk tabel Worker
INSERT INTO Worker (id, rating)
VALUES
((SELECT id FROM User WHERE email = 'jane.smith@example.com'), 4.7),
((SELECT id FROM User WHERE email = 'bob.brown@example.com'), 4.3);

-- Data Dummy untuk tabel Project
INSERT INTO Project (id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline)
VALUES
(UUID(), (SELECT id FROM Client WHERE id = (SELECT id FROM User WHERE email = 'john.doe@example.com')), 'Project A', 'Description of Project A', 'open', NULL, 'Design', 100.00, 500.00, '2024-12-31'),
(UUID(), (SELECT id FROM Client WHERE id = (SELECT id FROM User WHERE email = 'john.doe@example.com')), 'Project B', 'Description of Project B', 'in_progress', NULL, 'Development', 200.00, 1000.00, '2024-11-30'),
(UUID(), (SELECT id FROM Client WHERE id = (SELECT id FROM User WHERE email = 'alice.johnson@example.com')), 'Project C', 'Description of Project C', 'completed', NULL, 'Marketing', 150.00, 750.00, '2024-10-31'),
(UUID(), (SELECT id FROM Client WHERE id = (SELECT id FROM User WHERE email = 'alice.johnson@example.com')), 'Project D', 'Description of Project D', 'open', NULL, 'Writing', 50.00, 300.00, '2024-09-30'),
(UUID(), (SELECT id FROM Client WHERE id = (SELECT id FROM User WHERE email = 'charlie.davis@example.com')), 'Project E', 'Description of Project E', 'in_progress', NULL, 'SEO', 80.00, 400.00, '2024-08-31');

-- Data Dummy untuk tabel Application
INSERT INTO Application (id, project_id, worker_id, status, created_at)
VALUES
(UUID(), (SELECT id FROM Project WHERE title = 'Project A'), (SELECT id FROM Worker WHERE id = (SELECT id FROM User WHERE email = 'jane.smith@example.com')), 'pending', NOW()),
(UUID(), (SELECT id FROM Project WHERE title = 'Project B'), (SELECT id FROM Worker WHERE id = (SELECT id FROM User WHERE email = 'bob.brown@example.com')), 'accepted', NOW()),
(UUID(), (SELECT id FROM Project WHERE title = 'Project C'), (SELECT id FROM Worker WHERE id = (SELECT id FROM User WHERE email = 'jane.smith@example.com')), 'rejected', NOW()),
(UUID(), (SELECT id FROM Project WHERE title = 'Project D'), (SELECT id FROM Worker WHERE id = (SELECT id FROM User WHERE email = 'bob.brown@example.com')), 'pending', NOW()),
(UUID(), (SELECT id FROM Project WHERE title = 'Project E'), (SELECT id FROM Worker WHERE id = (SELECT id FROM User WHERE email = 'jane.smith@example.com')), 'accepted', NOW());
