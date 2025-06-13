import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo conectado")
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}