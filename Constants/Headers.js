import date from 'date-and-time'
import fetch from 'node-fetch'


const now = new Date()
const meta = new Map()

resMeta.set('Content-Type', 'application/json')
resMeta.set('Date', date.format(now, 'ddd, DD MMM YYYY hh:mm:ss GMT', true))
resMeta.set('X-Content-Type-Options', 'nosniff')
resMeta.set('X-Xss-Protection', '1; mode=block')
resMeta.set('Strict-Transport-Security', 'max-age=31536000')
resMeta.set('Vary', 'Accept-Encoding')
resMeta.set('Content-Encoding', 'gzip')
resMeta.set('X-Frame-Options', 'DENY')
resMeta.set('Content-Security-Policy', 'default-src self danetheory.com *.danetheory.com script-src self')
resMeta.set('Content-Length', '1948')
resMeta.set('Keep-Alive', 'timeout=15, max=250')
resMeta.set('Connection', 'Keep-Alive')

reqHeaders.set('Accept', 'application/json')
reqHeaders.set('Accept-Encoding', 'gzip, deflate, br')
reqHeaders.set('Accept-Language', 'en-US,en;q=0.9')
reqHeaders.set('Cache-Control', 'max-age=0')
reqHeaders.set('Connection', 'keep-alive')
// reqHeaders.set('Cookie', '')
reqHeaders.set('DNT', '1')
reqHeaders.set('Host', 'auth-service.danetheory.com')
reqHeaders.set('Sec-Fetch-Mode', 'navigate')
reqHeaders.set('Sec-Fetch-Site', 'none')
reqHeaders.set('Sec-Fetch-User', '?1')
reqHeaders.set('Upgrade-Insecure-Requests', '1')
// reqHeaders.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36')

const resHeaders = new Headers(resMeta)
const reqHeaders = new Headers(reqMeta)


export default {
  resHeaders,
  reqHeaders
}
