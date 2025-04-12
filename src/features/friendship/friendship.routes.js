import express from 'express'
import friendshipController from './friendship.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'

const router=express.Router()
router.use(verifyToken)

router.get('/get-friends/:userId',friendshipController.getFriends)
router.get('/get-pending-requests',friendshipController.getRequests)
router.post('/toggle-friendship/:friendId',friendshipController.toggleFriends)
router.post('/response-to-request/:friendId',friendshipController.respondRequest)

export default router