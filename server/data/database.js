import mongoose from 'mongoose';



export const connectMongoDB = async() =>{
const uri = process.env.MONGO_URI

mongoose.connect(uri)

const db = mongoose.connection

db.on("connected", () => console.log("MongoDB is connected"))
}