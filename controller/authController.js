import userCollection from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import asyncHandler from "../middleware/asyncHandler.js";
import { Error } from "mongoose";

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {
        expiresIn: '6d'
    })

}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const isDev = process.env.NODE_ENV === 'development' ? false : true
    const cookieOpstion = {
        exp : new Date(
            Date.now() + 6 + 24 + 60 + 60 + 1000
        ),
        httpOnly: true,
        security: isDev
    }
    res.cookie('jwt', token, cookieOpstion)
    user.password = undefined
    res.status(statusCode).json({
        data:user
    })
}

export const registerUser = asyncHandler(async(req, res) => {
    const isRole = (await userCollection.countDocuments()) === 0 
    const role = isRole ? 'admin' : 'user'
    const createUser = await userCollection.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role
    })
    createSendToken(createUser, 201, res)
})

export const loginUser = asyncHandler(async(req, res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400)
        throw new Error("email dan password tidak boleh kosong")
    }
    const userData = await userCollection.findOne({
        email: req.body.email
    })

    if(userData && (await userData.comparePassword(req.body.password))){
        createSendToken(userData, 200, res)
    }else{
        res.status(400);
        throw new Error('invalid login user')
    }
})

export const getTotalUser = asyncHandler(async(req, res)=>{
    const user = await userCollection.findById(req.user._id).select("-password")
    if(user){
        return res.status(200).json({
            user
        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})

export const logoutUser = async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        exp: new Date(Date.now())
    })
    res.status(200).json({
        message: 'logout berhasil'
    })
}
