import mongoose from "mongoose";

const friendshipSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:
        {
            type:String,
            enum:['PENDING','ACCEPTED','REJECTED'],
            required:true
        }
    
})

export const friendshipModel = mongoose.model('Friendship',friendshipSchema)