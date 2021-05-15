const PORT = 5555;
const MONGO_URL = "mongodb://localhost:27017/";
const DB_NAME = "ecom";
const DB_URL = MONGO_URL + DB_NAME;

module.exports = { PORT, DB_URL };