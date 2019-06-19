/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products           ->  index
 * GET     /api/products/:id       ->  show
 * POST    /api/products           ->  create
 */

const Product = require('./product.model');

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity); // JSONify
    }
  };
}

function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, code) {
  const statusCode = code || 500;
  return (err) => {
    res.status(statusCode).send(err);
  };
}

// Gets a list of products
function index(req, res) {
  return Product.find().exec() // Find() trae todos los products
    .then(respondWithResult(res)) // Esto es una promesa que devuelve el response
    .catch(handleError(res)); // responda con un error
}

// Create product
function create(req, res) {
  // Usar el body del POST para crear
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Gets a single product from the DB
function show(req, res) {
  // Unos de los metodos Busqueda
  // Tarea revisar los demas metodos
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res)) // Check if nothing found by Product.findById and placed on res
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function put(req, res) {
  // console.log(req.body);
  return Product.findByIdAndUpdate(req.params.id, req.body).exec()
    .then(handleEntityNotFound(res)) // Check nothing found by Product.findByIdAndUpdate
    .then(show(req, res)) // call show method to display record updated contents
    .catch(handleError(res));
}

function remove(req, res) {
  // One way of removing the product
  return Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) return handleError(res);
    if (!product) {
      return res.status(404).end(); // Not found then return 404
    } else {
      return res.status(200).send(); // Deleted. Return 200
    }
  });

  /* Second way of removing the product
  // Find by Id
  return Product.findById(req.params.id, (err, product) => {
    if (err) return handleError(res);
    // Check if found
    if (product == null) {
      return res.status(404).end();
    }
    // Delete now
    Product.findByIdAndDelete(req.params.id).exec()
      .then(res.status(200).end())
      .catch(handleError(res));
    return null;
  });
  */
}

module.exports = {
  create,
  show,
  index,
  put,
  remove,
};
