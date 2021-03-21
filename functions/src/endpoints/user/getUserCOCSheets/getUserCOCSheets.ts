import {Request, Response} from 'express'
import { getUserFromToken } from '../../../utils/getUserFromToken/getUserFromToken.js'

export const getUserCOCSheets = async (req: Request, res: Response) => {
  const auth = req.headers.token as string
  const user = await getUserFromToken(auth)
  if(!user) {
    res.status(401)
    res.send('User not found, please login')
    return
  }
  res.send({sheets: user.COCInvestigatorIds})
}