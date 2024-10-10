"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredInvoices = exports.getAllInvoices = exports.createInvoice = void 0;
const Invoice_1 = require("../models/Invoice");
// Create an Invoice
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoice = new Invoice_1.Invoice(req.body);
        const savedInvoice = yield invoice.save();
        res.status(201).json(savedInvoice);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createInvoice = createInvoice;
// Get all Invoices
const getAllInvoices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield Invoice_1.Invoice.find();
        res.json(invoices);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllInvoices = getAllInvoices;
// Get filtered and counted invoices (week/month/year)
const getFilteredInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.query;
    const currentDate = new Date();
    let startDate;
    // Determine start date based on filter type
    if (filter === 'weekly') {
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
        startDate.setHours(0, 0, 0, 0); // Set to the start of the day
    }
    else if (filter === 'monthly') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the month
    }
    else if (filter === 'yearly') {
        startDate = new Date(currentDate.getFullYear(), 0, 1); // Start of the year
    }
    else {
        return res.status(400).json({ error: 'Invalid filter type' });
    }
    try {
        // Fetch the count of invoices after the startDate
        const invoiceCount = yield Invoice_1.Invoice.countDocuments({
            fetchedAt: { $gte: startDate }
        });
        res.json({ count: invoiceCount });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getFilteredInvoices = getFilteredInvoices;
//# sourceMappingURL=invoiceController.js.map