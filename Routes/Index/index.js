import { send, json } from 'micro'
import health from 'micro-health'
import fetch from 'node-fetch'



const InternalHealthMetrics = async () => {
  // console.log(req)
  // console.log('')
  // console.log(res)


  let results = {metrics: 'some INTERNAL metrics' }
  return await results
}

const ExternalHealthMetrics = async () => {
  console.log('Check if database pool connection is full')
  console.log('Check if there is still space on filesystem')
  console.log('Check if external APIs are working')

  // const response = await fetch('https://api.example.com');
	// const json = await response.json();
	// return json

  let results = { metrics: 'some external metrics'}
  return await results
}


const microFn = async (req, res) => {
  try {
    let handler = await InternalHealthMetrics()
    await send(res, 200, handler)
  } catch(err) {
    throw createError(500, 'Internal Server Error', { orig: err } )
  }
}

const errorChecker = async () => {
  try {
    let handler = await ExternalHealthMetrics()
    await send(res, 200, handler)
  } catch(err) {
    throw createError(500, 'External Health Checks Error', { orig: err } )
  }
}

module.exports = health(microFn, errorChecker)
