import { send, json, createError } from 'micro'
import health from 'micro-health'
import fetch from 'node-fetch'

import * as pkg from '../../package.json'


const InternalAppPublicInfoContext = async () => {
  const { config } = pkg

  return {
    id: config.id,
    identity: config.identity,
    version: config.version,

  }
}


const InternalHealthMetrics = async (req, res) => {
  //
  // ===================================
  //    INTERNAL HEALTH ROUTE SCOPE
  //    ---------------------------
  //    - Route Info:
  //       * PATH
  //         - /internal-status
  //
  //       * METHODS
  //         - [ GET ] Will return most scoped data within route since mostly constructed programtically.
  //         - [ PUT ] For one-off updates to fields when needed: App Version, Timestamp
  //
  //       Notes:
  //          - Add Total Cache available to Service on instantiation? Likewise, include current cache used?
  //          - Along with available Routes, include Morgan logged data for the req/res use of each?
  //          - Include creationDate, original date, of MVP of this route as workable
  //          - Include lastUpdateDate, date of last change to "state" of this route (i.e. PUT req update) ** Should Log This Action **
  //          - Include counter alongside Uptime for TimeSinceLastUpdate (ms)
  //              - Then, follow up with difference between Uptime and TimeSinceLastUpdate as AutomatedManagementTotalTime (round to nearest minute)
  // ================================================================================================================================================
  //
  // * Variables List
  // --------------------
  // App Identity +, $
  // App version +, $
  // App Unique ID (Internal) +, $
  // Timestamp (for Health Check... Do for WS?) +, $
  // App Current NODE ENVIRONMENT Runtime +, $
  // App Hostname +
  // App Internal IP +
  // App External IP +
  // App protocol (http/https, ws/wss... based on NODE_ENV I guess) +
  // App port (fuck....) +
  // App Aliases +
  // App Uptime (ms) +, $
  // App Memory/Heap Usage (**Health Check Contributor**) $
  // Routes (Methods, Routes with params,, * with querys?, Error Routes? Health? Index?) +
  // Ping speed of Internal Routes Average (**Health Check Contributor**) $
  // Ping speed of remote URL (**Health Check Contributor**) $
  // AutoCannon Quick Test Results (doable?)
  //
  //
  //
  //
  //
  // 1) NOTE ONE: ALSO INCLUDE SOME OF THESE AS RESPONSE FOR API ROOT INDEX ROUTE (Not all. Marked with +)
  // 2) NOTE TWO: ALSO INCLUDE SOME OF THESE AS AGGREGATED ALGO WITH RESPONSE AS RETURN VALUE FOR API /pulse ROUTE
  //    (/pulse Route is an alt. option for healthiness checks, offering faster/cheaper/smaller Response Values at cost of less accuracy.
  //      - Marked with ONLY "$" means only used as return key and value pair in Response
  //      - Marked with "$" AND (**Pulse Response Contributor**) means these variables will serve as derivatives used to compile
  //        return value output of "Pulse" Route Custom Algo. As a nicety, would be excellent to serve Pulse
  //        Route as a WebSockets based instance, running it over an initial HTTP Request where, when accesseed via a seperate Service and/or
  //        Client providing the initializing request then the WebSocket handshake automagically invokes the connection event between the two
  //        successfully, and then moves on to fullfill any/all other sebsequent WebSocket event pairing. As fallback..... Pusher? Maybe Twillio?
  //        OES_standard_derivatives The final resturned value of "Pulse" Route and its Custom Algo
  //        definition looks like this:
  //
  //        { pulse: < STATUS_TYPE_DERIVED_FROM_CUSTOM_ALGO_FOR_PULSE_ROUTE > }
  //
  //        where < STATUS_TYPE_DERIVED_FROM_CUSTOM_ALGO_FOR_PULSE_ROUTE > is the return index value (< String >.toUppercase())
  //        from an Array containing Pulse Status Types. Pulse Status Types are as follows:
  //
  //    POSSIBLE PULSE RETURN VALUES:
  //      ** NOTE: Only one value will return as an active match for the Pulse key at any one time.
  //               the result being typeof String as of which has been set via the given  pre-exisitng
  //               slections available as indexed values within a predefined Array which is listed below:
  //
  //               - [ ASYSTOLE', 'HYPOXIC', 'HOMEOSTATIC', 'IDIOPATHIC', 'APOPLECTIC']
  //
  //               - Array length =  5
  //
  //               - Basic Details:
  //                  Array indexes represent a balanced scale range a Pulse Health derived Health.
  //
  //               - Example output from Algo to determine Pulse health:
  //                 (doesn't include data which will not be used in any computational manner)
  //                 ------------------------
  //          () =>  { pulse: 'HOMEOSTATIC' } >|--(then) --> *** Along with other data in Pulse Health scope, sent via ws/wss over inital HTTP handshake Request Route
  //                 ------------------------
  //
  //    - Verbose Implementation Details
  //    ---------------------------------
  //    <-- Range from beyond workable, the left most value representing a derived "Pulse" algo value comparable to Externals being dead this service,
  //        with the far right representing the opposite; meaning the internal status of this current service is experiencing issues that make working with
  //        Externals essientally a no go. The extremes on both ends of the Array if return as the out put value should programatically invoke an action/(s)
  //        to self remedy the problem. That said, a notification will be sent upon these radical return values to a User email/slack/githiub-issues/whatever
  //        If the programmitc solution fails to successfully improve the Pulse value for the check, a second notification blast to a real human will occur
  //        again prompting a manual fix. This process will work for now until I think of something a bit more clever. The second value to the left and
  //        the fopurth value to the right indicate the Pulse value is heading into problematic terrirtory. The same safeguard steps previously mentioned
  //        will also be in place here, perhaps with better logged data avaialable to improve said safeguard before everything is on fire and logs or
  //        help of any kind my not be immediately available. These systems of redundancy can grow organically with a bit of experimentation and imagination, at
  //        least enough where any red zoned, nuclear values being returned will get stopped far before they have a chance to occur. The third value in the Array
  //        represents a derived Pulse value where everything is copecetic.
  //        ADITIONAL DETAILS: The idea for switching to using a balancing scale model to check against Application Internal/External Hybrid health/livliness/status
  //        , rather than using the previous scale of lowest numerical value derived from that algo to highest as return value for denoting Health status on that Route
  //        came about taking into consideration a few special implentaions features only this health check route (Pulse) will have. Since it's using External and Internal
  //        checks offered within other Health routes which were individually specifically designed to handle thier respect health checks, one for Internal, the
  //        other for external. Individually, the encapsulation of Data and its relevant functionalities in which said data is derived are logical sets in which
  //        as a single unit, crafting an algo using the given data works to serve the single source or responsibility those helath check routes were made to do.
  //        Deriving relevamnce from the aggregate vars to each owns route "scope" becomes much simpler in the final Algo by which the output response values are
  //        ultimately defined. Thus, a basic scoring from low to high doesn't require much reduncdancy in self checks to verify any particular part within the scope
  //        of the respective endpoint, because the variables and tools used to craft the resulting data never existed anywhere else but within that same Route instance
  //        always and forever. Also, The other health routes ulimately offer much more data (verbosity and the computational work to produce retured values and such)
  //        So with that understood, these Routes will rarely be accessed directly by any one User on purpose, not for any direct benfit I can see at least. The data
  //        (and routes) won't be locked down or wrapped in authentication route wrappers, but any need to manmually hit the endpoints directly is essentially
  //        negsated since Bunyon and/or perhaps Winston as well will programtically access these RESTFUL endpoints to build the overall data they need for thier
  //        respective output locations, be it in console/a third party Saas/ internally managed logs/ whatever. Point is, User will have passive access to Health
  //        info transparently and passively all throughout the dev experience. In ways in which compliments the UX/UI dev flow for making the Art that is API design!
  //        Pulse is different. It's cherry picked Vars from External and Internal Health Routes. The output may or may not regularly interact with application loggers,
  //        primarily because Bunyon and Winston are limited to returning log info only after a Request is started. Pulse will run over HTTP, but only initially, the connection
  //        and subsequent exchange of data between connected services will run via WebSockets, realtime and right now freshy fresh data. Always. That said, The final output
  //        of Pulse is subject to change/update on a far more frequent basis that the other health endpoints. Because of this, the algo the creates the health return output
  //        will be much lighter in the data it works with and the complexity in which to produce a relevant metrics set from. Pulse will also act as master delegator to
  //        programmtic issue resolution hadnling by requesting the aid of the other routes via one of payloads to step by step verify within req/res return values into
  //        (hopoefully) self a self healed app. Again, it will be Pulse stands the high degree of chance in recognizing issues as they arrise, and even though not as
  //        inherently compolex as its other endpoint counterparts, the Vars it will include in its Health evaluation will be key for the INTERNAL and EXTERNAL health checks
  //        to resolve their derived return output in a way that doesn't break down all endpoints at once. That's the plan Stan!'   -->
  //
  //
  //
  //
  //
  //
  //
  // As a final response value, an object containing the "Health" as determined by contributor
  // values (custom algo. nothing fancy). Output will look like:
  //
  // { health: < STATUS_TYPE_DERIVED_FROM_CUSTOM_ALGO_FOR_HEALTH_ROUTE > }
  //
  // [ 'FAILURE IMMINENT', 'VERY POOR', 'POOR', 'BELOW AVERAGE', 'AVERAGE', 'ABOVE AVERAGE', 'GOOD', 'VERY GOOD', 'EXCELLENT', 'PRISTINE' ]
  //                  <----- Range from poorest status (far left) to best status (far right) ----->
  // Array length =  10
  //
  // where < STATUS_TYPE_DERIVED_FROM_CUSTOM_ALGO_FOR_HEALTH_ROUTE > is the return index value (< String >.toUppercase())
  // from an Array containing Internal Health Status Types. Keyword is to remember for /health is "Internal". All
  // variables declared/used in this Route describe, in partial affect, the Health of the internal application as a whole.
  // ** Variables defined here that have been marked/listed/referenced for use in a seperate Route REMEMBER: **
  //
  //  - Internal Health Route variuables will be expressed within a JSON Response, BUT purposefully formatted to
  //    be as FLAT AS POSSIBLE, with MORE VERBOSE OUTPUT (More/Longer/Prominent use of Strings as typeof for value of key:value pair
  //    in JSON Response. So, again, VERBOSE BUT FLAT AS FUCK for Internal Health Vars if and when their output/return value is
  //    represented within this the Internal Health Ruote /health.
  //
  //  - If represented elsewhere, the practice will be to still ALWAYS RETURN EVERY RESPONSE ERROR/SUCCESS/DRAGON-SLAYER/WHATEVER AS valid JSON with
  //    a pre-validated Schema of it's intended compositional structure upon any action, be it reactionary as response or preactionary in a request and all the other words
  //    needed to sum up req/res be happenin' all over the palce bruh. Make sure the JSON objects internal composition is vetted for its successful validated output value/(s)
  //    (Successful validated success res/reqs and successfully validated Error types [aka, System Errors such as UnhandlehedRejection, Pending.Promise, return value is Undefined, etc. => SYSTEM ERRORS >= 500 statusCode;
  //    API Errors are different in that they are predefined actions in oposition to the unfettered path of a UX/UI. Examples of these include Invalid credentials provided on login, A requested page/resource wasn't found,
  //    a User account contains an insufficient permissions level (not deteremined by User, Programtic, natural adoption within application so as to not offset/disrupt inteded UX/UI, or User with elevated permissions manually
  //    edits a lower level credientialed Users permissions, altering them to the point of matching his/her own [if so dictated by the overall Permissionas Policies and their subsequent internal groups]) in his/her ability to]).
  //    return these and ALL Response Values as Validated JSON Objects [aka has valid schema of key labels and valid values as return
  //    type/typeof/patternRuleSet/etc. as determined by a Precomposed Function acting as Schema Validator that wraps the Route Response Object
  //    and ensures return values to be consistent/testable/fault tolerant/secure/etc. in their actual output. Unexpected/Unintended/
  //    sideeffects upon return output value discovery, or even reasonably predicatable buggy/malformed/timeOuted/ratelimited/etc. return values,
  //    as well ass EXPECTED Errors (specific to API and/or Systyem failing/failings chain (internal and/or perhaps even cross-service
  //    via tracking/stalking the corealation ID Header (but how to append extra data? Response output value from Service1 is put into
  //    Request Body and sent along with the corealation ID set the next intended service, so here Service2. This assumes allows the service chain to continue
  //    The more likely scenario is throwing the Error as a formatted JSON returned value with statusCode/code < 400[Number/Int], relevant error message
  //    type/name/kind/whatever[String, First Letter of each word (character after "SPACE") is toUppercase() with the remaing letters remaining lowercaser
  //    (Or forced in a final normilization/sanitaztion function that acts as final boundery before Schema Validation to ensure this behavior. Also, this feild is all about Breifivty in content),
  //    The more, but not much bigger, verbose output about the Error (IF ANY. NOT REQUIRED NECESSARILY) will be found in the third key of "message"[String, with first word
  //    of each sentence (first character after "PERIOD char" follwed by "SPACE char")] is toUppercase() with each sentence (no more than 2-3 tersely, short sentences) ended with a "Period"
  //    Normalizer/Sanitizer Func for that behavior? Meh.... Could make an Enum and perseve this desired behavior with tests for the Enum to pass before use in the wild... think on this.....
  //    Lastly, depending on the Error type (more than likely this will just stick with System related Errors) will be a key of "data" whose value is an Object composed of the keys/values
  //    of the actually Error that was experienced. Data Object reasonable to assume will have keys of name, message, stack (stack trace) as most normal behaving JS Errors follow this shape.
  //    The key values will most certainly be strings. No need to format here, though do include an NPM module that beafens up the readability/usability/portablilty of Stack Traces [DEFINATELY PERTINENT
  //    if Responses that are Errors actively being passsed between multiple services as Response body value then appended Request body value, all only servicable/manageable with a nice fucking rock-solid
  //    corealation ID implementation (CANNOT MUTATE. EVER. IS BIRTHED OUT OF INITIAL REQUEST. DIES ON FINAL RESPONSE OFREQUEST CHAIN, LIVING ONLY IN LOGS (Perhaps...Logzio, BugSnag, Snyk (in that order) are nice looking logging Saas's)
  //    Internal logging tooling provided:
  //     - 1) Bunyan (Verbose Logging Output which includes data representative of application state (aka APP_IDENTITY, APP_VERSION, OS HOSTANE, TLS/SSL enabled/disabled, etc. Logged Output on Routes where upon the action of requesting
  //          via a specific METHOD/or Request METHOD/(s) of active Route is/are present in CORS configured, allowed/accepted/whitelisted Route Request METHODS, results in the state of the Application updating in a relevant manner of
  //          significance, typically on an action where the new state is one where the action, or return value of said action, that led to that state change should be logged. Includes Application System lifecycle hook return values,
  //          Allocated/used cache and/or the injected pre-determined logic into new cache to implicitly ensure expiry after an anticipated time, that stuff. Perhaps also include per route request/response hit count with Bunyan as well?.....
  //          Last one might be better in option number #2 which is....
  //     - 2) Winston (Request/Response metrics logger. On each individual req and/or res produced throughout the HTTP Method Requests lifecycle, be it dying in a burning error message fire output, or beautiful, asynchronously returned
  //          in its expected destination, properly formatted, sanitized/normalized data on Response EVEN if the Response is the aggregate value of multiple reqs/responses made as a chain from the start leading to the ultimate returned Response.
  //          Output is VERY brief, especially compared tio Bunyan. Essentially all it is composed of is per Request/Response made, the HTTP METHOD/(S), total timing between req/res singularities and the chained-timing of all req/res made in any
  //         single HTTP Request METHOD/(s) [i.e total time from start to finish with all the starts and finsihes in between that build that final result. Output should be in ms.... don't wanna have anything peaking that 2-3 zone for API requests.
  //         ESPECIALLY IN PRODUCTION!!!!!!]
  //    The physically logged value (system cache permitting on the damned Serverless immutable wizardry setups with mutatable FileSystem states... over thinking... If anything, the pertinent logs for each logger (aka TRANSPORT or Transport type) instance
  //    if not logged in a managanle way thats simple enough to setup in Serverless Nowhere land (expected write intervals, job ques to parse archived logs in traversable fashion, log rotatation, etc.) will be piped into a request contianing said logger
  //    instance data and sent to the Logging Saas (or perhaps Saas's as in plural) of my to-be-determined choosing. This would make shit much easier to maintain. Massive Pro. Con, Higher Bandwidth use/abuse on HTTP Request and Response objects = higher load
  //    on Lamdas serving Routes by which req/res Objects and values are derived and transported. (aka, the more HTTP METHOD activity you have in/out/around a server/lamda/service/whatever, the more bandwidth is recorded in application usage, results in overall
  //    higher price for Serverless provider. If not directly, then might push me into more expensive tier as per my usage... don't want that. NOTE: BUNYAN LOGGER and/or WINSTON LOGGER needs to somehow programtically track/log relevant serverless hosting usage,
  //    as EXTERNAL Health check Variable in that Route. (WIll most certainly be passed to additional health endpoints, ie Pulse for use as Var yielding effect on overall Pulse output value from custom metrics Algo. Maybe even more...) and then begin programatic implementation
  //    of needed Ratelimit averages on high use heavy resource intensive Routes; Resulting overall averages permeate to stay under pricing tier for Bandwidth use... CHECK ZEIT NOW DEPLOYMENT API. PRETTY SURE THIS IS THERE.)
  //
  //    One last note on logs/logging, if/when output is made to the console (preferable locked into occuring only in gross abuse within "development" Environments, mild abuse in "testing" and "CI", but DO NOTE to disable this output within all the Applications internal active
  //    logical occurances via function/methods/actions AFTER runtime in "production", Deployment logging/interaction via the console will still be somewhat utilized in "production", that part mostly falling on Zeit's Building Lamdas and returned output via there production transpoorts.
  //    Keep this in mind for including ion logs for production.
  //    Do I need to check/define $PORT Env Var definitions for Env's other than "development", where the port is assumedly NOT ephemeral in it's implementation.
  //      - NOTE: Check out grabbing Ephemeral Env Vars in programmtic way before instantiation, perhaps in application lifecycle hook somehow/somewhere... then use these derived values to support conditional logic for Application internals/external tooling and services, etc. SENDS TO LOGS?)
  //    Internal Health Status Types are as follows:
  //
  //
  //
  //


}

const ExternalHealthMetrics = async () => {
  console.log('EXTERNAL HEALTH CHECKS')

  console.log('Check if database pool connection is full')
  console.log('Check if there is still space on filesystem')
  console.log('Check if external APIs are working')

  // const response = await fetch('https://api.example.com');
	// const json = await response.json();
	// return json

  let results = { metrics: 'some external metrics'}
  return await results
}


const microFn = (req, res) => {
  try {
    let handler = InternalHealthMetrics(req, res)
    send(res, 200, handler)
  } catch(err) {
    throw createError(500, 'Internal Server Error', { orig: err } )
  }
}


const errorChecker = () => {
  try {
    let handler = ExternalHealthMetrics()
    return handler
  } catch(err) {
    throw createError(500, 'External Health Checks Error', { orig: err } )
  }
}
module.exports = health(microFn, errorChecker)
