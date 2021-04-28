const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    let text = req.body.text.trim();
    if(text)
        tasks.push(text);
    res.redirect('/tasks');
});

module.exports = { router };