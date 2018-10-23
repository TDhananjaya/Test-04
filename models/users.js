const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({

    // need to use validations 
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    firstName: { type: String, default: "First Name" },
    email: { type: String, unique: true, required: true },
    telePhoneNumber: { type: Number },
    address:{type:String ,required:true},
    type:{type:String,default:"user"},
    createdAt: { type: Date, default: Date.now }
});


userSchema.pre("save", function(done){
    var user = this;
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hashedPassword) {
            // console.log(user.password);
            console.log(user);
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});


userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMAtch) {
        done(err, isMAtch);
    });
};

module.exports = mongoose.model("User", userSchema, "users");