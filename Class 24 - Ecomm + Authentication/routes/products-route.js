const route = require("express").Router();
const productController = require("../controllers/product-controller");
const userController = require("../controllers/user-controller");

route.get('/', (req, res) => {
    productController.getAll().then((data) => res.json(data));
});

route.post('/', (req, res) => {
    productController.add(req.user.email, req.body).then((product) => {
        userController.addProduct(req.user.email, product).then(() => {
            res.redirect('/user');
        });
    });
});

module.exports = { route };