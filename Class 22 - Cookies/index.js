const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*10
    }
}))


app.get('/', (req, res) => {
    res.json("Hello world!");
});


app.listen(4444);