const mongoose = require('mongoose');
const todoModel = require('./todo');
const Todo = mongoose.model('Todo');

const url = "mongodb://localhost:27017";


mongoose.connection.on('error', (err) => {
    console.error("Error occured.");
    console.error(err);
});

mongoose.connection.once('open', () => {
    console.log("Successfully connected.");

    // const todo1 = new Todo({title: "Do questions", done: true});
    // todo1.save();

    // Todo.findById("606dbcb03bc0011afc52aea5").exec((err, data) => {
    //     console.log(data);
    // });

    Todo.findByIdAndRemove("606dbcb03bc0011afc52aea5").exec();

});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

