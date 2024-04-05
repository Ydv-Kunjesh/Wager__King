
require("dotenv").config()
const express = require('express')
const app = express()
const mongo = require('mongoose')
const Listing = require('./models/listing.js')
const Reviews = require('./models/rating.js')
const User = require('./models/user.js')
const path = require('path');
const methodOverride = require('method-override')
const ejsMAte = require('ejs-mate');
const wrapAsync = require("./jarurifiles/wrapAsync.js")
const expressError = require("./jarurifiles/Errors.js")
const {listingSchema ,ratingSchema} = require("./jarurifiles/schemaValidator.js");
const { error } = require('console');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
const Localstrategy = require("passport-local");
// const listingController = require('./controllers/listings.js')



//routes 
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMAte)
const listingController = require('./controllers/listings.js')


//session setting and cookie  
const sessionOptions = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

};
app.use(session(sessionOptions));
//setting flash for auto notificatiuon
app.use(flash());

//autherntication using passport  
// we use session here to make sure the user who request is same or another user by using sesion ide 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//connection
// mongo.connect('mongodb://127.0.0.1:27017/Project').then((res)=>{console.log(`Database Connected`);}).catch((err)=>{console.log(err);})
// atlas
mongo.connect('mongodb+srv://wager_king:wager_king@wagerking.p45fclc.mongodb.net/project?retryWrites=true&w=majority&appName=wagerking')
.then((res) => {
    console.log(`Database Connected`);
})
.catch((err) => {
    console.log(err);
});

//using flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user
    next();
})
// using or listing routes
app.use('/listings',listingsRouter);
app.use('/listing',listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter)
app.use('/', userRouter)
// *************************************************************

app.get("/",wrapAsync( listingController.index)) 
//  *********************************************
//Error Handelling Middlewares
app.all("*",(req,res,next)=>{
    next (new expressError(404,"Page Not Found "))
})
app.use((err,req,res,next)=>{
    // console.log(err);  used to see actual error in our code
    let{statusCode=500,message="something Went Wrong"} = err;
    res.status(statusCode).render('errorHandeller/error.ejs',{message})
    // res.status(statusCode).send(message);
    // res.send(`Something went Wrong`)
})
app.listen(8080,()=>{
    console.log(`Listening to port ${`8080`}`);
}) 
