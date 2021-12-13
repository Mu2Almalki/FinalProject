const router = require('express').Router(),
ProductRoutes =require('./productRoute')

router.use('/home' , ProductRoutes)


module.exports= router