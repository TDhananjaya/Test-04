
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");


const SECRET_KEY = "sathira";

// autheticate users 
authenticateUsers = function (req, res, next) {
    userData = req.body;
    console.log("hellow");
    console.log(userData);
    Admin.findOne({ username: userData.username }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(403);
            res.send({ error: "invalid username or password" });
            
        }

        if (user) {

            user.checkPassword(userData.password, function (err, isMatch) {
                
                if (err) {

                    res.status(500);
                    res.send({ error: "invalid password" });
                    return next(err);
                }

                if (isMatch) {

                    const token = jwt.sign({ username: user.username,type:user.type }, SECRET_KEY);

                    res.status(200);
                    res.send({ token: token });
                   

                } else {
                    res.status(403);
                    res.send({ error: "invalid username or password" });
                }
            });
        }



    });
}

module.exports.authenticateUsers = authenticateUsers;


addUser = function (req, res, next) {

    var userData = req.body;
    var newAdmin = new Admin(userData);
    console.log(req.body);

    newAdmin.save(function (err) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.status(201);
            res.send({ success: "user created" });
        }
    });

}

module.exports.addUser = addUser;
