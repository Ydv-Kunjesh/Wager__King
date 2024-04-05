const mongo = require("mongoose")
const express = require("express")
app = express()

const ratingSchema = mongo.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
     author: {
        type:mongo.Schema.Types.ObjectId,
        ref:"user" 
    }
})

const Rating = mongo.model('review',ratingSchema)


module.exports = Rating