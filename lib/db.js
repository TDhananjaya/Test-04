const mongoose = require("mongoose");

module.exports.connect = (url, cb) => {
    cb = cb || function (err) {
        if (err) {
            console.error("database connection faliure: \n" + err.stack);
            process.exit(1);
        }
    };
    mongoose.connect(url, { useNewUrlParser: true }, cb);
}
