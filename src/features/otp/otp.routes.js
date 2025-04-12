import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import otpController from './otp.controller.js'

const router=express.Router()
router.use(verifyToken)

router.post('/send',otpController.sendOtp)
router.post('/verify',otpController.verifyOtp)
router.post('/reset-password',otpController.resetPassword)

export default router