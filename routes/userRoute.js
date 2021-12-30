const Router= require('express')
const userCcontroller =require('../controllers/userController')
const router =Router();
const User = require ('../Models/UserSchema')
const Cart = require ('../Models/CartSchema')


router.post('/signup',  userCcontroller.signup_post);

router.post('/login',  userCcontroller.login_post)

router.get('/logout', userCcontroller.logout_get)

// router.post('/postcart',userCcontroller.post)

router.get('/home', async (req , res)=>{
    const users = await User.find({userType:"seller"}) 
    console.log("We are online")
    res.send(users)
})
// لايجاد بيانات كل بائع باستخدام id
router.get('/seller/:id', async (req , res)=>{
    const users = await User.findById(req.params.id).populate('comments') 
    console.log("We are online")
    res.send(users)
})
// لايجاد بيانات كل مشتري باستخدام id
router.get('/buyer/:id', async (req , res)=>{
    const users = await User.findById(req.params.id) 
    console.log("We are online")
    res.send(users)
})
// update user
router.put('/update/:id', async (request,response)=> {
    const allowedUpdates = ['name', 'imageUser', 'details'];
    const updates = Object.keys(request.body)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const user = await User.findOne({_id: request.params.id});
        if(!user) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            user[update] = request.body[update]
        })
        await user.save()
        response.status(200).send(user)
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
// cart

// router.post('/cart/post',async (req,res)=>{
// await User.findById({ _id: req.body.userId }).then(PUser => {
//     console.log("Find" + PUser)
//     if (PUser.cart == undefined) {
//         Cart.create({ cart: { products: req.body.product, qty: req.body.qty } }).then( async cart1 => {
//             console.log(cart1)
//             await User.findByIdAndUpdate(req.body.userId, { cart: cart1 }).then(async (user) => {
//                 await user.save()
//                 res.send(user)
//             }
//             )
//         }
//         )
//     } else { 
         
//         // if (PUser.cart==undefined){
//         Cart.findByIdAndUpdate(PUser.cart,{$push:{ cart: { products: req.body.product, qty: req.body.qty } }}).then(async (cart1) => {
//             await User.findByIdAndUpdate(req.body.userId, { cart:cart1}).then(async (user) => {
//                 await user.save()
//                 res.send(user)
            
//             })
//         }
//         )
//     //}
//     }
// })
// })
module.exports =router;