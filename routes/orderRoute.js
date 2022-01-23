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

router.get('/sellerOrder/:sellerId',(req,res)=>{
  const allorder = {order:[], buyer:[]}
  const product = Order.find({}).then((orders)=>{
    orders.forEach((order)=>{
      const ord = order.products.filter(pro => pro.products.seller == req.params.sellerId)
      allorder.order.push(ord)
      // allorder.buyer = order.Buyer
      console.log("oder",order.Buyer)
      user.find({_id:order.Buyer}, { name: 1, _id:0 }).then((user)=>{
        allorder.buyer.push(user[0].name)
        console.log("user",user[0])
        console.log("userrrrr",allorder.buyer)
         
      })
      
    })
    res.send(allorder)
    // _______________________
  })
  }) 

module.exports =router;