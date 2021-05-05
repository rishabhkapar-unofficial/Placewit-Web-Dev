const mongoose = require("mongoose");

const NAME = "Product"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufactured_by: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model(NAME, ProductSchema);
module.exports = { NAME };
