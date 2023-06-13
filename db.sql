-- Active: 1686603411176@@127.0.0.1@3306


CREATE TABLE users(
  id TEXT NOT NULL PRIMARY KEY UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT (DATETIME('now', 'localtime')) NOT NULL
);

INSERT INTO users(id, name, email,role,password)
VALUES(
  '1686603411172','fulano','fulano@example.com','12345678','user'
);

SELECT * from users;

DROP table users;
