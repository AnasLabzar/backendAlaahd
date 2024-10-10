"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.post('/categories', categoryController_1.createCategory);
router.get('/categories', categoryController_1.getCategories);
router.get('/categories/:id', categoryController_1.getCategoryById);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map