const Router= require('express')
const router =Router();
const User = require ('../Models/UserSchema')
const Cart = require ('../Models/CartSchema')


router.get('/cart/:userId', async(req,res)=>{
    User.findById({_id:req.params.userId})
    .then(user1=>{
console.log(user1.cart)
        Cart.find({_id:user1.cart}).populate('cart.products')
        .then(cart=>{
            res.send(cart)
        })
    }
    )
})


router.post('/cart/post',async (req,res)=>{
    await User.findById({ _id: req.body.userId }).then(PUser => {
        console.log("Find" + PUser)
        if (PUser.cart == undefined) {
            Cart.create({ cart: { products: req.body.product, qty: req.body.qty } }).then( async cart1 => {
                console.log(cart1)
                await User.findByIdAndUpdate(req.body.userId, { cart: cart1 }).then(async (user) => {
                    await user.save()
                    res.send(user)
                }
                )
            }
            )
        } else { 
             
            // if (PUser.cart==undefined){
            Cart.findByIdAndUpdate(PUser.cart,{$push:{ cart: { products: req.body.product, qty: req.body.qty } }}).then(async (cart1) => {
                await User.findByIdAndUpdate(req.body.userId, { cart:cart1}).then(async (user) => {
                    await user.save()
                    res.send(user)
                
                })
            }
            )
        //}
        }
    })
    })
    module.exports =router;