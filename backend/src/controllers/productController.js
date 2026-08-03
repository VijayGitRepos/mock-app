import Product from "../models/Product.js"

export const getAllProducts = async(req,res)=>{
    try {        
        const productArray = await Product.find({});
        if(productArray.length > 1){
            return res.status(200).json({message:'Products fetched successfully', productArray})
        }
    } catch (error) {
        console.log('Products fetch error',error);
    }
}