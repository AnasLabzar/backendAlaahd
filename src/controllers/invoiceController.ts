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


export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the invoice by ID
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Delete associated orders using the orderId(s) in the invoice data
    const orderIds = invoice.orderId; // Assuming `orderIds` is an array in the invoice model that holds the associated order IDs

    if (orderIds && orderIds.length > 0) {
      // Loop through the orderIds and delete each order
      await Promise.all(orderIds.map(async (orderId) => {
        await Order.findByIdAndDelete(orderId); // Deleting each order
      }));
    }

    // After deleting the orders, now delete the invoice itself
    await Invoice.findByIdAndDelete(id);

    res.json({ message: 'Invoice and associated orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
