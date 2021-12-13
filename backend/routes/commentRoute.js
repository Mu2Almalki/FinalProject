const router = require("express").Router(),
CommentController = require('../controllers/commentController')

// find all product
router.get('/',CommentController.index)

// create a new product
router.post('/post/:sellerId/:bayerId',CommentController.create);

// delete
router.delete('/delete/:id',CommentController.delete)


module.exports=router;