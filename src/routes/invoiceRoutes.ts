import express from 'express';
import { createInvoice, getAllInvoices, getFilteredInvoices, getInvoiceById } from '../controllers/invoiceController';

// https://github.com/AnasLabzar/backendAlaahd.git
const router = express.Router();

// Create an invoice
router.post('/invoices', createInvoice);

// Route to get an order by ID
router.get('/invoices/:id', getInvoiceById);

// Get all invoices
router.get('/invoices', getAllInvoices);

// Get filtered invoices (week, month, year)
router.get('/invoices/count', getFilteredInvoices);

export default router;
