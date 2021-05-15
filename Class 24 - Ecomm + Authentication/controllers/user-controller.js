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