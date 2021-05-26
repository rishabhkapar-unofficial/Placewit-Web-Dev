const mongoose = require("mongoose");

const MODEL_NAME = 'product';
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: String,
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

mongoose.model(MODEL_NAME, ProductSchema);
module.exports = { MODEL_NAME, ProductSchema };
