"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var argon2 = require("argon2");
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
    user.findOne({ email: body.email }, function (err, obj) {
        if (obj) { // matching email is found
            argon2.verify(obj.password, body.password).then(function (correct) {
                if (correct) {
                    res.send('true'); // why can't I use return here?
                }
                else {
                    res.send('false');
                }
            });
        }
        else {
            res.send('false');
        }
    });
};
exports.createAccount = function (req, res) {
    var body = req.body;
    console.log('/api/createAccount request received');
    if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password') || !body.hasOwnProperty('birth') || !body.hasOwnProperty('country')) {
        return res.send('failure: fields missing');
    }
    if (!utils_1.isValidEmail(body.email)) {
        return res.send('failure: invalid email');
    }
    user.findOne({ email: body.email }, function (err, obj) {
        if (obj) { // duplicate exists
            return res.send('failure: email already exists');
        }
        argon2.hash(body.password).then(function (hash) {
            user.create({ email: body.email, password: hash, birth: body.birth, country: body.country }, function (err, user) {
                if (err) {
                    return res.send('failure: an error occured');
                }
                return res.status(200).send('success');
            });
        });
    });
};
exports.usersList = function (req, res) {
    console.log('/api/usersList request received');
    user.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (usr) {
            userMap[usr._id] = usr;
        });
        res.send(userMap);
    });
};
exports.dropCollection = function (req, res) {
    console.log('/api/dropCollection request received');
    user.remove({}, function (err) {
        console.log('collection removed');
    });
    res.send('success');
};
