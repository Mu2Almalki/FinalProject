const Router= require('express')
const userCcontroller =require('../controllers/userController')
const router =Router();
const User = require ('../Models/UserSchema')



router.post('/signup',  userCcontroller.signup_post);

router.post('/login',  userCcontroller.login_post)

router.get('/logout', userCcontroller.logout_get)

router.post('/postcart',userCcontroller.post)

router.get('/home', async (req , res)=>{
    const users = await User.find({userType:"seller"}) 
    console.log("We are online")
    res.send(users)
})
// لايجاد بيانات كل بائع باستخدام id
router.get('/seller/:id', async (req , res)=>{
    const users = await User.findById(req.params.id) 
    console.log("We are online")
    res.send(users)
})
// لايجاد بيانات كل مشتري باستخدام id
router.get('/buyer/:id', async (req , res)=>{
    const users = await User.findById(req.params.id) 
    console.log("We are online")
    res.send(users)
})

module.exports =router;