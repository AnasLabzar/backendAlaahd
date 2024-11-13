import express from 'express';
import { 
  createInvoice, 
  getAllInvoices, 
  getFilteredInvoices, 
  getInvoiceById, 
  updateInvoice, 
  deleteInvoice 
} from '../controllers/invoiceController';

const router = express.Router();

// Create an invoice
router.post('/invoices', createInvoice);

// Get an invoice by ID
router.get('/invoices/:id', getInvoiceById);

// Get all invoices
router.get('/invoices', getAllInvoices);

// Get filtered invoices (week, month, year)
router.get('/invoices/count', getFilteredInvoices);

// Update an invoice
router.put('/invoices/:id', updateInvoice);

// Delete an invoice
router.delete('/invoices/:id', deleteInvoice);

export default router;
