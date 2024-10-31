import asyncHandler from "../middleware/asyncHandler.js";
import galleryCollection from "../models/galleriesModel.js";
import productCollection from "../models/productModel.js";
import storeCollection from "../models/storeModel.js";

export const createGallery = asyncHandler(async(req, res)=>{
    const {slug} = req.params;
    const pathUrl = req.file;

    const product = await productCollection.findOne({slug})
    if(!product){
        res.status(404)
        throw new Error('product tidak ditemukan')
    }
    // not input file image
   if(!pathUrl){
    res.status(402)
    throw new Error('Oops Not input image file')
   }

   const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pathUrl.filename}`;
   const imageCollection = await galleryCollection.create({
    imageType : 'product', 
    imageUrl,
    product: product.id
   })
   product.imageProduct.push(imageCollection.id)
   await product.save()

   return res.status(201).json({
    message: 'foto berhasil ditambahkan',
    image: imageCollection
   })
})

export const updateImageProduct = asyncHandler(async(req, res) => {
    return res.send('halaman update coming soon')
})

export const createImageStore = asyncHandler(async(req,res)=>{
    const {slug} = req.params;
    const pathUrl = req.file

    const stores = await storeCollection.findOne({slug})
    if(!stores){
        res.status(402)
        throw new Error('toko tidak di temukan')
    }
    if(!pathUrl){
        res.status(402)
        throw new Error('Oops Not input image file')
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pathUrl.filename}`;
    const imageStore = await galleryCollection.create({
        imageType : 'store',
        imageUrl,
        store: stores.id
    })

    stores.galleries.push(imageStore.id)
    await stores.save()

    return res.status(201).json({
        message: 'tambah foto toko berhasil',
        store:imageStore
    })
})