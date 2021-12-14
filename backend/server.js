
let express =require('express')
let mongoose=require('mongoose')
app =express()
app.use(express.json()) 
const routerUser = require('./routes/userRoute')
const routerProduct = require('./routes/productRoute')
const routerComment = require('./routes/commentRoute')
const routerCart = require('./routes/cartRoute')
const cors = require("cors")
app.use(cors());

// _________________________________________________________
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://Mushira:Ms0503391650@cluster0.nujs7.mongodb.net/Project?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

app.use(routerUser)

// app.use(cookieParser());
// ___________________________________product

app.use('/product',routerProduct)
// _________________________________________comment
app.use('/comment',routerComment)
// _________________________________________________cart
app.use('/cart' ,routerCart)
// _________________________________________________
app.listen(3001, ()=>{
    console.log("express has started!")
})