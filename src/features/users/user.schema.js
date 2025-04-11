import mongoose from "mongoose";
import { errorHandler } from "../../middlewares/errorHandler.js";

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
    avatar:{
        type:String
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
    jti:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
tokenBlacklistSchema.pre('save', async function(next){
    const existingToken= await mongoose.models.BlacklistedToken.findOne({jti:this.jti})
    if(existingToken){
        throw new errorHandler(409, "Duplicate token")
    }
    next()
})

export const userModel= mongoose.model('User',userSchema)
export const tokenBlacklistModel=mongoose.model('BlacklistedToken',tokenBlacklistSchema)