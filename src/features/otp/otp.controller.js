import { mailerFunction } from "../../middlewares/mailer.js"
import otpRepository from "./otp.repository.js"
import { errorHandler } from "../../middlewares/errorHandler.js"
import bcrypt from 'bcrypt'

const sendOtp = async (req, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000)
        const userId = req.user._id
        const toEmail = req.user.email
        const expiresAt = new Date(Date.now() + 1000 * 60 * 5)
        mailerFunction(toEmail, otp)
        await otpRepository.storeOtp(otp, userId, expiresAt)
        res.status(200).json({
            success:true,
            message:"OTP sent successfully. OTP is valid for 5 mins."
        })
    } catch (error) {
        throw new errorHandler(400, `Error sending otp. ${error.message}`)
    }
}

const verifyOtp=async (req,res)=>{
try{    const userId = req.user._id
    const {otp}=req.body
    await otpRepository.verifyOtp(otp,userId)
    res.status(200).json({
        success:true,
        message:'OTP verification successful.'
    })}catch(error){
        throw new errorHandler(400, error.message)
    }
}

const resetPassword=async (req,res)=>{
    const userId = req.user._id
    const {updatedPassword}=req.body
    const newPassword=bcrypt.hashSync(updatedPassword,10)
    await otpRepository.resetPassword(userId,newPassword)
    res.status(200).json({
        success:true,
        message:'Password updation successful.'
    })
}

export default {
    sendOtp,
    verifyOtp,
    resetPassword
}