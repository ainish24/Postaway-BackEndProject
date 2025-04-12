import mongoose from "mongoose";

export const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

export const commentModel=mongoose.model('Comment',commentSchema)