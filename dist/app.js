"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const priceRoutes_1 = __importDefault(require("./routes/priceRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const colorRoutes_1 = __importDefault(require("./routes/colorRoutes"));
const sizeRoutes_1 = __importDefault(require("./routes/sizeRoutes"));
const skuRoutes_1 = __importDefault(require("./routes/skuRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Install cors: npm install cors
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Register routes
app.use('/api', orderRoutes_1.default);
app.use('/api', productRoutes_1.default);
app.use('/api', priceRoutes_1.default);
app.use('/api', categoryRoutes_1.default);
app.use('/api', colorRoutes_1.default);
app.use('/api', sizeRoutes_1.default);
app.use('/api', skuRoutes_1.default);
app.use('/api', invoiceRoutes_1.default);
app.use('/api', authentication_1.default);
app.use('/api', userRoutes_1.default);
// MongoDB connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map