const mongoose = require("mongoose");


const shopSchema = new mongoose.Schema({

    // need to use validations 
   
    userId:{type:String},
    shopName: { type: String },
    address:{type:String},
    description:{type:String},
    telePhoneNumber:{type:Number},
    email: { type: String},
    createdAt: { type: Date, default: Date.now }
});




module.exports = mongoose.model("Shop", shopSchema, "shops");