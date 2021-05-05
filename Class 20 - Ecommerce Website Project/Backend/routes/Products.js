const router = require("express").Router();
const productController = require("../controllers/Product");

router.get('/', (req, res) => {
    productController.getAll().then((data) => {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    let obj = {
        name: req.body.name,
        manufactured_by: req.body.manufactured_by,
        image_url: req.body.image_url,
        price: parseFloat(req.body.price),
        description: req.body.description
    };
    
    console.log(obj);

    productController.add(obj).then((data) => {
        res.redirect(201, '/products/' + data._id);
    }).catch((err) => {
        res.json(403, {error: "Could not add the product."});
    });
});


router.get('/:id', (req, res) => {
    productController.getById(req.params.id).then((data) => {
        res.json(data);
    });
});

router.put('/:id', (req, res) => {
    let obj = {
        name: req.body.name,
        manufactured_by: req.body.manufactured_by,
        image_url: req.body.image_url,
        price: parseFloat(req.body.price),
        description: req.body.description
    };

    productController.updateById(req.params.id, obj).then(() => {
        res.redirect(303, '/products/' + req.params.id);
    });
});

router.delete('/:id', (req, res) => {
    productController.removeById(req.params.id).then(() => res.send());
});

module.exports = {router};