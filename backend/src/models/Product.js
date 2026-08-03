import { Schema, model, Document } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required : true
        },
        description: {
            type: String,
            required : true
        },
        price: {
            type: Number,
            required : true
        },
        isActive :{
            type: Boolean,
            default : true
        }
    },
    {
        timestamps :true
    }
);

export default model(
    "Product",
    productSchema
)