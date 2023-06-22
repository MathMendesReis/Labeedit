-- Active: 1686603411176@@127.0.0.1@3306


CREATE TABLE users(
  id TEXT NOT NULL PRIMARY KEY UNIQUE,
  apelido VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  checkbox VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT (DATETIME('now', 'localtime')) NOT NULL
);



SELECT * from "likesDislike";



CREATE TABLE likesDislikes(
  id TEXT NOT NULL PRIMARY KEY UNIQUE,
  user_id TEXT ,
  post_id TEXT,
  type INT NOT NULL, -- 1 = like |-0 dislike
  created_at DATETIME DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

insert into "likesDislikes"(id,user_id,post_id,type)
VALUES(
  'id','id_user','id_post',0
);

SELECT *
FROM likesDislikes
INNER JOIN users ON likesDislikes.user_id = users.id;




ALTER TABLE post RENAME TO posts;

SELECT * from users;
SELECT * from posts;
SELECT * from "likesDislikes";

-- DROP Table "users";
DELETE FROM  posts;
