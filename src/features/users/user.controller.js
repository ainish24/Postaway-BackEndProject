import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import userRepository from "./user.repository.js"
import { errorHandler } from "../../middlewares/errorHandler.js"
import { tokenBlacklistModel } from './user.schema.js'

const signup= async (req,res)=>{
    const {name,email,password,gender}=req.body
    const user = await userRepository.signUp({name,email,password,gender})
    if(user){
        return res.status(200).json({
            success:true,
            data:user
        })
    }
}

const signin=async (req,res)=>{
    const {email,password}=req.body
    const user=await userRepository.signIn({email,password})
    const token=jwt.sign(user.toJSON(),process.env.JWT_KEY,{expiresIn:'15m'})
    res.cookie('token',token,{maxAge:1000*60*15})

    res.status(200).json({
        success:true,
        message:"Login Successful",
        data:user
    })
}

const logout = async (req,res)=>{
    res.clearCookie('token')
    res.status(200).json({
        status:true,
        message:"Logged out successfully"
    })
}

const logoutAll = async(req,res)=>{
    const userId=req.user._id
    await userRepository.logoutAll(userId)
    res.clearCookie('token')
    res.status(200).json({
        status:true,
        message:"Logged out successfully"
    })
}


export default {
    signup,
    signin,
    logout,
    logoutAll,
}