import asyncHandler from "../middleware/asyncHandler.js";
import productCollection from "../models/productModel.js";
import galleryCollection from "../models/galleriesModel.js";
import variantCollection from "../models/productVariantModel.js";
import storeCollection from "../models/storeModel.js";
import categoryCollection from "../models/categoryModel.js";
import brandCollection from "../models/brandModel.js";
 
 
export const createProduct = asyncHandler(async(req, res) => {
    const seller = req.user.id
    const {slug} = req.params
    const pathUrl = req.file
    const {
        name,kodeBarang,price,desc,category,
        imageProduct,gander
    } = req.body
    // hendle add thumbnail product 
    const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pathUrl.filename}`
    const image = await galleryCollection.create({
        imageType: 'thumbnail product',
        imageUrl

    })

    // get data toko seller
    const store = await storeCollection.findOne({slug})
    if (!store) {
        console.log('Store not found for slug:', slug);
        return res.status(404).json({
            message: 'Toko tidak ditemukan dengan slug yang diberikan'
        });
    }
    // add data product 
    const addProduct = await productCollection.create({
        name,
        kodeBarang,
        price,
        desc,
        gander,
        category,
        imageProduct: image.id,
        seller,
        store: store.id
    })
    store.product.push(addProduct.id)
    await  store.save()
    return res.status(201).json({
        message: 'product berhasil di tambahkan',
        items:{
            addProduct
        }

    })
})

export const getProduct = asyncHandler(async(req, res) => {
    const getData = await productCollection.find()
    // .populate('galleries')
    .populate('seller','_id name store').select('_id name price desc imageProduct discount gander slug').exec();
    return res.status(201).json({
        message: 'product berhasil di tampilkan',
        items: getData

    })
})


export const detailProduct = asyncHandler(async(req, res) => {
    const { slug } = req.params;
    const detailData = await productCollection.findOne({slug})
    .populate({
        path: 'seller',
        select:'name email',
        populate:{
            path:'store',
            model:'Store',
            select:'storeName'
        }
    })
    .populate('imageProduct','imageType imageUrl')
    .populate('variants', 'variantName variantValue qty SKU')
    .populate('category','name segman').exec()
    return res.status(201).json({
        message: 'product berhasil di tampilkan',
        items: detailData

    })
})

export const updateProduct = asyncHandler(async(req, res) => {
    const {slug} = req.params
    const {
        name,kodeBarang,price,desc,category,gander,
        brand
    } = req.body

    const product = await productCollection.findOneAndUpdate({slug},{
        name,
        // slug,
        kodeBarang,
        price,
        desc,
        gander,

    }, {new: true, strict: false})
    // .populate('brand','name').populate('category','name').exec()
    console.log('product', product.name)
    

      // Langkah 5: Update varian produk (tabel variant)
    //   if (category && Array.isArray(category)) {
    //     // Hapus varian yang lama dan tambahkan yang baru
    //    await categoryCollection.deleteMany({ product: product.id });
    //    const categoryItem = await Promise.all(category.map(async (categories) => {
    //           console.log('category', categoryItem)
    //         const newCategory = await categoryCollection.create({
    //             ...categories,
    //             product: product.id
    //         });
    //         return newCategory._id;
    //     }));
    //     product.category = categoryItem;
    // }

    // await product.save();

    return res.status(200).json({
        message: "Produk berhasil diperbarui",
        product
    });
    // if (brand && Array.isArray(brand)) {
    //     const brandId = await Promise.all(
    //         brand.map(async (brands) => {
    //             // Cari atau buat variant baru jika perlu
    //             const existingBrands = await brandCollection.findById(brands.id);
    //             console.log('brand:', existingBrands.name)
    //             if (existingBrands) {
    //                 // Update variant yang sudah ada
    //                 existingBrands.name = brands.name || existingBrands.name;
    //                 await existingBrands.save();
    //                 return existingBrands._id;
    //             } else {
    //                 // Buat variant baru jika tidak ada
    //                 console.log('brand:', brands)
    //                 const newBrand = await brandCollection.create(brands);
    //                 console.log('brand:', newBrand)
    //                 return newBrand._id;
    //             }
    //         })
    //     );
    //     product.brand = brandId;
    // }

    //    // Simpan produk yang diperbarui
    //    await product.save();

    //    return res.status(200).json({
    //        message: 'Produk berhasil diperbarui',
    //        data: product
    //    });

})

export const deleteProduct = asyncHandler(async(req, res) => {
    const {slug} = req.params

    const productItem = await productCollection.findOneAndDelete({slug}).populate('imageProduct variants')
   
    if(!productItem){
       res.status(404)
        throw new Error('Product tidak ditemukan')
    }
    if(productItem.imageProduct && productItem.imageProduct.length > 0){
        await galleryCollection.deleteMany({
            _id: {$in: productItem.imageProduct}
        })
        console.log(`foto telah di hapus id - ${productItem.imageProduct}`)
    }

    if(productItem.variants && productItem.variants.length > 0){
       await variantCollection.deleteMany({
            _id: {$in: productItem.variants}
        })
        console.log(`variant telah di hapus id - ${productItem.variants}`)
    }


    return res.status(200).json({
        messeage: 'data product berhasil dihapus'
    })
})

export const getProductSeller = asyncHandler(async(req, res) => {    
    const {slug} = req.params;
    
    const store = await storeCollection.findOne({slug}).populate({
        path: 'product',
        select: 'name price slug',
        populate:{
            path: 'imageProduct',
            model:'Gallery',
            select: 'imageUrl imageType'
        }
    }).exec()
    // const product = store.product[0].slug
    // console.log('nama slug',product)
    // const {} = req.query;
    if(!store){
        res.status(402)
        throw new Error('toko tidak ditemukan')
    }

    return res.status(201).json({
        message: 'data product toko berhasil',
        items:store,

    })

})

export const categoryProduct = asyncHandler(async(req,res) =>{
    const {gander, category} = req.params


    const findCategory = await categoryCollection.findOne({
        slug:category
    });
    console.log('categori dari:', findCategory);
    
    if(!findCategory){
        return res.status(402).json({ message: 'kategori product tidak ditemukan'})
    }
    
    const product = await productCollection.find({
        gander,
        category: findCategory._id
    })
    .populate('category', '_id name slug')
    .populate('imageProduct', 'imageType imageUrl')
    .select('_id name price desc  discount gander slug').exec()
    console.log('product dari:', product);
    
    return res.status(201).json({
        message: 'categori product berhasil ditemukan',
        items: product
    })

})