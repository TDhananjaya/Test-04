const User = require("../models/users");
const Shop =require("../models/shop");
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

addShop = function (req, res, next) {


    console.log(req.body);
    
    var shopData = req.body;
    var newShop = new Shop(shopData);
     newShop.save(function (err) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.status(201);
           
            res.send({ success: "shop created" });
        }
    });

    

}

module.exports.addShop = addShop;

getShops=function(req,res,next){
    
    var data =req.body;
    console.log(data);
    Shop.find({userId:data.userId},function(err,shops){
        if(err){
            res.status(500).send("internal server error");
        }
        if(!shops){
            res.status(500).send("no shops");
        }
        if(shops){
            res.status(200).send({shops:shops});
        }
    });
    
}

module.exports.getShops=getShops;

getShop=function(req,res,next){
    var data =req.params.id;
    console.log(data);
    Shop.findOne({_id:data},function(err,shops){
        if(err){
            res.status(500).send("internal server error");
        }
        if(!shops){
            res.status(500).send("no shops");
        }
        if(shops){
            res.status(200).send(shops);
        }
    });
}

module.exports.getShop=getShop;