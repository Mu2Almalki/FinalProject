const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Cart =new Schema({
   
    quontity:Number,
    // user:{ type: Schema.Types.ObjectId, ref: 'User' },
    Product:{type: Schema.Types.ObjectId, ref: 'Product' }
})


module.exports= mongoose.model('Product', Product)