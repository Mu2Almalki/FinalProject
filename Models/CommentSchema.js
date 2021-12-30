const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema ({
    sellerId:{ type: Schema.Types.ObjectId, ref: 'User' },
    bayerId:{ type: Schema.Types.ObjectId, ref: 'User' },
    comment:String,
    // datePublishedOn:{type:Date,
    // default:Date.now}
    
},{timestamps:true}
)

module.exports= mongoose.model('Comment', Comment)