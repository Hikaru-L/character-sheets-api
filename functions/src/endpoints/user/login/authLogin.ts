import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import { env } from "../../../../globalVariables";

export const authLoginEndpoint = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const secretToken = env.JWT_SECRET_TOKEN;

  const database = firestore();
  const userDocumentRef = database.collection("users").doc(username);
  const dbUser = await userDocumentRef.get();
  if (dbUser.exists) {
    if (password === dbUser.data()?.password) {
      res.send({ authorizationToken: dbUser.data()?.secretToken });
    } else {
      res.status(403);
      res.send("Incorrect password, please try again");
    }
  } else {
    res.status(404);
    res.send("User not found");
  }
};
