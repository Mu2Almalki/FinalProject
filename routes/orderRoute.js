const Router= require('express')
const router =Router();
const Product = require ('../Models/ProductSchema')
const Order = require ("../Models/OrderSchema");
const user = require('../Models/UserSchema');
const Cart = require('../Models/CartSchema')

router.post("/post/:id" , async(req,res)=>{
    const product = req.body.cartProduct
  Order.create({products:product , TotalOrder:req.body.TotalOrder , Buyer:req.body.BuyerId })
  .then (order =>{
    user.findById(req.params.id).then((user1)=>{
      console.log("cartId",user1.cart);
      Cart.find({_id: user1.cart}).remove(function(err) {
        console.log(err)
      })
      res.send(order)
    })
  })
}
)
// order beyer
router.get('/:buyerId',(req,res)=>{
const product = Order.find({Buyer:req.params.buyerId}).then((orders)=>{
  res.send(orders)
})
}) 


module.exports =router;