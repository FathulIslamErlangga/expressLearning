import express from 'express';
import { 
     createCategory,
    deleteCategory,
} from '../controller/categoryController.js';
import { protectedMiddleware, seller} from '../middleware/authMiddleware.js';

const category = express.Router()
category.post('/category/add/collection/:slug', protectedMiddleware,seller,createCategory)
category.delete('/category/:categoryId',protectedMiddleware,seller,deleteCategory)

export default category