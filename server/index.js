const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const controller = require("./controller");
require("dotenv").config();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
     app.set("db", dbInstance);
     console.log("connected to db")
}).catch(error => console.log("error in massive connection", error));

const app = express();
app.use(bodyParser.json());

const PORT = 4005;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));