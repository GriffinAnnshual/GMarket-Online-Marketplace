import mongoose from 'mongoose';

export const connectMongoDB = async() => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};
