"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getOrderById = exports.createOrder = void 0;
const Order_1 = require("../models/Order");
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new Order_1.Order(req.body);
        const savedOrder = yield order.save();
        res.status(201).json(savedOrder);
    }
    catch (err) {
        // Assert err as Error type to access message property
        const errorMessage = err.message;
        res.status(400).json({ error: errorMessage });
    }
});
exports.createOrder = createOrder;
// Get an order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (err) {
        const errorMessage = err.message;
        res.status(500).json({ error: errorMessage });
    }
});
exports.getOrderById = getOrderById;
// Get all orders
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find();
        res.json(orders);
    }
    catch (err) {
        const errorMessage = err.message;
        res.status(500).json({ error: errorMessage });
    }
});
exports.getAllOrders = getAllOrders;
//# sourceMappingURL=orderController.js.map