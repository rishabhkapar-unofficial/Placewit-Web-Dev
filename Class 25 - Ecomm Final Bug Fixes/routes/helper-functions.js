const userController = require("../controllers/user-controller");

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    return res.json({ 'error': 'You are not authenticated.' });
}

exports.isNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return res.redirect("/user");
    return next();
}

exports.isProductInUserProducts = async (email, productId) => {
    await userController.getUserByEmail(email).then((user) => {
        for(let i = 0; i < user.products.length; i++) {
            if(user.products[i]._id == productId)
                return true;
        }
    });
}