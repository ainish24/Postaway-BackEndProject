import express from 'express'
import { verifyToken } from '../../middlewares/jwtAuth.js'
import { postOwnerValidator } from '../../middlewares/authorizations.js'
import postController from './post.controller.js'

const router = express.Router()
router.use(verifyToken)

router.get('/all',postController.getAll)
router.get('/:postId',postController.getById)
router.get('/', postController.getByUserId)
router.post('/',postController.addPost)
router.delete('/:postId',postOwnerValidator,postController.deleteById)
router.patch('/:postId',postOwnerValidator,postController.updateById)

export default router