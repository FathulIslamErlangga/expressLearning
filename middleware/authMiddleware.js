import jwt from 'jsonwebtoken';
import userCollection from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';
// import dotenv from 'dotenv';

export const protectedMiddleware = asyncHandler(async(req, res, next) =>{
    let token;
     token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await userCollection.findById(decoded.id).select("-password")
            next()                      
        } catch (error) {
            res.status(401);
            throw new Error(' Oops Not Authorized token failed ')
        }
    }
     else {
        res.status(401);
        throw new Error(' Oops Not Authorized, No Token ')
    }
  

})
export const admin = async(req, res, next) => {
    if(req.user && req.user.role === 'admin'){
       return  next()
    }
    return res.status(403).json({
        message: 'halaman ini tidak bisa diakses'
    })
}
export const seller = async(req, res, next) => {
    if(req.user && req.user.role === 'saller'){
       return  next()
    }
    return res.status(403).json({
        message: 'halaman ini tidak bisa diakses'
    })
}