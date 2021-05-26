const mongoose = require("mongoose");
const Product = mongoose.model(require("../models/product-model").MODEL_NAME);

exports.add = function(email, product) {
    product.email = email;
    const newProduct = new Product(product);
    return newProduct.save();
}

exports.getAll = function() {
    return Product.find({}).exec();
}

exports.getById = function(id) {
    return Product.findById(id).exec();
}

exports.update = function(id, product) {
    // Added new: true for fixing the out of sync bug
    return Product.findByIdAndUpdate(id, product, { useFindAndModify: true, new: true }).exec();
}

exports.remove = function(id) {
    return Product.findByIdAndDelete(id, { useFindAndModify: true }).exec();
}