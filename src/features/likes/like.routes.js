import express from 'express'

const router=express.Router()

router.get('/:id')
router.post('/toggle/:id')

export default router