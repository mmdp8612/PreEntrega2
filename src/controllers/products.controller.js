import ProductMongo from "../dao/ProductMongo.js";

const productMongo = new ProductMongo();

const getAllProducts = async (req, res) => {
    try{
        const { limit } = req.query;
        const products = await productMongo.getProducts(limit);   
        res.status(200).json({
            data: products
        })
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productMongo.getProductById(id);
        res.status(200).json({
            data: product
        })   
    } catch (error) {
        res.status(404).json({error: error.message});   
    }
}

const postProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    try{
        await productMongo.addProduct(title, description, price, code, stock, status, category, thumbnail);
        return res.status(200).json({
            message: "Product created!"
        })
    }catch(error){
        res.status(500).json({error: error.message});     
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productMongo.updateProduct(id, req.body);
        return res.status(200).json({
            message: "Product updated!"
        })
    }catch(error){
        res.status(500).json({error: error.message});   
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productMongo.deleteProduct(id);
        return res.status(200).json({
            message: "Product deleted!"
        })
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

export {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}