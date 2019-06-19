/**
 * Product
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');

const controller = require('./product.controller');
const auth = require('./../../auth/auth.service');

const router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.put);
router.delete('/:id', auth.isAuthenticated(), controller.remove);

module.exports = router;
