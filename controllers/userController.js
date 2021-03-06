const jwt = require("jsonwebtoken");
const User =require("../Models/UserSchema");
const Product = require("../Models/ProductSchema");
var md5 = require('md5');


// handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code)
    let errors ={email: '', password:''};

    // incorrect email 
    if (err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password'){
        errors.password = 'that password is incorrect'
    }

    // duplicate error code 
    if (err.code === 11000){
        errors.email ='that email is already registerd'
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')){
        object.values(err.errors).forEach(({proprties})=>{
            console.log(proprties)
            errors[proprties.path] = proprties.message;

        })
    }

    return errors;
}


const maxAge=3*24*60*60;

const createToken =(id,email,type,image)=> {
    return jwt.sign({id,email,type,image},'net secret',{
    expiresIn:maxAge
})}

module.exports.signup_post= async (req,res)=>{
    const {email , password , name , userType }=req.body;
    const hashedUser = md5(req.body.password)

    try{
      const user = await  User.create({email , password:hashedUser ,  name , userType});
      const token =createToken(user._id,user.email,user.userType);
      res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
      res.status(201).json({user:token});


    }
    catch(err){
        const errors = handleErrors(err)
        res.status(200).json({errors})

    }
}

module.exports.login_post= async(req,res)=>{
    const {email , password}=req.body;

    try {
        const user = await User.login(email, password)
        const token =createToken(user._id,user.email,user.userType,user.imageUser);
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
        res.status(200).json({user:token})
    }
   catch(err){
       const errors = handleErrors(err)
       res.status(200).json({errors})

    }
}
module.exports.logout_get=(req,res)=>{
    res, cookie('jwt','', {maxAge:1});
    res.redirect('/')
}
