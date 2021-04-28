const mongoose = require('mongoose');
const todoModel = require('../models/todo');

const Todo = mongoose.model(todoModel.name);

function create(title) {
    const newTodo = new Todo({ title: title });
    return newTodo.save();
}

function read(id) {
    return Todo.findById(id).exec();
}

function readAll() {
    return Todo.find({}).exec();
}

function remove(id) {
    return Todo.findByIdAndRemove(id, { useFindAndModify: false }).exec();
}

function updateTitle(id, newTitle) {
    return update(id, {title: newTitle});
}

function updateDone(id, newDone) {
    return update(id, {done: newDone});
}

function update(id, obj) {
    return Todo.findByIdAndUpdate(id, obj, { new: true, useFindAndModify: false }).exec();
}

module.exports = { create, read, readAll, remove, updateTitle, updateDone, update };