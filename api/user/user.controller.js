const jwt = require('jsonwebtoken');

const User = require('./user.model');
const config = require('../../config/environment');

function validationError(res, statusCode) {
  const statusCodeLocal = statusCode || 422;
  return err => res.status(statusCodeLocal).json(err);
}

function handleError(res, statusCode) {
  const statusCodeLocal = statusCode || 500;
  return err => res.status(statusCodeLocal).send(err);
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

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity); // JSONify
    }
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
}

// Gets a single product from the DB
function show(req, res) {
  // Unos de los metodos Busqueda
  return User.findById(req.params.id, '-salt -password').exec() // Do not return some fields
    .then(handleEntityNotFound(res)) // Check if nothing found by Product.findById and placed on res
    .then(respondWithResult(res))
    .catch(handleError(res));
}


function showme(req, res) {
  // Localizarme segun info obtenida del token
  // Unos de los metodos Busqueda
  return User.findById('5d0a9993a9841e04200a47cf', '-salt -password').exec() // Do not return some fields
    .then(handleEntityNotFound(res)) // Check if nothing found by Product.findById and placed on res
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res) {
  const newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';

  return newUser.save()
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        config.secrets.session,
        { expiresIn: 60 * 60 * 5 },
      );
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Eliminates a user from DB.
 *
 * @param {request} req request object
 * @param {respose} res respose object
 */
function remove(req, res) {
  // Remove the user

  // Check if the user has the admin role

  // Also need to invalidate the token + session
  return User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return handleError(res);
    if (!user) {
      return res.status(404).end(); // Not found then return 404
    } else {
      return res.status(200).send(); // Deleted. Return 200
    }
  });
}

module.exports = {
  index,
  create,
  show,
  showme,
  remove,
};
