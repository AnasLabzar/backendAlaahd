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
exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const Category_1 = require("../models/Category");
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new Category_1.Category(req.body);
        const savedCategory = yield category.save();
        res.status(201).json(savedCategory);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createCategory = createCategory;
// Get all categories
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getCategories = getCategories;
// Get category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=categoryController.js.map