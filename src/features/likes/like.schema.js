import mongoose from "mongoose";

const likeSchema=new mongoose.Schema({
    likeFor:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

export const likeModel=mongoose.model('like',likeSchema)