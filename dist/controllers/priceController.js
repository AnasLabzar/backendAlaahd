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
exports.getAllPrices = exports.getPriceById = exports.createPrice = void 0;
const Price_1 = require("../models/Price");
// Create a new price
const createPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const price = new Price_1.Price(req.body);
        const savedPrice = yield price.save();
        res.status(201).json(savedPrice);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createPrice = createPrice;
// Get a price by ID
const getPriceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const price = yield Price_1.Price.findById(req.params.id);
        if (!price) {
            return res.status(404).json({ message: 'Price not found' });
        }
        res.json(price);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getPriceById = getPriceById;
// Get all prices
const getAllPrices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield Price_1.Price.find();
        res.json(prices);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllPrices = getAllPrices;
//# sourceMappingURL=priceController.js.map