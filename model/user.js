const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    surname: String,
    firstname: String,
    lastname: String,
    gender: String,
    phone: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;