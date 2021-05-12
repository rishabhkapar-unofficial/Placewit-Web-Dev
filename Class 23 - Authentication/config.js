const SERVER_PORT = 4444;
const MONGO_URL = "mongodb://localhost:27017/";
const DB_NAME = "auth";

const DB_URL = MONGO_URL + DB_NAME;

module.exports = { SERVER_PORT, DB_URL };