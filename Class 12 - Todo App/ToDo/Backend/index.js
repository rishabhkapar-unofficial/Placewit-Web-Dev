const express = require('express');
const tasks = require('./routes/tasks');


const app = express();
const port = 5555;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
});

app.use('/tasks', tasks.router);

app.listen(port);
