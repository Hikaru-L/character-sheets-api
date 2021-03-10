"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginEndpoint = void 0;
var authLoginEndpoint = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var secretToken = process.env.JWT_SECRET_TOKEN;
};
exports.authLoginEndpoint = authLoginEndpoint;
