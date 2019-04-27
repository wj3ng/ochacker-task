"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var utils_1 = require("./utils");
// MongoDB 
mongoose.connect('mongodb://localhost:mongodb/test', { useNewUrlParser: true });
var userSchema = mongoose.Schema({
    email: String,
    password: String,
    birth: Date,
    country: String
});
var user = mongoose.model('user', userSchema);
exports.login = function (req, res) {
    var body = req.body;
    console.log('/api/login request received');
    if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password')) {
        return res.send('false');
    }
    user.findOne({ email: body.email, password: body.password }, function (err, obj) {
        if (obj) {
            return res.send('true');
        }
        return res.send('false');
    });
};
exports.createAccount = function (req, res) {
    var body = req.body;
    console.log('/api/createAccount request received');
    if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password') || !body.hasOwnProperty('birth') || !body.hasOwnProperty('country')) {
        return res.send('failure');
    }
    if (!utils_1.isValidEmail(body.email)) {
        return res.send('failure');
    }
    user.findOne({ email: body.email }, function (err, obj) {
        if (obj) { // duplicate exists
            return res.send('failure');
        }
        user.create({ email: body.email, password: body.password, birth: body.birth, country: body.country }, function (err, user) {
            if (err) {
                return res.send('failure');
            }
            return res.status(200).send('success');
        });
    });
};
