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
exports.getAllSizes = exports.createSize = void 0;
const Size_1 = require("../models/Size");
// Create a new size
const createSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = new Size_1.Size(req.body);
        const savedSize = yield size.save();
        res.status(201).json(savedSize);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createSize = createSize;
// Get all sizes
const getAllSizes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sizes = yield Size_1.Size.find();
        res.json(sizes);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllSizes = getAllSizes;
//# sourceMappingURL=sizeController.js.map