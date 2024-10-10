"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sizeController_1 = require("../controllers/sizeController");
const router = (0, express_1.Router)();
// Create a new size
router.post('/sizes', sizeController_1.createSize);
// Get all sizes
router.get('/sizes', sizeController_1.getAllSizes);
exports.default = router;
//# sourceMappingURL=sizeRoutes.js.map