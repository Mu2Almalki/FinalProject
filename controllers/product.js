const Product = require('../Models/ProductSchema')
const User =require('../Models/UserSchema')

module.exports={
    // عملية عرض البيانات get
    index:(req,res)=>{
        Product.find({})
        .then(product=>{
            res.send(product)
        }) 
    },
    // عملية إنشاء البيانات post
    create:(req,res)=>{
        User.findById({_id:req.params.id})
        .then(user=>{
            Product.create({
                nameProduct : req.body.nameProduct,
                description :req.body.description,
                image: req.body.image,
                price:req.body.price,
                quontity:req.body.quontity,
            }).then(async product=> {
                 User.findByIdAndUpdate(req.params.id ,{$push:{products:product}})
                .then(async user=>{
                    await product.save()
                    await user.save()
                    await res.send(user)
                })
             } )
        })
        
    },
    // update data (put)
    update: (req, res) => {
        const updateProduct = Product.findByIdAndUpdate(req.params.pid, {
          $set: req.body,
        })
        .then(async()=>{
            const user = await User.findById(req.params.uid)
        await user.populate( 'products' );
        res.send(user);
        })
        .then((product)=>{
            res.status(200).send(product); 
        }) 
      },
    
    delete: (req,res)=>{
        Product.findByIdAndRemove( req.params.pid)
        .then(async()=>{
            const user = await User.findById(req.params.uid)
        await user.populate( 'products' );
        res.send(user);
        })
        .catch(error=>{
            res.json({error:error})
        })

    }

    // عمليه تحولني للفورم اللي بيتم فيه التحديث
    // edit:(req,res)=>{
    //     const id =req.params.id;
    //     Product.find({},(err,products)=>{
    //         res.render('productEdit',{})
    //     })
    // }

}