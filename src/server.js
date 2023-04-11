const express = require("express");
const app = express();

// Routing.
app.use("/", express.static("wwwroot"));
app.use("/music", express.static("wwwroot/music"));
app.use("/books", express.static("wwwroot/books"));
app.use("/games", express.static("wwwroot/games"));

// Run on port 5001.
app.listen(5001, () => console.log("Server is online."));