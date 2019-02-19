const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const controller = require("./controller");
require("dotenv").config();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("connected to db")
}).catch(error => console.log("error in massive connection", error));

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}))

// AUTH ENDPOINTS
app.post("/api/register", controller.registerUser);
app.post("/api/login", controller.loginUser);
app.get("/api/user", controller.getUser);''

//TWEET ENDPOINTS
app.get("/api/tweets", controller.getTweets);
app.post("/api/tweets", controller.createTweet);

const PORT = 4005;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));