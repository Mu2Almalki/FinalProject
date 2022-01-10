const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrderSchema =new Schema({
    products:[],
TotalOrder:{type:Number},
Buyer:{ type: Schema.Types.ObjectId, ref: 'User' },

},{timestamps:true})

const Order = mongoose.model('order', OrderSchema);
module.exports = Order 