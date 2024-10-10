"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema
const InvoiceSchema = new mongoose_1.Schema({
    invoiceRef: { type: String, required: true }, // Unique reference for the invoice
    orderId: { type: [String], required: true }, // Array to handle multiple orders
    total: { type: Number, required: true }, // Total amount
    customerId: { type: String, required: true }, // ID of the customer
    productId: { type: [String], required: true }, // Array to handle multiple products
    adminId: { type: String, required: true }, // Admin responsible for the invoice
    fetchedAt: { type: Date, default: Date.now } // Date when the invoice was created or fetched
});
// Create and export the Invoice model
exports.Invoice = mongoose_1.default.model('Invoice', InvoiceSchema);
//# sourceMappingURL=Invoice.js.map