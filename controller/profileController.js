import asyncHandler from "../middleware/asyncHandler.js";


export const updateProfile = asyncHandler(async(req, res)=>{
    return res.send('halaman update profile')
})