"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
// Route to create a new order
router.post('/orders', orderController_1.createOrder);
// Route to get an order by ID
router.get('/orders/:id', orderController_1.getOrderById);
// Route to get all orders
router.get('/orders', orderController_1.getAllOrders);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map