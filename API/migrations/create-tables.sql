CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE slug (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT null,
    image VARCHAR(255) NOT null
);

CREATE TABLE slugs_per_user (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    slug_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (slug_id) REFERENCES slug(id)
);