const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Session = require("express-session");
const passport = require("passport");
require("./authentication/passport-local");

const {DB_URL, PORT} = require("./config");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.static(path.join(__dirname, "views")));

app.use(Session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require("./routes/index-route").route);

connectDB(DB_URL).then(() => {
    listen(PORT);
});

function listen(PORT) {
    app.listen(PORT, (err) => {
        if(err) {
            console.error("Could not start the server.");
            return;
        }
        console.log("Server is running at http://localhost:" + PORT);
    });
}

function connectDB(DB_URL) {
    mongoose.connection.on("error", (err) => {
        console.error("Could not connect to the Database.");
    });
    mongoose.connection.once("open", () => {
        console.log("Connected to Database.");
    });

    return mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
}