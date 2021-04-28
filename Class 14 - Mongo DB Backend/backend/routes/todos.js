const express = require('express');
const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/', (req, res) => {
    todoController.readAll().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error("Error occured while fetching the list of todos.");
        console.error(err);
        res.json({
            'error': 'Error occured while trying to fetch the todo list'
        });
    });
});

router.post('/', (req, res) => {
    todoController.create(req.body.title).then((data) => {
        res.redirect('/todos/'+data._id);
    });
})

router.get('/:id', (req, res) => {
    todoController.read(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error("Error fetching data of id:", req.params.id);
        console.error(err);
        res.json({
            'error': `Could not fetch data for id: ${req.params.id}`
        });
    });
});

router.delete('/:id', (req, res) => {
    todoController.remove(req.params.id).then(() => {
        res.send();
    });
});

router.put('/:id', (req, res) => {
    let obj = {};
    if(typeof req.body.title !== "undefined")
        obj.title = req.body.title;
    if(typeof req.body.done !== "undefined")
        obj.done = req.body.done;
    todoController.update(req.params.id, obj).then(() => {
        res.redirect(303, '/todos/'+req.params.id);
    });
})

module.exports = { router };

