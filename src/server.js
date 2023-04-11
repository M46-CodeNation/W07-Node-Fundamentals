const express = require("express");
const app = express();



// Run on port 5001.
var SERVER_PORT = 5001;
app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));