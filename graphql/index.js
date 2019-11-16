// Esto lo que nos va a permitir unir todos los modelos que tengamos
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const productSchema = require('./product/schema');
const productResolver = require('./product/resolver');

// Se crea un arreglo con todo lo anterior
const typeRefs = [productSchema];
const resolvers = [productResolver];

// Se necesita lodash para el resolver
// npm i lodash.merge

const schema = makeExecutableSchema ( {typeDefs, resolvers});

module export = schema;
