const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model(require("../models/user-model").MODEL_NAME);

const route = require("express").Router();
const path = require("path");


// GET Methods
route.get("/login", isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/login.html"));
});

route.get("/register", isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/register.html"));
});

route.get('/home', isAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/home.html"));
});

// POST Methods
route.post("/login", passport.authenticate('local', { successRedirect: "/user/home", failureRedirect: "/user/login" }));

route.post("/register", (req, res) => {
    if(req.body.password !== req.body.confirmPassword)
        return res.json({ "error": "passwords do not match." });
    const newuser = new User(req.body);
    return newuser.save().then(() => res.redirect("/user/login"))
                            .catch((err) => res.json({ "error": "user already exists" }));
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        next();
    else
        return res.json({"error": "user is not authenticated."});
}

function isNotAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        res.redirect("/user/home");
    else
        next();
}

module.exports = { route };