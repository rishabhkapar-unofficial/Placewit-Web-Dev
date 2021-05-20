const mongoose = require("mongoose");
const User = mongoose.model(require("../models/user-model").MODEL_NAME);

exports.addUser = function(obj) {
    const newuser = new User(obj);
    return newuser.save();
}

exports.addProduct = async function(email, product) {
    let user = await User.findOne({ email: email }).exec();
    user.products.push(product);
    return user.save();
}

exports.getUserByEmail = function(email) {
    return User.findOne({email}).exec();
}

exports.updateProduct = async function(email, productId, product) {
    const user = await User.findOne({email}).exec();
    for(let i = 0; i < user.products.length; i++) {
        if(user.products[i]._id == productId) {
            user.products[i] = product;
            return user.save();
        }
    }
}

exports.removeProduct = async function(email, productId) {
    const user = await User.findOne({email}).exec();
    for(let i = 0; i < user.products.length; i++) {
        if(user.products[i]._id == productId) {
            user.products.splice(i, 1);
            return user.save();
        }
    }
}