const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const CartSchema = new Schema ({
    cart:[{
        products:{type: Schema.Types.ObjectID,ref:"product"},
        qty:{type: Number, default:1},
        subtotal:{type:Number }        
    }],
    total:{type:Number}
})
const cart = mongoose.model('cart', CartSchema);
module.exports = cart