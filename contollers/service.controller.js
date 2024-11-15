const sql = require("../database");
const { decodeToken } = require("../utils");

const serviceController = {
    createService: async (req, res) => {
        try {
            const {
                brand,
                model,
                year,
                price,
                mileage,
                bodyType,
                engineType,
                engineCapacity,
                transmission,
                drivetrain,
                color,
                condition,
                numberOfDoors,
                seatingCapacity,
                fuelEfficiency,
                features,
                description,
                images,
                location,
            } = req.body;

            const [_, token] = req.headers.authorization.split(" ");
            const { email, id } = decodeToken({ token });

            const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;

            if (user.length === 0) {
                return res.status(400).json({ message: "Невалидный токен" });
            }

            const newCar = await sql`
                INSERT INTO "car" (
                    owner_id, brand, model, year, price, mileage, body_type, engine_type, 
                    engine_capacity, transmission, drivetrain, color, condition, 
                    number_of_doors, seating_capacity, fuel_efficiency, features, description, 
                    images, location
                ) VALUES (
                    ${id}, ${brand}, ${model}, ${year}, ${price}, ${mileage}, ${bodyType}, ${engineType}, 
                    ${engineCapacity}, ${transmission}, ${drivetrain}, ${color}, ${condition}, 
                    ${numberOfDoors}, ${seatingCapacity}, ${fuelEfficiency}, ${features}, ${description}, 
                    ${images}, ${location}
                ) RETURNING id, brand, model`;

            res.json({
                message: "Автомобиль успешно добавлен",
                service: newCar[0],
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },

    removeService: async (req, res) => {
        try {
            const { serviceId } = req.body;
            const [_, token] = req.headers.authorization.split(" ");
            const { email } = decodeToken({ token });

            const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;

            if (user.length === 0) {
                return res.status(400).json({ message: "Невалидный токен" });
            }

            const deletedCar = await sql`
                DELETE FROM "car" WHERE id = ${serviceId} RETURNING brand, model`;

            if (deletedCar.length === 0) {
                return res.status(400).json({ message: "Автомобиль не найден" });
            }

            res.json({
                message: "Автомобиль успешно удалён",
                service: deletedCar[0],
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },

    updateService: async (req, res) => {
        try {
            const {
                serviceId,
                brand,
                model,
                year,
                price,
                mileage,
                bodyType,
                engineType,
                engineCapacity,
                transmission,
                drivetrain,
                color,
                condition,
                numberOfDoors,
                seatingCapacity,
                fuelEfficiency,
                features,
                description,
                images,
                location,
            } = req.body;

            const [_, token] = req.headers.authorization.split(" ");
            const { email } = decodeToken({ token });

            const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;

            if (user.length === 0) {
                return res.status(400).json({ message: "Невалидный токен" });
            }

            const updatedCar = await sql`
                UPDATE "car" 
                SET brand = ${brand}, model = ${model}, year = ${year}, price = ${price}, mileage = ${mileage}, 
                    body_type = ${bodyType}, engine_type = ${engineType}, engine_capacity = ${engineCapacity}, 
                    transmission = ${transmission}, drivetrain = ${drivetrain}, color = ${color}, 
                    condition = ${condition}, number_of_doors = ${numberOfDoors}, seating_capacity = ${seatingCapacity}, 
                    fuel_efficiency = ${fuelEfficiency}, features = ${features}, description = ${description}, 
                    images = ${images}, location = ${location}
                WHERE id = ${serviceId} RETURNING id, brand, model`;

            if (updatedCar.length === 0) {
                return res.status(400).json({ message: "Автомобиль не найден" });
            }

            res.json({
                message: "Автомобиль успешно обновлён",
                service: updatedCar[0],
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },

    getServiceById: async (req, res) => {
        try {
            const { serviceId } = req.query;

            const car = await sql`SELECT * FROM "car" WHERE id = ${serviceId}`;

            if (car.length === 0) {
                return res.status(400).json({ message: "Автомобиль не найден" });
            }

            res.json({ service: car[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },

    getServices: async (req, res) => {
        try {
            const { brand, model, priceFrom, priceTo, yearFrom, yearTo } = req.query;

            let query = sql`SELECT * FROM "car" WHERE 1 = 1`;

            if (brand) query = sql`${query} AND "brand" ILIKE ${`%${brand}%`}`;
            if (model) query = sql`${query} AND "model" ILIKE ${`%${model}%`}`;
            if (priceFrom) query = sql`${query} AND "price" >= ${priceFrom}`;
            if (priceTo) query = sql`${query} AND "price" <= ${priceTo}`;
            if (yearFrom) query = sql`${query} AND "year" >= ${yearFrom}`;
            if (yearTo) query = sql`${query} AND "year" <= ${yearTo}`;

            const cars = await query;

            res.json({ services: cars });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },

    getPersonalServices: async (req, res) => {
        try {
            const [_, token] = req.headers.authorization.split(" ");
            const { id } = decodeToken({ token });

            const cars = await sql`SELECT * FROM "car" WHERE owner_id = ${id}`;

            res.json({ services: cars });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    },
};

module.exports = serviceController;
