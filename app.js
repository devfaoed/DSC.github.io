 const express = require("express");
 const app = express();

 
 const passport = require("passport");
 const localStrategy = require("passport-local");

 const bodyParer = require("body-parser");
 const methodOverride = require("method-override");

 // importing routes 
const routes = require("./router/router"); 

// importing users model
const User = require("./model/user");

 const mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost/DDC");

 




 app.set("view engine", "ejs");

 app.use(express.static(__dirname + "/public"));
 app.use(methodOverride("_method"));
 app.use(bodyParer.urlencoded({extended: true}));

// express-session route
app.use(require("express-session")({
    secret: "building dignity developers communnity",
    resave: false,
    saveUninitialized: false,
}))

// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use( new localStrategy(User.authenticate()));


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


// importing routes API
app.use(routes);




 app.listen(2020, function() {
     console.log("dignity community server started on port 2020");
 })