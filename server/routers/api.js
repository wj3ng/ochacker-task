"use strict";
exports.__esModule = true;
var express_1 = require("express");
var account = require("../account");
exports.router = express_1.Router();
// Routes
exports.router.post('/login', account.login);
exports.router.post('/createAccount', account.createAccount);
exports.router.post('/usersList', account.usersList);
exports.router.post('/dropCollection', account.dropCollection);
