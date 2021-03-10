"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var createSheet_1 = require("../src/endpoints/sheets/createSheet/createSheet");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var getSheet_1 = require("../src/endpoints/sheets/getSheet/getSheet");
var editSheet_1 = require("../src/endpoints/sheets/editSheet/editSheet");
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var firebase_admin_sdk_json_1 = __importDefault(require("../firebase-admin-sdk.json"));
var dotenv_1 = require("dotenv");
var authSignup_1 = require("../src/endpoints/user/signup/authSignup");
//express instance
var app = express_1.default();
//load environment variables
dotenv_1.config();
// firebase
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        clientEmail: firebase_admin_sdk_json_1.default.client_email,
        privateKey: firebase_admin_sdk_json_1.default.private_key,
        projectId: firebase_admin_sdk_json_1.default.project_id,
    }),
});
//motherfucking cors
app.use(cors_1.default());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//não sei direito como isso funciona
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//call of cthulhu endpoints
app.post("/cthulhu/sheet/create", cors_1.default(), createSheet_1.createSheetEndpoint);
app.get("/cthulhu/sheet/get", cors_1.default(), getSheet_1.getSheetEndpoint);
app.put("/cthulhu/sheet/edit", cors_1.default(), editSheet_1.editSheetEndpoint);
//auth endpoints
app.post('/auth/signup', cors_1.default(), authSignup_1.authSignupEndpoint);
//escolher aqui qual porta usar
app.listen(3001, function () {
    console.log("App is listening on port 3001!");
});
