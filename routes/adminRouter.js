import express from 'express';
import { admin, protectedMiddleware } from '../middleware/authMiddleware.js';
import  {approveStore, pendingRegisterStore}  from '../controller/admin/storeController.js';
import { brandCreate, deleteBrand } from '../controller/admin/brandController.js';
import upload from '../utils/uploadImages.js';
const adminRoute = express.Router()
adminRoute.patch('/approve-store/:registrationId', protectedMiddleware,admin, approveStore);
adminRoute.get('/store', protectedMiddleware,admin, pendingRegisterStore);

// brand handle admin
adminRoute.post('/brand/create', protectedMiddleware, upload.single('brandImage'), admin, brandCreate)
adminRoute.delete('/brand/delete/:brandId', protectedMiddleware, admin, deleteBrand)


export default adminRoute