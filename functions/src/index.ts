import * as functions from 'firebase-functions';
import express from 'express'
import cors from 'cors'
import {createSheetEndpoint} from './endpoints/sheets/createSheet/createSheet'
import {editSheetEndpoint} from './endpoints/sheets/editSheet/editSheet'
import {getSheetEndpoint} from './endpoints/sheets/getSheet/getSheet'
import {authSignupEndpoint} from './endpoints/user/signup/authSignup'
import bodyParser from 'body-parser';

const app = express()

//motherfucking cors
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//call of cthulhu endpoints
app.post("/cthulhu/sheet/create", cors(), createSheetEndpoint);
app.get("/cthulhu/sheet/get", cors(), getSheetEndpoint);
app.put("/cthulhu/sheet/edit", cors(), editSheetEndpoint);

//auth endpoints
app.post('/auth/signup', cors(), authSignupEndpoint)

exports.app = functions.https.onRequest(app);