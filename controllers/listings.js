
const Listing = require('../models/listing.js')
const { listingSchema, ratingSchema } = require("../jarurifiles/schemaValidator.js");
const expressError = require("../jarurifiles/Errors.js")
const mbxGeocoding  = require('@mapbox/mapbox-sdk/services/geocoding');
const { query } = require('express');
const MAPTOKEN = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: MAPTOKEN });



module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index.ejs',{allListings})

}

module.exports.newListingForm = (req, res) => {
   
    res.render("listings/new.ejs")
}

module.exports.displayAllRegistredListings = async(req,res)=>{
    const id = req.params.id;
    // console.log(id);
    const listing = await Listing.findById(id)
        .populate({path: 'reviews',
            populate: {path:'author'
            }
        })
        .populate('owner');
    // console.log(listing);
    if(!listing){
        req.flash("error", "Member Does not found!   ")
        res.redirect("/listings")
    }
    // console.log(listing);
    res.render('listings/show.ejs',{listing})
}
 

module.exports.addingNewListing = async (req, res, next) => {
    response = await geoCodingClient.forwardGeocode({
        query: `${req.body.listing.location},${req.body.listing.country}`,
        limit: 1,       
    }).send()
    
    // res.send('done');
    const url = req.file.path;
    const filename = req.file.filename;
    const filenamedetail = req.file;
    // console.log(url,filename,filenamedetail);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    newListing.profession = req.body.listing.Profession
    saved_listing = await newListing.save();
    
    req.flash("success","Successfully created a new Member")
    res.redirect("/listings")   
}

module.exports.editListingForm = async(req,res)=>{
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("success", " Member Does not found!   ")
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing})
}

module.exports.updatingMemberDetail = async(req,res)=>{
    const id = req.params.id;
    let UserCheck = await Listing.findById(id);
    // console.log(url,filename,filenamedetail);
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
        response = await geoCodingClient.forwardGeocode({
        query: `${req.body.listing.location}`,
        limit: 1
        }).send()
    listing.geometry = response.body.features[0].geometry;
    if (typeof req.body.listing.Profession !== 'undefined')
    {
            listing.profession = req.body.listing.Profession

    }
    // console.log(req.body.listing.Profession);
    // listing.profession = req.body.listing.Profession;
    if(typeof req.file !== 'undefined'){
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
    }
    await listing.save();
    if (!listing) {
        req.flash("success", "Member Does not found!   ")
        res.redirect("/listings")
    }
    req.flash("success","Successfully updated Member")
    res.redirect("/listings")
}

module.exports.deletingMember = async(req,res)=>{
    id = req.params.id;
    const listing = await Listing.findByIdAndDelete(id);
    if(!listing){
        req.flash("success", "Member Does not found!   ")
        // res.redirect("/listings")
    }
    req.flash("success","You have Deleted a Member")
    res.redirect("/listings")
}