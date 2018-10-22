const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const clientRoutes =require("./routes/client-routes");
const db = require("./lib/db");
const app = express();

const config = require("./config.json")[app.get("env")];



db.connect(config.mongoUrl);

app.use(bodyParser.json());

// routing to services services
app.use("/api/admin",adminRoutes);
app.use("/api/users",userRoutes);
app.use("/api/clients",clientRoutes);



app.listen(3000, function () {
    console.log("app is listning on port 3000");
});