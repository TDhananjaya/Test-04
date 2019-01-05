const express = require("express");
const userController= require("../controllers/user-controller");

const router = express.Router();

router.get("/",function(req,res,next){
    res.send("ssss");
});

router.post("/register",userController.registerUser);
router.post("/login",userController.authenticateUsers);
router.post("/addshop",userController.addShop)
router.post("/shops",userController.getShops);
router.get("/shop/:id",userController.getShop);

module.exports = router;