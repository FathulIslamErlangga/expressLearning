import asyncHandler from "../middleware/asyncHandler.js";
import categoryCollection from "../models/categoryModel.js";
import productCollection from "../models/productModel.js";

export const createCategory = asyncHandler(async(req,res) => {
    const {slug} = req.params
    const {name} = req.body

    const product = await productCollection.findOne({slug})

    if(!product){
        res.status(402)
        throw new Error('product tidak ditemukan')
    }

    const existingCategory = await categoryCollection.findOne({
        name,
        product: product.id
    })

    if(existingCategory){
        return res.status(400).json({
            message:'category pada product ini sudah tersedia'
        })
    }

    const addCategory = await categoryCollection.create({
        name,
        product:product.id
    })

    product.category.push(addCategory.id)
    await product.save()

    return res.status(201).json({
        message:'tambah categori berhasil',
        category: addCategory
    })
})

export const deleteCategory = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;

    await categoryCollection.findByIdAndDelete(categoryId)

    return res.status(201).json({message: 'categori berhasil dihapus'})


})
