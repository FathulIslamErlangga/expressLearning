import express from 'express'
import { deleteVariant, variantCreate } from '../controller/variantController.js'
import { protectedMiddleware, seller } from '../middleware/authMiddleware.js'


const variant  = express.Router();

variant
    .route('/:slug')
    .post(protectedMiddleware, seller,variantCreate)
variant.delete('/:variantId',protectedMiddleware,seller,deleteVariant)

export default variant