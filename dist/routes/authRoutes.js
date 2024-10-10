"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Open routes
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
// Protected route (e.g., only admins can access this)
router.get('/admin', (0, roleMiddleware_1.authorizeRole)(['admin']), (req, res) => {
    res.send('Admin access granted');
});
router.get('/users/:id', authController_1.getUserById);
router.get('/users', authController_1.getAllUser);
router.get('/users/custom', authController_1.getUserByCustom);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map