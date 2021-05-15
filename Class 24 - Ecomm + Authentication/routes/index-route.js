const path = require("path");
const passport = require("passport");
const route = require("express").Router();
const userController = require("../controllers/user-controller");
const { isAuthenticated, isNotAuthenticated } = require("./helper-functions");

route.use('/user', isAuthenticated, require("./user-route").route);
route.use('/products', isAuthenticated, require("./products-route").route);

route.get('/login', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/html/login.html"));
});

route.get('/register', isNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/html/register.html"));
});

route.post('/login', passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/login' }));

route.post('/register', (req, res) => {
    if(req.body.password !== req.body.confirmPassword)
        return res.json({ 'error': 'Passwords do not match.' });
    userController.addUser(req.body).then(() => {
        return res.redirect('/login');
    });
});

module.exports = { route };