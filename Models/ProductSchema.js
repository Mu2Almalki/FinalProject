const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Product =new Schema({
    nameProduct :String,
    description:String,
    image:String,
    price:Number,
    quontity:Number,
    seller:{ type: Schema.Types.ObjectId, ref: 'User' }
})

const product = mongoose.model('product', Product);
module.exports = product 