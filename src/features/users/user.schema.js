import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Others"]
    },
    logoutAll:{
        type: Date,
        default:0
    }
})

const tokenBlacklistSchema= new mongoose.Schema({
    jit:{
        type:String,
        required:true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const userModel= mongoose.model('User',userSchema)
export const tokenBlacklistModel=mongoose.model('BlacklistedToken',tokenBlacklistSchema)