"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skuControllers_1 = require("../controllers/skuControllers");
const router = (0, express_1.Router)();
// Create a new SKU
router.post('/skus', skuControllers_1.createSKU);
// Get all SKUs
router.get('/skus', skuControllers_1.getAllSKUs);
exports.default = router;
//# sourceMappingURL=skuRoutes.js.map