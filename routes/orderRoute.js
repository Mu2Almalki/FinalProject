const Router= require('express')
const router =Router();
const Product = require ('../Models/ProductSchema')
const Order = require ("../Models/OrderSchema")

router.post("/post" , async(req,res)=>{
    const product = req.body.cartProduct
  Order.create({products:product , TotalOrder:req.body.TotalOrder , Buyer:req.body.BuyerId })
  .then (order =>{
      res.send(order)
  })
}
)
router.get('/:sellerId',(req,res)=>{
const product = Product.findById(req.params.sellerId)
        user.populate('products')
}) 
// _______________> 

module.exports =router;