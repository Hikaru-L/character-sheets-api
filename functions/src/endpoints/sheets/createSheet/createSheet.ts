import {Request, Response} from 'express'
import { CallOfCthulhuInvestigator } from '../../../models/characterSheets/CallOfCthulhuInvestigator.js'
import { getUserFromToken } from '../../../utils/getUserFromToken/getUserFromToken.js'
import { firestore } from 'firebase-admin'

export const createSheetEndpoint = async (req: Request, res: Response) => {
  const auth = req.headers.token as string
  const user = await getUserFromToken(auth)
  if(!user) {
    res.status(401)
    res.send('User not found, please login')
    return
  }
  const database = firestore();
  const newSheet = req.body as CallOfCthulhuInvestigator
  await database.collection('COCSheets').doc(newSheet.id).set(newSheet);
  user.COCInvestigatorIds.push({id: newSheet.id, name: newSheet.info.name })
  await database.collection('users').doc(user.username).set(user);
  res.send('Character successfully created!')
}