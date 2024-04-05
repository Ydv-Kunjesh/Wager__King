const Listing = require("../models/listing");
const expressError = require('./Errors.js');
const {listingSchema ,ratingSchema} = require("./schemaValidator.js");



module.exports.listingvalidator = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(",");
        throw new expressError(400,msg);        
    }else{
        next();
    }
}

module.exports.reviewValidator = (req,res,next)=>{
    const  {error} = ratingSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(",");
        throw new expressError(400,msg);        
    }else{
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnUrl = req.originalUrl
        req.flash('error', 'Please Login First')
        res.redirect('/login')
       
    } else if(req.isAuthenticated) {

         next()
    }

};

module.exports.setReturnUrl = (req,res,next)=>{
    if(req.session.returnUrl){
        res.locals.returnUrl = req.session.returnUrl;   
    }
     next();
}

module.exports.isOwner =async(req, res, next) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    // console.log(listing.owner);
    // console.log(res.locals.currentUser);
    console.log(listing.owner.equals(res.locals.currentUser));

    if (!listing.owner.equals(res.locals.currentUser._id)) { 
        req.flash('error', 'You are not the owner of this listing')
        return res.redirect('/listings')
    } 
    next();
}

