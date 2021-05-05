const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const productRoute = require("./routes/Products");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoute.router);

connectDB(config.DB_URL).then(() => {
    listen(config.PORT);
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
