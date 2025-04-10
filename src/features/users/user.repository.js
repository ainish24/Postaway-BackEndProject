import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import {userModel} from "./user.schema.js"
import { errorHandler } from "../../middlewares/errorHandler.js";

const signUp= async (data)=>{
    try {
        const encPass=bcrypt.hashSync(data.password,10)
        const newUser=await userModel.create({...data, password:encPass})
        return newUser
    } catch (error) {
        throw new errorHandler(400,"Error creating new User")
    }
}
const signIn=async(data)=>{
    try {
        const user=await userModel.findOne({email:data.email})
        if(!user){
            throw new errorHandler(404,"User with the given Email not found!")
        }
        let isCorrect = bcrypt.compareSync(data.password, user.password)
        if(!isCorrect){
            throw new errorHandler(401,"Wrong Password")
        }
        return user
    } catch (error) {
        throw new errorHandler(400,"Error logging in")
    }
}

const logoutAll=async(userId)=>{
    const logoutTime=new Date()
    try {
        await userModel.findByIdAndUpdate(userId,{logoutAll: logoutTime})
    } catch (error) {
        throw new errorHandler(500,"Unknown error while logging out")
    }
}

export default {
    signUp,
    signIn,
    logoutAll
}