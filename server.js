
let express =require('express')
let mongoose=require('mongoose')
app =express()
app.use(express.json()) 
const routerUser = require('./routes/userRoute')
const routerProduct = require('./routes/productRoute')
const routerComment = require('./routes/commentRoute')
const routerCart = require('./routes/cartRoute')
const routerFavorite = require('./routes/favoriteRoute')
const routerStripe = require('./routes/stripe')
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const path = require("path");
const router = require('./routes/userRoute')
const routerOrder = require('./routes/orderRoute')
// const { router } = require('./routes/userRoute')
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
// _________________________________________________favorite
app.use('/favorite',routerFavorite)
// _______________________________________________________payment
app.use('/payment',routerStripe)
// ________________________________________________Order
app.use('/order',routerOrder)
// app.listen(3001, ()=>{
//     console.log("express has started!")
// })

app.use("/", express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  console.log(path.resolve(__dirname, "frontend/build/index.html"));
  res.sendFile(path.resolve(__dirname + "/frontend/build", "index.html"));
});

app.listen(PORT);