import express from 'express'
import commentController from './comment.controller.js'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { commentEditor } from '../../middlewares/authorizations.js'

const router=express.Router()

router.use(verifyToken)

router.get('/:postId',commentController.getComments)
router.post('/:postId',commentController.addComment)
router.delete('/:commentId',commentEditor,commentController.deleteComment)
router.patch('/:commentId',commentEditor,commentController.updateComment)

export default router