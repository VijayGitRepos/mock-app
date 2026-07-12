import mongoose from "mongoose"

const connectDB= async ()=>{
    try {
        const uri=process.env.MONGO_URI;
        const conn = await mongoose.connect(uri);
        // console.log("MongoDB connected to:", conn.connection.name);  To display db name
        console.log('Mongo DB connected successfully')
    } catch (error) {
        console.log("Error in db connection",error)
    }
}

export default connectDB