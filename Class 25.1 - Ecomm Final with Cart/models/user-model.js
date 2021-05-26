const mongoose = require("mongoose");
const ProductSchema = require("./product-model").ProductSchema;
const MODEL_NAME = 'user';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [ProductSchema],
    cart: [String]
});

mongoose.model(MODEL_NAME, UserSchema);
module.exports = { MODEL_NAME };