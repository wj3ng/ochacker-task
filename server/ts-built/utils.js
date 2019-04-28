"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = function (iStr) { return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(iStr); };
