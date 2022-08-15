import mongoose from "mongoose"
import { mongodbURL } from '../database/config.js';

await mongoose.connect(mongodbURL.connectionString)

const cartSchema = new mongoose.Schema({
    products: [
        {
        productId:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
        quantity: { type: Number }
        }
    ]
})

const Cart = mongoose.model('carts', cartSchema)

export { Cart }