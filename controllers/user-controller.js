const User = require("../models/users");

registerUser = function (req, res, next) {

    
    var userData = req.body;
    var newUser = new User(userData);
    newUser.save(function (err) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.status(201);
           
            res.send({ success: "user created" });
        }
    });

}

module.exports.registerUser = registerUser;