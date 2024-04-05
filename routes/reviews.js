const express = require('express')
const router = express.Router({mergeParams:true })
const Listing = require('../models/listing.js')
const Reviews = require('../models/rating.js')
const wrapAsync = require("../jarurifiles/wrapAsync.js")
const {listingSchema ,ratingSchema} = require("../jarurifiles/schemaValidator.js");
const expressError = require("../jarurifiles/Errors.js")
const { reviewValidator } = require("../jarurifiles/loggedIn.js")
const reviewController  = require('../controllers/reviews.js')




// serverside validator


router.post('/',reviewValidator,wrapAsync(reviewController.newreview))

router.delete("/:reviewId", wrapAsync(reviewController.deletingReview))

module.exports = router