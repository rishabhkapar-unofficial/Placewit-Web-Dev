const express = require('express');
const Tasks = require('../objects/tasks');
const router = express.Router();
const cors = require('cors');

router.options('/:id', cors());

let tasks = new Tasks.create();

router.get('/', (req, res) => {
    res.json(tasks.getAll());
});

router.post('/', (req, res) => {
    tasks.add(req.body.title, false);
    res.redirect('/todos');
});

router.get('/:id', (req, res) => {
    res.json(tasks.get(req.params.id));
});

router.delete('/:id', (req, res) => {
    tasks.remove(req.params.id);
    res.send();
});

router.put('/:id', (req, res) => {
    tasks.update(req.params.id, req.body.title, req.body.done);
    res.redirect( '/todos/' + req.params.id);
});

module.exports = { router };