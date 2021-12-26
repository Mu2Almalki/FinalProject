const Router= require('express')
const router =Router();
const User = require ('../Models/UserSchema')
const Product =require('../Models/ProductSchema');
const user = require('../Models/UserSchema');

router.get('/:userId', async(req,res)=>{
    User.findById({_id:req.params.userId}).populate("favorite")
    .then(user1=>{
     res.send(user1.favorite)
    }
    )
})

router.post('/post', async (req,res)=>{
    await User.findById({ _id: req.body.userId }).then(async(user)=>{

         Product.findById({ _id: req.body.product})
        if (user.favorite.includes(req.body.product)){
            res.send('product is found')
        }else {
            await User.findByIdAndUpdate(req.body.userId,{$push:{ favorite: req.body.product}}).then((fav)=>{
                res.send(fav)
            })
        }
    })
})

router.delete('/delete/:uid/:pid' , (req,res)=>{
  
        User.findByIdAndUpdate({ _id: req.params.uid },
            {
              $pull: {
                favorite: req.params.pid,
              },
            }
          ).then((resUser)=>{
              res.send(resUser)
        })
   
})

module.exports =router;