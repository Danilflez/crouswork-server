CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_confirmed BOOLEAN DEFAULT FALSE,
    confirm_token VARCHAR(36)
);

CREATE TABLE "service" (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES "user"(id),
    title VARCHAR(255),
    price FLOAT,
    images TEXT[],
    video_link VARCHAR(255),
    description TEXT,
    preview_link VARCHAR(255),
    telegram VARCHAR(255),
    is_highlighted BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT FALSE
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES "service"(id),
    seller_id INTEGER REFERENCES "user"(id),
    buyer_id INTEGER REFERENCES "user"(id),
    status TEXT
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES "user"(id),
    service_id INTEGER REFERENCES "service"(id),
    buyer_id INTEGER REFERENCES "user"(id)
    status VARCHAR(255),
    repository_link TEXT
);
   
