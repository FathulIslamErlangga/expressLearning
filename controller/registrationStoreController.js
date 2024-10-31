import asyncHandler from "../middleware/asyncHandler.js";
import storeRegitrationCollection from "../models/storeRegistrationModel.js";
import galleryCollection from "../models/galleriesModel.js";
import path from "path";

export const registerStore = asyncHandler(async(req, res)=>{
    
    const user = req.user.id; 
    const {noKtp, storeName } = req.body
    const checkRegister = await storeRegitrationCollection.findOne({user:user})
    if(checkRegister){
        return res.status(400).json({
            message: 'Anda sudah melakukan pendaftaran'
        })
    }
    const pathImage = req.file;
    if(!pathImage){
        res.status(401);
        throw new Error(' Oops Not input image file')
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pathImage.filename}`;
    const image = await galleryCollection.create({
        imageUrl,
        imageType: 'ktp'
    })

    const registration = await storeRegitrationCollection.create({
        storeName,
        noKtp,
        imageKtp: image.id,
        user
    })
    return res.status(201).json({
        message: 'Pendaftaran toko berhasil. Menunggu persetujuan admin.',
        registration
    });
})
export const getRegisterStore = asyncHandler(async(req, res)=>{
    
})
