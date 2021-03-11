import {Request, Response} from 'express'
import {firestore} from 'firebase-admin'
import { User } from '../../../models/users/User'
import { generateUserToken } from '../../../utils/generateUserToken'
import { env } from '../../../../globalVariables'

export const authSignupEndpoint = async (req: Request, res: Response) => {
  const username = req.body.username
  const password = req.body.password
  const secretToken = env.JWT_SECRET_TOKEN

  const database = firestore()
  const userDocumentRef = database.collection('users').doc(username)

  await userDocumentRef.set({
    username,
    password,
    COCInvestigatorIds: [],
    secretToken: generateUserToken(username, '1800')
  } as User)

  res.send('User created sucessfully!')
}