const product = require("../controllers/product");
const User = require('../Models/UserSchema')
const router = require("express").Router(),
ProductController = require('../controllers/product')

// find all product
router.get('/',ProductController.index)

// create a new product
router.post('/post/:id',ProductController.create);

// update
router.put('/put/:pid/:uid',ProductController.update)
// router.put('/put/:id',ProductController.edit)

// delete
router.delete('/delete/:pid/:uid',ProductController.delete)


// يعرض منتجات كل يوزر لوحده
router.get("/getProduct/:id",async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        await user.populate( 'products' );
        res.send(user);
    } catch (e) {
        res.status(500).send()
        console.error(e)
    }
})

module.exports=router;
