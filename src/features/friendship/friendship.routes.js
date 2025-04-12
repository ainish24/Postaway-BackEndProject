import express from 'express'

const router=express.Router()

router.get('/get-friends/:userId')
router.get('/get-pending-requests')
router.post('/toggle-friendship/:friendId')
router.post('/response-to-request/:friendId')

export default router