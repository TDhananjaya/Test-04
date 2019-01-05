const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");

const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const clientRoutes =require("./routes/client-routes");
const db = require("./lib/db");
const app = express();

// mongodb://<dbuser>:<dbpassword>@ds149404.mlab.com:49404/foodordering
// mongoose.connect('mongodb://gimhana329:nov02329@ds245532.mlab.com:45532/travellia',

// mongoose.connect('mongodb://tharindud:123456789qaz@ds149404.mlab.com:49404/foodordering', function(err){
//     if(err) {
//         console.log('Some problem with the connection ' +err);
//     } else {
//         console.log('The Mongoose connection is ready');
//     }
// })

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