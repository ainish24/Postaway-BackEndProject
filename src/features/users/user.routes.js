import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'

const router=express.Router()

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.post('/logout',verifyToken,userController.logout)
router.post('/logout-all-devices',verifyToken,userController.logoutAll)

export default router