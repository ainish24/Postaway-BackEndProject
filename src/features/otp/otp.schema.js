import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    OTP:{
        type:Number,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

otpSchema.index({expiresAt:1},{ expireAfterSeconds: 0 })
export const otpModel=mongoose.model('Otp',otpSchema)