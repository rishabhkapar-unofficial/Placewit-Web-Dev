const route = require("express").Router();
const productController = require("../controllers/product-controller");
const userController = require("../controllers/user-controller");
const { isProductInUserProducts } = require("./helper-functions");

// Cart Route
route.use('/cart', require('./cart-route').route);

// GET Methods

route.get('/', (req, res) => {
    productController.getAll().then((data) => res.json(data));
});


route.get('/name', (req, res) => {
    return res.json(req.user.email);
});

route.get('/myproducts', (req, res) => {
    userController.getUserByEmail(req.user.email).then((user) => {
        if(!user) {
            return res.json({ 'error' : 'User does not exist.'});
        } else {
            return res.json(user.products);
        }
    });
});

route.get('/:id', (req, res) => {
    productController.getById(req.params.id).then((product) => res.json(product));
});

// POST Methods
route.post('/', (req, res) => {
    productController.add(req.user.email, req.body).then((product) => {
        userController.addProduct(req.user.email, product).then(() => {
            res.redirect('/user');
        });
    });
});

route.post('/:id', async (req, res) => {
    if(isProductInUserProducts(req.user.email, req.params.id)) {
        req.body.email = req.user.email;
        const product = await productController.update(req.params.id, req.body);
        await userController.updateProduct(req.user.email, req.params.id, product).then((product) => {
            return res.redirect('/products/' + req.params.id);
        });
    }
});


// DELETE Methods
route.delete('/:id', (req, res) => {
    if(isProductInUserProducts(req.user.email, req.params.id)) {
        userController.removeProduct(req.user.email, req.params.id);
        productController.remove(req.params.id);
    }

    return res.send();
});

module.exports = { route };