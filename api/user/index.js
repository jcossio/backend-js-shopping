/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');
const controller = require('./user.controller');
const auth = require('./../../auth/auth.service');

const router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/me', auth.isAuthenticated(), controller.showme);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.delete('/:id', auth.isAuthenticated() && auth.hasRole('admin'), controller.remove);
module.exports = router;
