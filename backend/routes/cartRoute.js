const Router= require('express')
const router =Router();
const User = require ('../Models/UserSchema')
const Cart = require ('../Models/CartSchema');
const Product =require('../Models/ProductSchema');



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
    // console.log(req.body.product)
    const product1 = await Product.findById({ _id: req.body.product})
    // console.log(product1)
    await User.findById({ _id: req.body.userId })
    .populate("cart")
    .then(async PUser => {
        console.log("Find PUser" )
        if (PUser.cart == undefined) {
            Cart.create({ cart: { products: req.body.product, qty: req.body.qty , subtotal:req.body.qty*product1.price}, total:req.body.qty*product1.price }).then( async cart1 => {
                // console.log(cart1)
                await User.findByIdAndUpdate(req.body.userId, { cart: cart1 }).then(async (user) => {
                    await user.save()
                    res.send(user)
                }
                )
            }
            )
        } else { 
             
let item = PUser.cart.cart.find((itemFound)=>{
  if(  itemFound.products==req.body.product){
    console.log("itemFound")
    console.log(itemFound.products)
return (itemFound)
}

})
    // console.log(item)

if(PUser.cart.cart.includes(item)){
    console.log("includes")
    console.log(PUser.cart)
Cart.update({_id:PUser.cart._id,"cart.products":req.body.product},
{
    $inc:{"cart.$.qty":req.body.qty},
    $set:{
        "cart.$.products":req.body.product,
        "cart.$.subtotal":product1.price*(item.qty+req.body.qty)
    },
    total: PUser.cart.total+product1.price*req.body.qty

},
function(err,model){
    if(err){
        console.log(err)
    }
})

Cart.findById({_id:PUser.cart._id}).then((newCart)=>{
    res.send(newCart)
})

}
            else{
                console.log("else")
                let test= await Cart.findById({_id:PUser.cart._id})
                console.log(test)

              await Cart.findByIdAndUpdate(PUser.cart._id,{$push:{ cart: { products: req.body.product, qty: req.body.qty , subtotal:req.body.qty*product1.price}} , total:PUser.cart.total+req.body.qty*product1.price }).then(async (cart1) => {
                await User.findByIdAndUpdate(req.body.userId, { cart:cart1}).then(async (user) => {
                    await user.save()
                    res.send(user)
                
                })
            })  
            }
            
        }
    })
    })
    module.exports =router;