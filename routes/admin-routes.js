const express = require("express");
const adminController= require("../controllers/admin-contorller");

const router = express.Router();

router.post("/",adminController.addUser);
router.post("/login", adminController.authenticateUsers);

router.get("/",function(req,res,next){
    res.send("ssss");
});

module.exports = router;