import { send } from 'micro'

import Controller from './Controller'


export default async (req, res) => {
  try {
    let handler = await Controller(req, res)
    await send(res, 200, handler)
  } catch(err) {
    console.error(err)
    return err
  }
}
