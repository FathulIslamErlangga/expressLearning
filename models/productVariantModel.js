import mongoose from "../utils/db.js";
import { Schema } from 'mongoose';

const variantSchema = new mongoose.Schema({

    variantName: {
        type: String,
        required: [true, 'type variant harus diisi']
    },
    variantValue: {
        type: String,
        required: [true, 'nama variant harus diisi']
    },
    priceAdjust:{
        type:Number,
        required: [true, 'harga variant harus diisi']
    },
    qty:{
        type:Number,
        required: [true, 'qty variant harus diisi']
    },
    SKU:{
        type: String,
        required: [true, 'SKU variant harus diisi']
    },
    product:[{
    type: Schema.Types.ObjectId,
    ref:"Products"
    }],
}, { timestamps: true})


const variantCollection =  mongoose.model('Variant', variantSchema)

export default variantCollection