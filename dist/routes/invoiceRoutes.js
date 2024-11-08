"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoiceController_1 = require("../controllers/invoiceController");
const router = express_1.default.Router();
// Create an invoice
router.post('/invoices', invoiceController_1.createInvoice);
// Route to get an order by ID
router.get('/invoices/:id', invoiceController_1.getInvoiceById);
// Get all invoices
router.get('/invoices', invoiceController_1.getAllInvoices);
// Get filtered invoices (week, month, year)
router.get('/invoices/count', invoiceController_1.getFilteredInvoices);
exports.default = router;
//# sourceMappingURL=invoiceRoutes.js.map