import { Request, Response } from 'express';
import { Color } from '../models/Color';

// Create a new color
export const createColor = async (req: Request, res: Response) => {
  try {
    const color = new Color(req.body);
    const savedColor = await color.save();
    res.status(201).json(savedColor);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get all colors
export const getColors = async (_req: Request, res: Response) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get a color by ID
export const getColorsById = async (req: Request, res: Response) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(color);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update a color by ID
export const updateColor = async (req: Request, res: Response) => {
  try {
    const updatedColor = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(updatedColor);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a color by ID
export const deleteColor = async (req: Request, res: Response) => {
  try {
    const deletedColor = await Color.findByIdAndDelete(req.params.id);
    if (!deletedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json({ message: 'Color deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
