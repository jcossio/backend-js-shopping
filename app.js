/**
 * Main application file
 */

const morgan = require('morgan');

const express = require('express');
const http = require('http');

const { ApolloServer, gql } = require('apollo-server');
const Product = require('./api/product/product.model');

const mongoose = require('mongoose');
const expressConfig = require('./config/express');
const routeConfig = require('./routes');
const config = require('./config/environment');

const schema = require('./graphql');


// Graphql necesita un esquema para poder lanzar un servidor. Entonces le pasamos typedefs
// Y deberia tener un resolver tambien.
// Aqui tambien se puede especificar un formato de error con:
// formatError: (err)
const graphqlServer = new ApolloServer({
   schema,
   dataSources: () => {
     Product,
   },
   });

// Connect to MongoDB
mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on('error', (err) => {
  console.error('Error', 'MongoDB connection error', {
    data: err,
    time: new Date().toISOString(),
  });
  process.exit(-1);
});

// Setup server
const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
expressConfig(app);
routeConfig(app);

// Start server
function startServer() {
  app.shoppingCartBK = server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
  });

  // Iniciar el servidor de graphql por defecto en el puerto 4000
  // En esta url graphql nos da un playground.
  // Aunque postman ya lo soporta
  graphqlServer.listen().then(( { url }) => console.log(`Server running at ${url}`));
  // Ya en el playground podemos dar (query o mutacion):
  // query {
  //  hello
  // }
  // Y responde:
  // {
  // "data": {
  //  "hello": "Hola MedellinJS"
  //         }
  // }
}

setImmediate(startServer);

// Expose app
module.exports = app;
