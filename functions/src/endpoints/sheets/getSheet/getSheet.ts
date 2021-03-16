import {Request, Response} from 'express'
import fs from 'fs'
import { CallOfCthulhuInvestigator } from '../../../models/characterSheets/CallOfCthulhuInvestigator.js'
import { COCInvestigatorsDataModel } from '../../../models/data/COCInvestigatorsDataModel.js'
import { getUserFromToken } from '../../../utils/getUserFromToken/getUserFromToken.js'
import { firestore } from 'firebase-admin'

export const getSheetEndpoint = async (req: Request, res: Response) => {
  const sheetId = req.query.id as string
  const auth = req.headers.token as string
  console.log('Requested character of: ', sheetId, ' id')
  const user = await getUserFromToken(auth)
  if(!user) {
    res.status(401)
    res.send('User not found, please login')
    return
  }
  const sheetIndex = user?.COCInvestigatorIds.indexOf(sheetId)
  if(sheetIndex !== undefined && sheetIndex > -1) {
    //deu bom, retornar sheet
    const database = firestore();
    const sheetDocumentRef = database.collection("COCSheets").doc(sheetId);
    res.send((await sheetDocumentRef.get()).data())
  } else {
    res.status(404)
    res.send(`Sheet of id ${sheetId} not found for this user`)
  }  
}