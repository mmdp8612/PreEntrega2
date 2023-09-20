import CartMongo from "../dao/CartMongo.js";

const cartMongo = new CartMongo();

const createCart = async (req, res) => {
    try{
        const newCart = await cartMongo.createCart();
        return res.status(200).json({
            message: "Cart created!",
            cart: newCart
        })  
    }catch(error){
        return res.status(500).json({
            error: error.message
        })  
    }
}

const getProductsCart = async (req, res) => {
    const { cid } = req.params; 
    try{
        const productsCart = await cartMongo.getProductsCart(cid);
        return res.status(200).json(productsCart)  
    }catch(error){
        return res.status(404).json({
            error: error.message
        })  
    }
}

const addProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    try{
        await cartMongo.addProductCart(cid, pid);
        return res.json({
            message: `Product added to cart succesfuly`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

export {
    createCart,
    getProductsCart,
    addProductCart
}