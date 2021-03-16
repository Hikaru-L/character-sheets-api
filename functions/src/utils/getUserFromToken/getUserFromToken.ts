import jwt from 'jsonwebtoken'
import { env } from '../../../globalVariables';
import { firestore } from "firebase-admin";
import { User } from '../../models/users/User';

export const getUserFromToken = async (token: string) => {
  const username = jwt.verify(token, env.JWT_SECRET_TOKEN as string) as string;
  const database = firestore();
  const userDocumentRef = database.collection("users").doc(username);
  const dbUser = await userDocumentRef.get();
  if (dbUser.exists) {
    return dbUser.data() as User
  } else {
    return undefined
  }
}