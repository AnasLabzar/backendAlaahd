import mongoose, { Schema, Document } from 'mongoose';

interface ISKU extends Document {
  sku: string;
  barcode: string;
}

const SKUSchema: Schema = new Schema({
  skuCode: { type: String, required: true },               // SKU code for product
  barcode: { type: String },             // Reference to product ID
  fetchedAt: { type: Date, default: Date.now },            // Record fetch date
});

export const SKU = mongoose.model<ISKU>('skus', SKUSchema);
