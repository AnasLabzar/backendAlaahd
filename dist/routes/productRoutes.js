"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.post('/products', productController_1.createProduct);
router.get('/products/:id', productController_1.getProductById);
router.get('/products', productController_1.getAllProducts);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map