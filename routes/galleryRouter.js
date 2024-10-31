import express from 'express';
import { createGallery, createImageStore} from '../controller/galleriesContoller.js';
import { protectedMiddleware,seller } from '../middleware/authMiddleware.js';
import upload from '../utils/uploadImages.js';
const galleryRoute = express.Router()

galleryRoute.post('/product/:slug',protectedMiddleware,seller,upload.single('imageUrl'),createGallery);
galleryRoute.post('/store/:slug', protectedMiddleware, seller, upload.single('imageUrl'), createImageStore);

export default galleryRoute