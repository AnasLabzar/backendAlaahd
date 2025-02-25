import { Request, Response } from 'express';
import { Order } from '../models/Order';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { refOrder } = req.body;

    // Check if an order with the same refOrder already exists
    const existingOrder = await Order.findOne({ refOrder });
    if (existingOrder) {
      return res.status(400).json({ error: `Order with refOrder ${refOrder} already exists` });
    }

    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({ error: 'Duplicate key error: refOrder must be unique' });
    }
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Get all orders
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { refOrder } = req.body;

    // Check if another order with the same refOrder already exists
    const existingOrder = await Order.findOne({ refOrder, _id: { $ne: req.params.id } });
    if (existingOrder) {
      return res.status(400).json({ error: `Order with refOrder ${refOrder} already exists` });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({ error: 'Duplicate key error: refOrder must be unique' });
    }
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};
