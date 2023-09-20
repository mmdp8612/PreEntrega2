import mongoose from 'mongoose';
import Cart from './models/Cart.js';
import Product from './models/Product.js';

class CartMongo {
    
    async createCart(){
        try {
            const newCart = new Cart({
              _id: new mongoose.Types.ObjectId(),  
              products: []
            });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductsCart(cid){
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
              throw new Error('Cart Not found');
            }
            return cart.products;
        } catch (error) {
            throw new Error(error);
        }    
    }

    async addProductCart(cid, pid){
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
              throw new Error('Cart Not found');
            }
        
            const product = await Product.findOne({ _id: pid });
            if (!product) {
              throw new Error('Product Not found');
            }
        
            const existingProductIndex = cart.products.findIndex(item => item.productId === pid);
        
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({
                    productId: pid,
                    quantity: 1
              });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }
}   

export default CartMongo;