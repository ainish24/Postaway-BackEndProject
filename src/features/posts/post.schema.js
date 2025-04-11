import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

export const postModel= mongoose.model('Post',postSchema)