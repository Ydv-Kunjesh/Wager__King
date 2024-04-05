const express = require('express')
const router = express.Router()
const Listing = require('../models/listing.js')
const wrapAsync = require("../jarurifiles/wrapAsync.js")
const {listingSchema ,ratingSchema} = require("../jarurifiles/schemaValidator.js");
const expressError = require("../jarurifiles/Errors.js")
const {isLoggedIn, isOwner, listingvalidator} = require('../jarurifiles/loggedIn.js')
const listingController = require('../controllers/listings.js')
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


 

// server side error handeller



router.get("/",wrapAsync( listingController.index))

//NEW LISTING ROUTE
router.get("/new", isLoggedIn, listingController.newListingForm);
// new LISTING Route post
router.post("/new",
    isLoggedIn,
    listingvalidator,
    upload.single('listing[image]'),
    wrapAsync
        (listingController.addingNewListing)
)
// router.post("/new",upload.single('listing[image]'), (req, res) => {
//     res.send(req.file)
// } )
 
//SHOW ROUTE
router.get("/:id",wrapAsync(listingController.displayAllRegistredListings))



//EDIT Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListingForm))

// update Route 
router.put("/:id/edit",isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updatingMemberDetail))
//Delete Route
router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(listingController.deletingMember))

module.exports = router


