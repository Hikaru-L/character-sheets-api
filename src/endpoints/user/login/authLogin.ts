import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

export const authLoginEndpoint = (req: Request, res: Response) => {
  const username = req.body.username
  const password = req.body.password
  const secretToken = process.env.JWT_SECRET_TOKEN
}