import asyncHandler from "../../middleware/asyncHandler.js";
import storeRegitrationCollection from "../../models/storeRegistrationModel.js";
import userCollection from "../../models/userModel.js";
import storeCollection from "../../models/storeModel.js";
import dotenv from "dotenv";
import galleryCollection from "../../models/galleriesModel.js";


export const approveStore = asyncHandler(async (req, res) => {
    console.log("Masuk ke approveStore controller");
    
    const { status, product,imageUrl } = req.body;
    const image = imageUrl || process.env.STORE_DEFAULT;

    const register = await storeRegitrationCollection.findById(req.params.registrationId);
    if (!register) {
        console.log("Data register tidak ditemukan");
        return res.status(404).json({
            message: 'Data register tidak ada'
        });
    }

    const imageStore = await galleryCollection.create({
        imageType: 'store image',
        imageUrl: image
    })

    if (status === 'approve') {

        const store = await storeCollection.create({
            storeName: register.storeName,
            owner: register.user,
            product,
            galleries: imageStore.id,
            status: 'active'
        });

        await userCollection.findByIdAndUpdate(register.user, {
        role : 'saller',
        store : store.id
        },{new:true})
        

        register.status = 'approve';
        await register.save();

        
        return res.status(200).json({
            message: 'Toko berhasil dibuat',
            store
        });
    }

    console.log("Status bukan approve, status reject");

    register.status = 'reject';
    await register.save();

    console.log("Pendaftaran toko ditolak, mengirimkan respons");
    return res.status(200).json({
        message: 'Pendaftaran toko telah ditolak'
    });
});

export const pendingRegisterStore = asyncHandler(async(req,res)=>{
    const getRegisterStore = await storeRegitrationCollection.find()
    .populate('user', 'email name').select('storeName status createdAt updatedAt').sort({
        createdAt: -1,
        updatedAt:-1
    }).exec()
   
    const status = getRegisterStore.filter(pending => pending.status === 'pending')
if(status.length > 0){
    // console.log(status)
    return res.status(201).json({
        message: 'success get data registration seller',
        data: status
    })
}else{
    return res.status(404).json({message: 'registration no found'})
}
})