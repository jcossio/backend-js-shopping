/**
 * Main application routes
 */

// Import Endpoints
const helloWorld = require('./api/helloworld');

module.exports = (app) => {

  // Insert routes below
  app.use('/api/helloworld', helloWorld);

  // Next routes
  // Endpoints in plural
  // app.use('/api/users', user);
  // app.use('/api/products', product);
};
