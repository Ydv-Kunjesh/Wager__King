const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true
    }
    // passport will add and salt these both field automatically or us
    // username: String,  
    // password: String,
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
