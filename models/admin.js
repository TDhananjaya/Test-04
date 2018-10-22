const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const adminSchema = new Schema({

    username:{type:String,unique:true},
    password:{type:String},
    type:{type:String},
    createdAt: { type: Date, default: Date.now }
});



adminSchema.pre("save", function(done){
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


adminSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMAtch) {
        done(err, isMAtch);
    });
};

module.exports = mongoose.model("Admin", adminSchema);

