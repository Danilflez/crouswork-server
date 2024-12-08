const sql = require("../database");
const cloudinary = require("cloudinary").v2;

// Настройка Cloudinary
cloudinary.config({
  cloud_name: "djper8ctg",
	api_key: "684511326939733",
	api_secret: "70qm4QO6x8KDUOYaam4PdTcDDns",
});

const carController = {
  // Получение всех автомобилей
  getAllCars: async (req, res) => {
    try {
      const result = await sql`
        SELECT * FROM "car"`;

      if (result.length === 0) {
        return res.status(404).json({ message: "Автомобили не найдены" });
      }

      res.json({ cars: result });
    } catch (error) {
      console.error("Ошибка при получении автомобилей:", error.message, error.stack);
      res.status(500).json({ error: "Ошибка при получении списка автомобилей" });
    }
  },

  // Получение автомобиля по ID
  getCarById: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id);
      

      const result = await sql`
        SELECT * FROM "car"
        WHERE id = ${id}`;

      if (result.length === 0) {
        return res.status(404).json({ message: "Автомобиль не найден" });
      }

      res.json({ car: result[0] });
    } catch (error) {
      console.error("Ошибка при получении автомобиля:", error.message, error.stack);
      res.status(500).json({ error: "Ошибка при получении автомобиля" });
    }
  },

  // Создание автомобиля
  createCar: async (req, res) => {
    try {
      const {
        brand,
        model,
        year,
        price,
        mileage,
        body_type,
        engine_type,
        engine_capacity,
        transmission,
        drivetrain,
        color,
        condition,
        number_of_doors,
        seating_capacity,
        fuel_efficiency,
        features,
        description,
        images,
        location,
      } = req.body;

      // Загрузка изображений
      let uploadedImages = [];
      if (images && images.length > 0) {
        uploadedImages = await Promise.all(
          images.map(image =>
            cloudinary.uploader.upload(image, {
              folder: "cars",
              fetch_format: "auto",
              quality: "auto",
            })
          )
        );
      }

      const imagesUrls = uploadedImages.map(img => img.secure_url);
      console.log(brand, model, price, mileage,body_type, engine_type, engine_capacity, transmission, drivetrain, color, condition, number_of_doors, seating_capacity, fuel_efficiency, features,
        description,
        images,
        location);
      const result = await sql`
        INSERT INTO "car" 
        (brand, model, year, price, mileage, body_type, engine_type, 
        engine_capacity, transmission, drivetrain, color, condition, number_of_doors, 
        seating_capacity, fuel_efficiency, features, description, images, location)
        VALUES (
           ${brand}, ${model}, ${year}, ${price}, ${mileage}, ${body_type}, 
          ${engine_type}, ${engine_capacity}, ${transmission}, ${drivetrain}, ${color}, 
          ${condition}, ${number_of_doors}, ${seating_capacity}, ${fuel_efficiency}, 
          ${sql.array(features)}, ${description}, ${sql.array(imagesUrls)}, ${location}
        )
        RETURNING *`;

      res.status(201).json({ car: result[0] });
    } catch (error) {
      console.error("Ошибка при создании автомобиля:", error.message, error.stack);
      res.status(500).json({ error: "Ошибка при создании автомобиля" });
    }
  },

  // Обновление автомобиля
  updateCar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        brand,
        model,
        year,
        price,
        mileage,
        body_type,
        engine_type,
        engine_capacity,
        transmission,
        drivetrain,
        color,
        condition,
        number_of_doors,
        seating_capacity,
        fuel_efficiency,
        features,
        description,
        images,
        location,
      } = req.body;

      console.log(brand, model, price, mileage,body_type, engine_type, engine_capacity, transmission, drivetrain, color, condition, number_of_doors, seating_capacity, fuel_efficiency, features,
        description,
        images,
        location);
      
        if (!Array.isArray(features)) {
          features = [];  // или можно выбросить ошибку, если features не массив
        }
        
      let uploadedImages = [];
      if (images && images.length > 0) {
        uploadedImages = await Promise.all(
          images.map(image =>
            cloudinary.uploader.upload(image, {
              folder: "cars",
              fetch_format: "auto",
              quality: "auto",
            })
          )
        );
      }

      const imagesUrls = uploadedImages.map(img => img.secure_url);
      console.log(brand, model, price, mileage,body_type, engine_type, engine_capacity, transmission, drivetrain, color, condition, number_of_doors, seating_capacity, fuel_efficiency, features,
        description,
        images,
        location);
      const result = await sql`
        UPDATE "car"
        SET 
          brand = ${brand}, model = ${model}, 
          year = ${year}, price = ${price}, mileage = ${mileage}, 
          body_type = ${body_type}, engine_type = ${engine_type}, 
          engine_capacity = ${engine_capacity}, transmission = ${transmission}, 
          drivetrain = ${drivetrain}, color = ${color}, condition = ${condition}, 
          number_of_doors = ${number_of_doors}, seating_capacity = ${seating_capacity}, 
          fuel_efficiency = ${fuel_efficiency}, features = ${sql.array(features)}, 
          description = ${description}, images = ${sql.array(imagesUrls)}, 
          location = ${location}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *`;

      if (result.length === 0) {
        return res.status(404).json({ message: "Автомобиль не найден" });
      }

      res.json({ car: result[0] });
    } catch (error) {
      console.error("Ошибка при обновлении автомобиля:", error.message, error.stack);
      res.status(500).json({ error: "Ошибка при обновлении автомобиля" });
    }
  },

  // Удаление автомобиля
  deleteCar: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await sql`
        DELETE FROM "car"
        WHERE id = ${id}
        RETURNING *`;

      if (result.length === 0) {
        return res.status(404).json({ message: "Автомобиль не найден" });
      }

      res.json({ message: "Автомобиль успешно удалён", car: result[0] });
    } catch (error) {
      console.error("Ошибка при удалении автомобиля:", error.message, error.stack);
      res.status(500).json({ error: "Ошибка при удалении автомобиля" });
    }
  },
};

module.exports = carController;