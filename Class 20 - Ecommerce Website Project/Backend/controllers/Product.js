const mongoose = require("mongoose");
const productModelName = require("../models/Product").NAME;

const Product = mongoose.model(productModelName);

exports.add = function (obj) {
    let newProduct = new Product(obj);
    return newProduct.save();
}

exports.getAll = function() {
    return Product.find({}).exec();
}

exports.getById = function(id) {
    return Product.findById(id).exec();
}

exports.updateById = function(id, obj) {
    return Product.findByIdAndUpdate(id, obj, { new:true });
}

exports.removeById = function(id) {
    return Product.findByIdAndDelete(id);
}

