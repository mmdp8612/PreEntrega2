import mongoose from 'mongoose';
import Product from '../models/Product.js';

const cartSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    products: [
        { 
            productId: { 
                type: String, 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;