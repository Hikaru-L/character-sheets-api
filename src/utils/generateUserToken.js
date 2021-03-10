"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateUserToken = function (username, expiretime) {
    return jsonwebtoken_1.default.sign(username, process.env.JWT_SECRET_TOKEN);
};
exports.generateUserToken = generateUserToken;
