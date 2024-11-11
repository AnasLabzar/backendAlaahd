import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import priceRoutes from './routes/priceRoutes';
import categoryRoutes from './routes/categoryRoutes';
import colorRoutes from './routes/colorRoutes';
import sizeRoutes from './routes/sizeRoutes';
import skuRoutes from './routes/skuRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import authRoutes from './routes/authentication';
import userRoutes from './routes/userRoutes';
// Install cors: npm install cors



// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

const allowedOrigins = ['https://backendalaahd.onrender.com'];

// Configure CORS
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Register routes
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api', priceRoutes);
app.use('/api', categoryRoutes);
app.use('/api', colorRoutes);
app.use('/api', sizeRoutes);
app.use('/api', skuRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
