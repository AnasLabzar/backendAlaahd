"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/users', userController_1.getAllUsers);
router.get('/users/custom', userController_1.getCustomerUsers);
router.get('/users/:id', userController_1.getUserById);
router.delete('/users/:id', userController_1.deleteUserById);
router.put('/users/:id', userController_1.updateUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map