import mongoose from "mongoose"
import { mongodbURL } from '../database/config.js';

await mongoose.connect(mongodbURL.connectionString)

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const Product = mongoose.model('products', productSchema)

export { Product }