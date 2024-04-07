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


router.get("/Web-Developers",async(req,res,next)=>{

    const allListings = await Listing.find({"profession": "Web Developer" });
    res.render('listings/index.ejs', { allListings })
    
})
router.get("/IT-person",async(req,res,next)=>{

    const allListings = await Listing.find({"profession": "IT-Technician" });
    res.render('listings/index.ejs', { allListings })
    
})
router.get("/UI-UX",async(req,res,next)=>{

    const allListings = await Listing.find({"profession": "UI/UX Designer" });
    res.render('listings/index.ejs', { allListings })
    
})
router.get("/civilEngineer",async(req,res,next)=>{

    const allListings = await Listing.find({"profession": "Civil-Engineer" });
    res.render('listings/index.ejs', { allListings })
    
})



module.exports = router