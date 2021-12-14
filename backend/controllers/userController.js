const jwt = require("jsonwebtoken");
const User =require("../Models/UserSchema");
const Product = require("../Models/ProductSchema");


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

const createToken =(id)=> {
    return jwt.sign({id},'net secret',{
    expiresIn:maxAge
})}

module.exports.signup_post= async (req,res)=>{
    const {email , password , name , userType}=req.body;

    try{
      const user = await  User.create({email , password ,  name , userType});
      const token =createToken(user._id);
      res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
      res.status(201).json({user:user._id,token:token});


    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})

    }
}

module.exports.login_post= async(req,res)=>{
    const {email , password}=req.body;

    try {
        const user = await User.login(email, password)
        const token =createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
        res.status(200).json({user:user._id,token:token})

    }
   catch(err){
       const errors = handleErrors(err)
       res.status(400).json({errors})

    }
}
module.exports.logout_get=(req,res)=>{
    res, cookie('jwt','', {maxAge:1});
    res.redirect('/')
}
// cart
// module.exports.post=async(req,res)=>{
//     const user= User.findById(req.body.userid)
//     const product =Product.findById(req.body.productid)
//     User.cart.push(product)
//     try{
//        await user.save()
//         res.send(product)

//     }catch(e){
//     console.log(e)
//     }


// }