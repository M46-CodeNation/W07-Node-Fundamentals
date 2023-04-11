const express = require("express");
const app = express();
app.use("/books", express.static("books"));
app.listen(5001, () => console.log("Server is online."));