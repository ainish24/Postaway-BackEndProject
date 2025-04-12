import mongoose from "mongoose";

const likeSchema=new mongoose.Schema({
    likeFor:{
        type:String,
        required:true,
        enum:["Comment","Post"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'likeFor'
    }
})

export const likeModel=mongoose.model('like',likeSchema)