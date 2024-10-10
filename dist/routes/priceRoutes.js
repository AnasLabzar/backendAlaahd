"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const priceController_1 = require("../controllers/priceController");
const router = (0, express_1.Router)();
router.post('/prices', priceController_1.createPrice);
router.get('/prices/:id', priceController_1.getPriceById);
router.get('/prices', priceController_1.getAllPrices);
exports.default = router;
//# sourceMappingURL=priceRoutes.js.map