import mongoose from "mongoose";


export const connectToDb= async ()=>{
    const baseUrl=process.env.MONGO_URL
    try {
        await mongoose.connect(baseUrl)
        console.log('Database connection established!')
    } catch (error) {
        console.log("Error connecting to database!", error.message)
    }
}