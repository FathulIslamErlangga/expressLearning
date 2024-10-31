import express from 'express'
import{registerStore, getRegisterStore} from '../controller/registrationStoreController.js'
import { protectedMiddleware } from '../middleware/authMiddleware.js';
import upload from '../utils/uploadImages.js';
import { getProductSeller } from '../controller/productController.js';

const store = express.Router();
store
    .route('/registration')
    .post(protectedMiddleware,upload.single('imageKtp'), registerStore)

store.get('/:slug',getProductSeller)
// store.patch('/approve-store/:id')
export default store