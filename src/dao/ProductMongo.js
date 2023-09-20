import Product from "./models/Product.js";

class ProductMongo {
    
    async getProducts(limit=null){
        try {
            if(limit){
                return await Product.find().limit(limit);
            }else{
                return await Product.find();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(title, description, price, code, stock, status, category, thumbnail=null){
        try {
            if(title==="" || description==="" || price === "" || code === "" || stock === "" || status === "" || category === ""){
                throw new Error(`All fields are required`);
            }
            
            const data = {
                title, 
                description, 
                price, 
                code, 
                stock, 
                status, 
                category,
                thumbnail
            }
            const product = new Product(data);
            await product.save();
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async getProductById(productId){
        try {
            return await Product.findById(productId);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(productId, params){
        try {
            await Product.findByIdAndUpdate(productId, params, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(productId){
        try {
            await Product.findByIdAndDelete(productId);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductMongo;