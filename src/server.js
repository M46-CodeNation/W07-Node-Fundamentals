const express = require("express");
const { Game } = require("./db");

// Fluent Configuration
const app = express()
    .disable('TRACE')
    .use(express.json());

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));