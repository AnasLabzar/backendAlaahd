import { Router } from 'express';
import { 
  createColor, 
  getColors, 
  getColorsById, 
  updateColor, 
  deleteColor 
} from '../controllers/colorController';

const router = Router();

router.post('/colors', createColor);
router.get('/colors', getColors);
router.get('/colors/:id', getColorsById);

// Update a color by ID
router.put('/colors/:id', updateColor);

// Delete a color by ID
router.delete('/colors/:id', deleteColor);

export default router;
