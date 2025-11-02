--  users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_id VARCHAR UNIQUE,
    username VARCHAR NOT NULL,
    bio TEXT
);

--  posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR NOT NULL,
    content TEXT,
    img TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    likes INT DEFAULT 0
);


-- test users
INSERT INTO users (clerk_id, username, bio)
VALUES
('clerk_1', 'Minnie', 'Loves adventures and friends'),
('clerk_2', 'Donald', 'A bit grumpy but funny'),
('clerk_3', 'MadHatter', 'Always has tea time ideas');

--  test posts
INSERT INTO posts (user_id, title, content, img, created_at, likes)
VALUES
(1, 'Morning Fun', 'Had a wonderful morning with friends!', '/images/MinnieMouse.jpeg', NOW(), 10),
(2, 'Fishing Trip', 'Caught a big fish today!', '/images/DonaldDuck.jpg', NOW(), 5),
(3, 'Tea Party', 'Inviting everyone to a crazy tea party!', '/images/MadHatter.jpeg', NOW(), 8);
