import express from "express";
import { createSheetEndpoint } from "../functions/src/endpoints/sheets/createSheet/createSheet";
import bodyParser from "body-parser";
import cors from "cors";
import { getSheetEndpoint } from "../functions/src/endpoints/sheets/getSheet/getSheet";
import { editSheetEndpoint } from "../functions/src/endpoints/sheets/editSheet/editSheet";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../functions/firebase-admin-sdk.json";
import { config } from "dotenv";
import { authSignupEndpoint } from "../functions/src/endpoints/user/signup/authSignup";

//express instance
const app: express.Application = express();

//load environment variables
config();

// firebase
admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
});

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

//não sei direito como isso funciona
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//call of cthulhu endpoints
app.post("/cthulhu/sheet/create", cors(), createSheetEndpoint);
app.get("/cthulhu/sheet/get", cors(), getSheetEndpoint);
app.put("/cthulhu/sheet/edit", cors(), editSheetEndpoint);

//auth endpoints
app.post("/auth/signup", cors(), authSignupEndpoint);

//escolher aqui qual porta usar
app.listen(3001, () => {
  console.log("App is listening on port 3001!");
});
