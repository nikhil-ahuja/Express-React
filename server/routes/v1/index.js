'use strict';

const express = require('express');
const router = express.Router();
const routes = require('../../utils/loaderUtil').loadModuleDirectory(__dirname);


router.use('/users', routes.userRoute);

module.exports = router;
