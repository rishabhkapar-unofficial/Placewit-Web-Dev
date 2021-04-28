const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
    res.send("Video page");
});

module.exports = { route };