const express = require("express");

// Configuration
const app = express();

//Routing
app.use("/", express.static("wwwroot"));
app.use("/music", express.static("wwwroot/music"));
app.use("/books", express.static("wwwroot/books"));
app.use("/games", express.static("wwwroot/games"));

// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));