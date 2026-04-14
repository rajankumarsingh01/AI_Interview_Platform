import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully");
    } catch (error) {
        console.log(`Databse Error ${error}`)
    }
}

export default connectDb;