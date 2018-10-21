const express = require("express");
const bodyParser = require("body-parser");
const db = require("./lib/db");
const app = express();
const config = require("./config.json")[app.get("env")];



db.connect(config.mongoUrl);

app.use(bodyParser.json());

// routing to services services



app.listen(3000, function () {
    console.log("app is listning on port 3000");
});