const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
    res.send("Image page");
});

module.exports = { route };