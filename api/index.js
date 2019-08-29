// import micro, { send } from 'micro'
import Microstate, { create, valueOf, from, map } from 'microstates'


const Router = require('micro-http-router')
//
// // Initialize the router
const router = new Router();

// import Route from './Routes'

// Define a basic GET request with a middleware function
// router.route({
//     path: '/',
//     method: 'GET',
//     before: (req, res) => {
//         // req.user = {};
//         // req.user.name = 'John Doe';
//     },
//     handler: (req, res) => {
//         return `I am index`;
//     }
// });

// Express-like routing helpers
// router.get('/', (req, res) => {
//     return 'Hello, world';
// });

// Async body parsing
// router.post('/', async (req, res) => {
//     const body = await micro.json(req);
//     return body;
// });

// Any number of route parameters are supported
// Access via the req.params array
// router.get('/:first/:second', (req, res) => {
//     const first = req.params.first;
//     const second = req.params.second;
//     return `Your first parameter is ${ first } and your second is ${ second }.`;
// });

// Start micro and listen
// const server = micro((req, res) => router.handle(req, res));
// const port = 3000;
// server.listen(port);
// console.log(`micro is listening on port: ${ port }`);



// export default async (req, res) => {
//   try {
//   await router.route({
//     path: '/',
//     method: 'GET',
//     before: (req, res) => {
//       // req.user = {};
//       // req.user.name = 'John Doe';
//     },
//     handler: async (req, res) => {
//       let CODE = create(Number, 500)
//       let RES_BODY = create(Object, {})
//
//       let resStatus
//       resStatus = CODE
//
//     let onSuccess = {
//       keyOne: 'String value of seccess response body'
//     }
//     let onError = {
//       code: CODE.state,
//       name:'Internal Server Error',
//       message: 'Server failed to resolve from error'
//     }
//
//     resStatus = CODE.set(200)
//
//         if(resStatus.state !== 500) {
//           res.status(resStatus.state)
//           res.json(valueOf(RES_BODY.assign(onSuccess)))
//         }
//         else {
//           res.status(resStatus.state)
//           res.json(valueOf(RES_BODY.assign(onError)))
//         }
//        }
//   })
//
//
//   await router.handle(req, res)
//
//
// } catch(err) {
//   console.error(err)
//   throw err
// }
// }


//
// async function RouterHandler(router, request, res) {
//   constructor() {
//
//   }
//   // router.route({
//   //     path: '/',
//   //     method: 'GET',
//   //     before: (req, res) => {
//   //         // req.user = {};
//   //         // req.user.name = 'John Doe';
//   //     },
//   //     handler: (req, res) => {
//   //         return `I am index`;
//   //     }
//   // })
//
//
// }


router.route({
    path: '/',
    method: 'GET',
    before: (req, res) => {
        // req.user = {};
        // req.user.name = 'John Doe';
    },
    handler: (req, res) => {
        res.status(200)
        res.json({})
    }
})

export default (req, res) => router.handle(req, res)
