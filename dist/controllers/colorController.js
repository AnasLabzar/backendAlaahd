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
exports.getColorsById = exports.getColors = exports.createColor = void 0;
const Color_1 = require("../models/Color");
// Create a new color
const createColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = new Color_1.Color(req.body);
        const savedColor = yield color.save();
        res.status(201).json(savedColor);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createColor = createColor;
// Get all colors
const getColors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield Color_1.Color.find();
        res.json(colors);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getColors = getColors;
// Get a Colors by ID
const getColorsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Colors = yield Color_1.Color.findById(req.params.id);
        if (!Colors) {
            return res.status(404).json({ message: 'Colors not found' });
        }
        res.json(Colors);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getColorsById = getColorsById;
//# sourceMappingURL=colorController.js.map