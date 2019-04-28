"use strict";
exports.__esModule = true;
// Imports
var express = require("express");
var bodyParser = require("body-parser");
var api_1 = require("./routers/api");
var app = express();
app.use(bodyParser.json());
var port = 8080;
app.use('/api', api_1.router);
// Listen
app.listen(port, function () {
    console.log("Listening on port " + port);
});
