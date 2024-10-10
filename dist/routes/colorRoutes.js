"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colorController_1 = require("../controllers/colorController");
const router = (0, express_1.Router)();
router.post('/colors', colorController_1.createColor);
router.get('/colors', colorController_1.getColors);
router.get('/colors/:id', colorController_1.getColorsById);
exports.default = router;
//# sourceMappingURL=colorRoutes.js.map