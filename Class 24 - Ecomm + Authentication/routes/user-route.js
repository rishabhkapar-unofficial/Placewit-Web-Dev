const path = require("path");
const route = require("express").Router();

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/home.html"));
});

route.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/login');
})

route.get('/add_product', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/add_product.html"));
})

module.exports = { route };