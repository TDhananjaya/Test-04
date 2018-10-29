const User = require("../models/users");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "sathira";

registerUser = function (req, res, next) {


    console.log(req.body);
    
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

    // res.send({ success: "user created" });

}

module.exports.registerUser = registerUser;



authenticateUsers = function (req, res, next) {
    userData = req.body;
    console.log("Ssas");
    console.log(userData);
    User.findOne({ email: userData.email }, function (err, user) {
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

                    const token = jwt.sign({ username: user.email, type: user.type, id: user._id }, SECRET_KEY);

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