import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Color } from '../models/Color';
import { Price } from '../models/Price';
import { SKU } from '../models/Sku';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a product by ID and all its related entities
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Find the product to get related IDs
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete related colors, prices, and SKUs
    await Color.deleteMany({ _id: { $in: product.colorsId } });
    await Price.deleteMany({ _id: { $in: product.priceId } });
    await SKU.deleteMany({ _id: { $in: product.skuId } }));

    // Delete the product itself
    await Product.findByIdAndDelete(productId);

    res.json({ message: 'Product and related entities deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
