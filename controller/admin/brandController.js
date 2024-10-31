import asyncHandler from "../../middleware/asyncHandler.js";
import brandCollection from "../../models/brandModel.js";
import galleryCollection from "../../models/galleriesModel.js";


export const brandCreate = asyncHandler(async(req, res)=>{
    const {name} = req.body
    
    const pathImage = req.file
    if(!pathImage){
        return res.status(402).json({
            message: 'Oops Not input image file'
        })
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pathImage.filename}`
    const image = await galleryCollection.create({
        imageType: 'brand',
        imageUrl
    })
    console.log(image.id)
    const brandData = await brandCollection.create({
        name,
        brandImage: image.id
    })

    return res.status(201).json({
        message: 'brand berhasil ditambahkan',
        brand: brandData
    })
})

export const updateBrand = asyncHandler(async(req,res)=> {
    return res.send('halaman update')
})

export const viewBrandProduct = asyncHandler(async(req,res)=> {
    return res.send('halaman view')
})

export const deleteBrand = asyncHandler(async(req,res) => {
    const {brandId} = req.params

    const brandProduct = await brandCollection.findByIdAndDelete(brandId).populate('brandImage')
    if(!brandProduct){
        return res.status(402).json({message: 'brand tidak ditemukan'})
    }
    
    if(brandProduct.brandImage && brandProduct.brandImage.length > 0){
        await galleryCollection.deleteMany({
            _id : {$in: brandProduct.brandImage}
        })
        console.log('image brand telah dihapus')
    }

    return res.status(201).json({message: 'foto bran telah dihapus'})
})