import express from 'express'
import { protectedMiddleware } from '../middleware/authMiddleware.js'
import { updateProfile } from '../controller/profileController.js'

const profile = express.Router()

profile.post('/user/sonyunara',protectedMiddleware,updateProfile)

export default profile