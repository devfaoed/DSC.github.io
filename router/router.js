const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();
const User = require("../model/user");
const passport = require("passport");

 // index route for users
 routes.get("/", function(req, res) {
    res.redirect("/index");
})

routes.get("/index", function(req, res){
    res.render("index");
})


// routes for DSC
routes.get("/dashboard", mustLogin, function(req, res){
    res.render("dashboard");
})

// create account route users
routes.get("/create", function(req, res) {
    res.render("create");
})

// routes to post user data into database
routes.post("/create", function(req, res){
   var newUser = new User({
       username: req.body.username,
       surname: req.body.surname,
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email,
   });
   var password = req.body.password;

   User.register(newUser, password, function(err, user){
       if(err){
           console.log(err);
           res.redirect("back")
       }
       else{
           passport.authenticate("local")(req, res, function(){
           res.redirect("/login");
            })
       }
   })
})

// login route for users
routes.get("/login", function(req, res) {
    res.render("login");
})

// routes to login user data into database
routes.post("/login", passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/login",
}), function(req, res){

})


// routes to logout user data from database
routes.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

function mustLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login")
    }
}
module.exports = routes;