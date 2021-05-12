const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const Session = require("express-session");
const { SERVER_PORT, DB_URL } = require("./config");
require("./authentication/passport-local");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(Session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require("./routes/user-route").route);

connectDB(DB_URL).then(() => {
    startListening(SERVER_PORT);
});

function startListening(SERVER_PORT) {
    app.listen(SERVER_PORT, (err) => {
        if(err)
            return console.error(err);
        console.log("Server is running at http://localhost:" + SERVER_PORT);
    });
}

function connectDB(DB_URL) {
    mongoose.connection.on("error", (err) => console.error(err));
    mongoose.connection.once("open", () => console.log("Connected to DB"));
    return mongoose.connect(DB_URL);
}