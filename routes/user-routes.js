const express = require("express");
const adminController= require("../controllers/user-controller");

const router = express.Router();

router.get("/",function(req,res,next){
    res.send("ssss");
});

module.exports = router;