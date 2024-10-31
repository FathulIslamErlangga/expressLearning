import asyncHandler from "../middleware/asyncHandler.js";
import variantCollection from "../models/productVariantModel.js";
import productCollection from "../models/productModel.js";


export const variantCreate = asyncHandler(async(req, res) => {
    const {slug} = req.params
    const {
        variantName, variantValue, priceAdjust,
        qty, SKU
    } = req.body
    const product = await productCollection.findOne({slug})
    if(!product){
        res.status(402)
        throw new Error('product tidak ditemukan ')
    }
    const addVariants = await variantCollection.create({
        variantName, 
        variantValue, 
        priceAdjust,
        qty, 
        SKU, 
        product:product.id
    })
    product.variants.push(addVariants.id);
    await product.save()

    return res.status(201).json({
        message: 'variant product berhasil ditambah',
        variants:addVariants
    })
})

export const deleteVariant = asyncHandler(async(req,res)=>{
    const {variantId} = req.params

    await variantCollection.findByIdAndDelete(variantId)

    return res.status(201).json({message: 'variant berhasil dihapus'})
})