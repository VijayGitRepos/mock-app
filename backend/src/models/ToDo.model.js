import { Schema, model, Document } from "mongoose";

const toDoSchema = new Schema(
    {
        userId: {
            type: Number,
            required : false
        },
        id : {
            type:Number,
            required:false
        },
        title : {
            type:String,
            required : true
        },
        completed :{
            type: Boolean,
            default : false,
            required:true
        }
    },
    {
        timestamps :true
    }
);

export default model(
    "Todo",
    toDoSchema
)