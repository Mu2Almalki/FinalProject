const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Product =new Schema({
    nameProduct :String,
    description:String,
    image:String,
    price:Number,
    quontity:Number,
    user:{ type: Schema.Types.ObjectId, ref: 'User' }
})


module.exports= mongoose.model('Product', Product)