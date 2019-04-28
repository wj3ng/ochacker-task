"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//app.post('/api/usersList', (req, res) => {
//user.find({}, (err, users) => {
//let userMap = {};
//users.forEach((usr) => {
//userMap[usr._id] = usr;
//});
//res.send(userMap);  
//});
//});
//app.post('/api/dropCollection', (req, res) => {
//user.remove({}, (err) => { 
//console.log('collection removed');
//});
//res.send('success');
//});
// Listen
app.listen(port, function () {
    console.log("Listening on port " + port);
});
