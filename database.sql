-- Active: 1686603411176@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100),
    creation_date text NOT NULL,
    update_date text NOT NULL,
    role VARCHAR(50) NOT NULL,
    accept_terms VARCHAR(50) NOT NULL
);


CREATE TABLE posts (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    contents TEXT NOT NULL,
    creation_date VARCHAR(255) NOT NULL,
    information_update VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    dislikes INTEGER NOT NULL DEFAULT 0,
    coments  INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE like_dislike (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    contents TEXT NOT NULL,
    creation_date VARCHAR(255) NOT NULL,
    information_update VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE coments_like (
    user_id TEXT NOT NULL,
    coments_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coments_id) REFERENCES comments(id)
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
-- -- ;
SELECT * from posts;

DROP Table like_dislike;

SELECT
 posts.id as post_id,
 posts.contents,
 posts.creation_date,
 posts.information_update,
SUM(CASE WHEN like = 0 THEN 1 ELSE 0 END) AS dislike,
SUM(CASE WHEN like = 1 THEN 1 ELSE 0 END) AS like,
SUM(CASE WHEN like_dislike.like IS NULL THEN 1 ELSE 0 END) AS nulo
 from posts
LEFT join like_dislike ON posts.id = like_dislike.post_id;

select * from  coments_like_dislike;

SELECT 
posts.id,
posts.contents,
users.email,
like_dislike.like,
users.email AS liked_by
from posts
LEFT JOIN users on posts.user_id = users.id
LEFT JOIN like_dislike ON posts.id = like_dislike.post_id
LEFT JOIN users AS liked_by_user ON like_dislike.user_id = liked_by_user.id;
INSERT INTO like_dislike(user_id,post_id,like) VALUES(

);

SELECT * from like_dislike;

SELECT * from posts
left join like_dislike on like_dislike.like ===;


DROP TABLE coments_like_dislike;
delete from coments_like;

delete from posts;
SELECT * from like_dislike;

SELECT * from coments_like;
SELECT * from comments;

select * from posts;