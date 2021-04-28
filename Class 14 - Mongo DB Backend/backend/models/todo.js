const mongoose = require('mongoose');

const name = 'Todo';
const TodoSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    done: {
        type: Boolean, 
        required: true,
        default: false
    }
});

mongoose.model(name, TodoSchema);
module.exports = { name };