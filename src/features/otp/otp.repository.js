import { otpModel } from "./otp.schema.js"
import { errorHandler } from "../../middlewares/errorHandler.js"
import { userModel } from "../users/user.schema.js"

const storeOtp=async(otp,userId,expiresAt)=>{
    try {
        const isExist=await otpModel.findOne({userId})
        if(isExist){
            await isExist.deleteOne()
        }
        await otpModel.create({OTP:otp, expiresAt,userId})
    } catch (error) {
        throw new errorHandler(400,`Error storing otp. ${error.message}`)
    }
}
const verifyOtp=async(otp,userId)=>{
    try {
        const verification=await otpModel.findOne({userId})
        if(!verification){
            throw new errorHandler(410,`OTP expired.`)
        }
        if(otp!=verification.OTP){
            throw new errorHandler(401,`Wrong OTP.`)
        }
        await verification.deleteOne()
        return true
    } catch (error) {
        throw new errorHandler(400,`OTP verification failed. ${error.message}`)
    }
}
const resetPassword=async (userId,updatedPassword)=>{
    try {
        await userModel.findByIdAndUpdate(userId,{password:updatedPassword})
    } catch (error) {
        throw new errorHandler(400,`Error updating password. ${error.message}`)
    }
}

export default {storeOtp,verifyOtp,resetPassword}