import jwt from 'jsonwebtoken'
import { env } from '../../globalVariables';

export const generateUserToken = (username: string, expiretime: string) => {
  return jwt.sign(username, env.JWT_SECRET_TOKEN as string);
}