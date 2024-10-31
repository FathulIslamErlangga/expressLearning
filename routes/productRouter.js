import express from 'express';
import {
    createProduct, getProduct, updateProduct,
    deleteProduct, detailProduct,
    categoryProduct
} from '../controller/productController.js'
import { seller, protectedMiddleware } from '../middleware/authMiddleware.js';
import upload from '../utils/uploadImages.js';
// import upload from '../utils/uploadImages.js';
const product = express.Router();

product.get('/', getProduct)
product.post('/:slug', protectedMiddleware,upload.single('imageProduct'),seller,createProduct)
product.get('/:gander/:category', protectedMiddleware, categoryProduct)

product
    .route("/:slug")
    .get(detailProduct)
    .put(updateProduct)
    .delete(protectedMiddleware,seller,deleteProduct)



export default product