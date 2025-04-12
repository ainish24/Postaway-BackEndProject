import express from 'express'

const router=express.Router()

router.post('/send')
router.post('/verify')
router.post('/reset-password')

export default router