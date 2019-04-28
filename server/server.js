"use strict";
exports.__esModule = true;
// Imports
var express = require("express");
var bodyParser = require("body-parser");
var account = require("./account");
var app = express();
app.use(bodyParser.json());
var port = 8080;
// Routes
app.post('/api/login', account.login);
app.post('/api/createAccount', account.createAccount);
app.post('/api/usersList', account.usersList);
app.post('/api/dropCollection', account.dropCollection);
// Listen
app.listen(port, function () {
    console.log("Listening on port " + port);
});
