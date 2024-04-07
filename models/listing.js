const mongoose = require("mongoose");
// const { listingSchema } = require("../jarurifiles/schemaValidator");
const Schema = mongoose.Schema;
const Reviews = require('./rating.js')
const owner = require('./user.js')

const listingSchema = new Schema({
    title:{type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String,   
    },
    price:Number,
    location:String, 
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    },
    profession : {
        type: String,
        required: true,
    }

});

// Mongoose post middleware to handel Deltation

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Reviews.deleteMany({_id: {$in:listing.reviews}})
    }
})

const Listing = mongoose.model('listing',listingSchema)


module.exports = Listing