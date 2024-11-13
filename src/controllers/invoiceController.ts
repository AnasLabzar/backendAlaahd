import { Request, Response } from 'express';
import { Invoice } from '../models/Invoice';

// Create an Invoice
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get all Invoices
export const getAllInvoices = async (_req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get an Invoice by ID
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get filtered and counted invoices (week/month/year)
export const getFilteredInvoices = async (req: Request, res: Response) => {
  const { filter } = req.query;
  const currentDate = new Date();
  let startDate: Date | undefined;

  if (filter === 'weekly') {
    startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());
    startDate.setHours(0, 0, 0, 0);
  } else if (filter === 'monthly') {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  } else if (filter === 'yearly') {
    startDate = new Date(currentDate.getFullYear(), 0, 1);
  } else {
    return res.status(400).json({ error: 'Invalid filter type' });
  }

  try {
    const invoiceCount = await Invoice.countDocuments({
      fetchedAt: { $gte: startDate }
    });
    res.json({ count: invoiceCount });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update an Invoice
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete an Invoice
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
