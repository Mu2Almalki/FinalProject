const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = require('./ProductSchema').schema
const CommentSchema = require('./CommentSchema').schema
var md5 = require('md5');


const {isEmail}= require('validator')
const bcrypt = require('bcrypt')

const User =new Schema({
    name :String,
    email:{type:String,
    required:[true,"email should be provided"],
    unique:[true,"email already register"],
    validate :[isEmail, "Please enter an email"]},
    password:String,
    imageUser:String,
    favorite:{ type: Schema.Types.ObjectId, ref: 'product' },
    cart:{ type: Schema.Types.ObjectId, ref: 'cart' },
    userType:{type: String,
    enum:["byer","seller"]
    },
    comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    products:[{ type: Schema.Types.ObjectId, ref: 'product' }],
    details:String
})


// // fire a function after doc saved to db
User.post('save', function(doc,next){
    console.log('new user was created & saved', doc);
    next();
    })

    // static method to login user
    User.statics.login = async function(email, password){
        const user = await this.findOne({email})
        if (user){
        //   const auth= await bcrypt.compare(password, user.password)
          const newPass = md5(password)
          const userPass = user.password
          console.log(newPass, userPass)
        //   console.log(newpass)
          if(newPass === userPass){
              return user;
          }
          throw Error('incorrect password')
    
        }
        throw Error('incorrect email')
    }


const user = mongoose.model('User', User);
module.exports = user