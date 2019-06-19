/**
 * Main application routes
 */

// Import Endpoints
const helloWorld = require('./api/helloWorld');
const product = require('./api/product');

module.exports = (app) => {

  // Insert routes below
  app.use('/api/helloworld', helloWorld);
  app.use('/api/products', product);
  // Next routes
  // Endpoints in plural
  // app.use('/api/users', user);

  //// OJOOOO mirar cloudinary!!!!

};
