const jwt =require('jsonwebtoken');
const UserSchema = require('../Models/UserSchema');

const requireUser = (req,res,next) =>{

    const token = req.cookies.jwt ;

    // chek json web token exists & is verified
    if (token){
        jwt.verify(token , 'net secret',(err, decodedToken)=>{
            if (err){
                console.log(err.mesaage);
                res.radirecte('/login')
            } else{
                console.log(decodedToken)
                next();
            }

        })

    }
    else{
        res.redirect('/logen');
    }

}

// check current user 
const checkUser = (req ,res,next)=>{
    const token =req.cookies.jwt;

    if (token){
        jwt.verify(token , 'net secret',(err, decodedToken)=>{
            if (err){
                console.log(err.mesaage);
                res.locals.user=null;
               next();
    } else {
        console.log(decodedToken);
        // let user =await Author.findById(decodedToken.id);
        res.locals.user=user
        next();

    }

})
    }
    else{
        res.locals.user=null;
        next();
    }
    }

module.exports= {requireUser , checkUser} ;