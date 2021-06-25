const path = require("path");
const route = require("express").Router();

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/home.html"));
});

route.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/login');
});

route.get('/add_product', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/add_product.html"));
});

route.get('/myproducts', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/my_products.html"));
});

route.get('/editproduct/:id', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/edit_product.html"));
});

// Cart Frontend
route.get('/cart', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/cart.html'));
});

module.exports = { route };