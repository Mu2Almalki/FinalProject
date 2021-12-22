const Comment = require('../Models/CommentSchema')
const User =require('../Models/UserSchema')


module.exports={
    // عملية عرض البيانات get
    index:(req,res)=>{
        Comment.find({})
        .then(Product=>{
            res.json({error:error})
        })
    },
    // عملية إنشاء البيانات post
     create: (req,res)=>{
        User.findById({_id:req.params.sellerId})
        .then(seller=>{
            User.findById({_id:req.params.bayerId})
            .then(bayer=>{ 
                Comment.create({
                    comment:req.body.comment,
                    sellerId:seller,
                    bayerId:bayer
                }).then(async comment1=>{
                    // User.findByIdAndUpdate({_id:req.params.sellerId}, { $push: { comments: comment1 } })
                    seller.comments.push(comment1._id)
                    try{
                        await seller.save()
                        res.send(comment1)
                    }catch(e){
                        console.log(e)
                    }
                   
                 } )
                
            })
           
        })
        
    },
    // delete
    delete:(req,res)=>{
        Comment.findByIdAndRemove( req.params.id)
        .then(()=>{
            res.send("comment is deleted")
            res.send(user);
        })
        .catch(error=>{
            res.json({error:error})
        })

    }

}