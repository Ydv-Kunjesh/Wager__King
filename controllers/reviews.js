const router = require("../routes/listing");
const Reviews = require('../models/rating.js')
const Listing = require('../models/listing.js')

module.exports.newreview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let rating = new Reviews(req.body.review)
    rating.author = req.user 
    listing.reviews.push(rating)
    console.log(rating.author);
    await rating.save();
    await listing.save();
    // console.log(listing);
    req.flash("success","Successfully created a new rating")
    res.redirect(`/listings/${listing._id}`)
   //
}
 module.exports.deletingReview = async(req,res)=>{
   const{ id , reviewId } = req.params;
   await Listing.findByIdAndUpdate(id,{ $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);
    req.flash('error', 'Successfully deleted review!')
   res.redirect(`/listings/${id}`);
}