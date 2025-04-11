import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { verifyIdOwner } from '../../middlewares/authorizations.js'
import { upload } from '../../middlewares/fileUpload.js'

const router=express.Router()

router.post('/signup',upload.single('avatar'),userController.signup)
router.post('/signin',userController.signin)
router.post('/logout',verifyToken,userController.logout)
router.post('/logout-all-devices',verifyToken,userController.logoutAll)
router.get('/get-details/:userId',verifyToken,userController.getUserDetails)
router.get('/get-all-details',verifyToken,userController.getAllDetails)
router.patch('/update-details/:userId',verifyToken,verifyIdOwner,upload.single('avatar'),userController.updateDetails)

export default router