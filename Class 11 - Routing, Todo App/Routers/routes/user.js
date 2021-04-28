const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
    res.send("User page");
});

route.get('/admin', (req, res) => {
    res.send("Admin User");
});

module.exports = { route };