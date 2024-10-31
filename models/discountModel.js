import mongoose from "../utils/db.js";
import { Schema } from 'mongoose';

const discountSchema = new mongoose.Schema({
    discountName: {
        type: String,
    },
    discountPercent:{
        type: Number,
        required: [true, 'discount harus diisi']
    },
    validForm:{
        type:Date,
        required: [true, ' tanggal mulai discount harus diisi']
    },
    validUntil:{
        type:Date,
        required: [true, 'batas tanggal discount harus diisi']
    },
    product:[{
    type: Schema.Types.ObjectId,
    ref:"Products"
    }],
}, { timestamps: true})

const discountCollection = mongoose.model('Discount', discountSchema)

export default discountCollection
