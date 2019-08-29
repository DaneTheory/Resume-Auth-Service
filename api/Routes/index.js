const micro = require('micro');
const Router = require('micro-http-router');

// Initialize the router
const router = new Router();

const Routes = async (routerInstance) => {
  try {
    console.log('Router: GET /')
    await routerInstance.route({
        path: '/',
        method: 'GET',
        before: (req, res) => {
            // req.user = {};
            // req.user.name = 'John Doe';
            console.log('before handler');

        },
        handler: (req, res) => {
          console.log('final handler');
            return `I am index`;
        }
    })
  } catch(err)  {
    console.error(err)
    throw err
  }
}
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

export default Routes(router)
