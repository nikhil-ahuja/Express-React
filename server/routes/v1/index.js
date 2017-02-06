'use strict';

const express = require('express');
const router = express.Router();
const routes = require('../../utils/loaderUtil').loadModuleDirectory(__dirname);


router.use('/users', routes.userRoute);
router.use('/cars', routes.carRoute);

module.exports = router;
