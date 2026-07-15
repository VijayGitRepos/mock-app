import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './src/config/db.js'
import dns from "dns";
import User from './src/models/user.model.js';
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'

dns.setServers(['1.1.1.1', '8.8.8.8'])

dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT
app.use(express.json());

await connectDB()

app.get('/',(req,res)=>{
  res.send("Server is Running successfully")
})
app.use('/users', userRoutes);
app.use('/auth',authRoutes);

app.listen(PORT,(req,res)=>{
    console.log('Backend App is running on port',PORT)
})