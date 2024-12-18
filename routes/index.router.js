const express = require("express");
const router = express.Router();
const authController = require("../contollers/auth.controller");
const userController = require("../contollers/user.controller");
const serviceController = require("../contollers/сar.controller");
const orderController = require("../contollers/order.controller");
const agencyController = require("../contollers/agency.controller");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/confirmEmail", authController.confirmEmail);
router.post("/auth/sendResetCode", authController.sendResetCode);
router.post("/auth/resetPassword", authController.resetPassword);
router.post("/auth/supportRequest", authController.supportRequest);
router.post("/user/changeEmail", userController.changeEmail);
router.get("/user/getUser", userController.getUser);
router.post("/user/changePassword", userController.changePassword);
router.post("/car/createCar", serviceController.createCar);
// router.post("/service/removeService", serviceController.removeService);
router.post("/car/updateCar", serviceController.updateCar);
router.get("/car/getCarById", serviceController.getCarById);
router.get("/car/getAllCars", serviceController.getAllCars);
// router.get(
// 	"/service/getPersonalServices",
// 	serviceController.getPersonalServices
// );
// router.post("/order/createOrder", orderController.createOrder);
// router.post("/order/updateOrder", orderController.updateOrder);
// router.post("/order/resendOrderDetails", orderController.resendOrderDetails);
// router.post("/order/closeOrder", orderController.closeOrder);
// router.get("/order/getOrderById", (req, res) =>
// 	orderController.getOrderById(req, res, io)
// );
// router.get("/order/getOrders", orderController.getOrders);
// router.post("/agency/sendContact", agencyController.sendContact);

module.exports = router;
