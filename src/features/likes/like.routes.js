import express from 'express'
import likeController from './like.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'

const router=express.Router()
router.use(verifyToken)

router.get('/:id',likeController.getLikes)
router.post('/toggle/:id',likeController.toggleLike)

export default router