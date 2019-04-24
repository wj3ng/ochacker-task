"use strict";
exports.__esModule = true;
// Imports
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = express_1["default"]();
var port = 8080;
// Functions 
var isValidEmail = function (iStr) { return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(iStr); };
// MongoDB 
mongoose_1["default"].connect('mongodb://localhost:mongodb', { useNewUrlParser: true });
var userSchema = mongoose_1["default"].Schema({
    email: String,
    password: String,
    birth: Date,
    country: String
});
var user = mongoose_1["default"].model('user', userSchema);
// Routes
app.post('/api/login', function (req, res) {
    var body = req.body;
    if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password')) {
        return res.send('false');
    }
    user.findOne({ email: body.email, password: body.password }, function (err, obj) {
        if (obj) {
            return res.send('true');
        }
        return res.send('false');
    });
});
app.post('/api/createAccount', function (req, res) {
    var body = req.body;
    if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password') || !body.hasOwnProperty('birth') || !body.hasOwnProperty('country')) {
        return res.send('failure');
    }
    if (isValidEmail(body.email)) {
        return res.send('failure');
    }
    user.create({ email: body.email, password: body.password, birth: body.birth, country: body.country }, function (err, user) {
        if (err) {
            return res.send('failure');
        }
        return res.status(200).send('success');
    });
});
// Listen
app.listen(port, function () {
    console.log("Listening on port " + port);
});
