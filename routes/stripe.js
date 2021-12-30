const router = require('express').Router();
const stripe = require('stripe')("sk_test_51KBwACGy54utR4N2ozG9tcWAAcArqU7TZmnkRr1mQJ1pAuByukkAGFG0eTf2fn6Af4y3WF7SETjXDvqO3MreLv0f007n4b593S");


router.post("/post" , (req,res) =>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
        res.status(500).json(stripeErr);
    }else {
        res.status(200).json(stripeRes)
    }
    })
})
module.exports = router;