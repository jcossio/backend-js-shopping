/**
 * Main application routes
 */

// Import Endpoints
const helloWorld = require('./api/helloworld');
const product = require('./api/product');
const user = require('./api/user');
const auth = require('./auth');

module.exports = (app) => {
  // Insert routes below
  app.use('/api/helloworld', helloWorld);
  app.use('/api/products', product);
  app.use('/api/users', user);
  app.use('/auth', auth);
  // OJOOOO mirar cloudinary!!!!
};
