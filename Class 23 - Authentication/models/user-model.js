const mongoose = require("mongoose");

const MODEL_NAME = "user";
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model(MODEL_NAME, UserSchema);
module.exports = { MODEL_NAME };