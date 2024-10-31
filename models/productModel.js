import mongoose from '../utils/db.js';
import { Schema } from 'mongoose';
import slugify from 'slugify';
// import {autoIncrement} from '../utils/db.js';



const productSchema = new mongoose.Schema({

 name: {
    type: String,
    required: [true, 'product harus diisi'],
    unique: [true, 'nama product sudah tersedia']
 },
 slug: {
    type: String,
    unique: [true, 'slug nama sudah tersedia']
 },
 kodeBarang: {
    type: String,
    required: [true, 'kode barang harus diisi'],
    unique: [true, 'kode barang sudah tersedia'],
 },
 price: {
    type: Number,
    required:[true, 'harga product harus diisi'],
 },
 desc: {
    type: String,
    required:[true, 'decripsi product harus diisi'],
 },
 gander:{
   type:String,
   enum: ['pria','wanita','anak'],
   required:[true,'gander untuk product harus diisi']
 },
 category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
 }],
 seller: [{
   type: Schema.Types.ObjectId,
   ref: 'Users',
   required: [true, 'seller product harus diisi']
 }],
 store:[{
   type: Schema.Types.ObjectId,
   ref: 'Store'
 }],
 brand:{
   type: Schema.Types.ObjectId,
   ref: 'Brand'
 },
 imageProduct: [{
   type: Schema.Types.ObjectId,
   ref: 'Gallery'
 }],
 variants:[{
   type: Schema.Types.ObjectId,
   ref:"Variant"
 }],
 discount:[{
   type: Schema.Types.ObjectId,
   ref:"Discount"
 }],

}, { timestamps: true });

// productSchema.plugin(autoIncrement)

productSchema.pre('save', function(next) {
   if (this.name) {
       this.slug = slugify(this.name, { lower: true, strict: true });
   }
   next();
});

const productCollection =  mongoose.model('Products', productSchema);

export default productCollection