import jwt from 'jsonwebtoken'

export const generateUserToken = (username: string, expiretime: string) => {
  return jwt.sign(username, process.env.JWT_SECRET_TOKEN as string);
}