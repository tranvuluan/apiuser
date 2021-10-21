const express = require('express');
const router = express.Router(); 
const services = require('../services/render');
const controller = require('../controller/controller');
/**
 * @decription Root Route
 * @method GET
 */

router.get('/', services.homeRoutes);


/**
 * @decription User Add
 * @method GET
 */
router.get('/add-user', services.addUserRouter);


/**
 * @decription User Update
 * @method GET
 */
router.get('/update-user', services.updateUserRouter);


// API
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);


module.exports = router;