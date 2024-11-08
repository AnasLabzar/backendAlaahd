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
exports.getAllSKUs = exports.getSkuById = exports.createSKU = void 0;
const Sku_1 = require("../models/Sku");
// Create a new SKU
const createSKU = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sku = new Sku_1.SKU(req.body);
        const savedSKU = yield sku.save();
        res.status(201).json(savedSKU);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createSKU = createSKU;
// Get a product by ID
const getSkuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skuid = yield Sku_1.SKU.findById(req.params.id);
        if (!skuid) {
            return res.status(404).json({ message: 'Sku not found' });
        }
        res.json(skuid);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getSkuById = getSkuById;
// Get all SKUs
const getAllSKUs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skus = yield Sku_1.SKU.find();
        res.json(skus);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllSKUs = getAllSKUs;
//# sourceMappingURL=skuControllers.js.map