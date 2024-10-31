import slugify from "slugify";
import mongoose from "../utils/db.js";
import { Schema } from "mongoose";

const storeSchema =  new mongoose.Schema({
    storeName: {
        type: String,
        unique: [true," nama toko sudah digunakan orang lain"]
    },
    slug: {
    type: String,
    unique: [true, 'slug nama sudah tersedia']
    },
    bio:String,
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    product:[{
        type: Schema.Types.ObjectId,
        ref:'Products'
    }],
    galleries: [{
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    }],
},{timestamps: true})

storeSchema.pre('save', function(next){
    if(this.storeName){
        this.slug = slugify(this.storeName, {lower:true, strict:true, replacement: ''})
    }
    next()
})

const storeCollection = mongoose.model('Store', storeSchema)
export default storeCollection