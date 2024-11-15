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
   
CREATE TABLE "car" (
    id SERIAL PRIMARY KEY,                -- Уникальный идентификатор
    owner_id INTEGER REFERENCES "user"(id), -- Владелец автомобиля
    brand VARCHAR(100) NOT NULL,          -- Марка автомобиля (например, Toyota, BMW)
    model VARCHAR(100) NOT NULL,          -- Модель автомобиля (например, Camry, X5)
    year INTEGER NOT NULL,                -- Год выпуска
    price FLOAT NOT NULL,                 -- Цена автомобиля
    mileage INTEGER,                      -- Пробег в километрах
    body_type VARCHAR(50),                -- Тип кузова (седан, хэтчбек, внедорожник и т.д.)
    engine_type VARCHAR(50),              -- Тип двигателя (бензин, дизель, электрический, гибрид)
    engine_capacity FLOAT,                -- Объем двигателя в литрах
    transmission VARCHAR(50),             -- Тип трансмиссии (механика, автомат)
    drivetrain VARCHAR(50),               -- Привод (передний, задний, полный)
    color VARCHAR(50),                    -- Цвет автомобиля
    condition VARCHAR(50),                -- Состояние (новый, б/у)
    number_of_doors INTEGER,              -- Количество дверей
    seating_capacity INTEGER,             -- Количество мест
    fuel_efficiency FLOAT,                -- Расход топлива (л/100 км)
    features TEXT[],                      -- Дополнительные характеристики (например, климат-контроль, ABS, навигация)
    description TEXT,                     -- Описание автомобиля
    images TEXT[],                        -- Фотографии автомобиля
    location VARCHAR(255),                -- Местоположение автомобиля (например, город или регион)
    created_at TIMESTAMP DEFAULT NOW(),   -- Дата добавления автомобиля
    updated_at TIMESTAMP DEFAULT NOW()    -- Дата последнего обновления
);