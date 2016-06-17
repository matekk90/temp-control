'use strict';

var express = require('express');
var controller = require('./sensor.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/measures', controller.measure);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
