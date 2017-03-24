var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var carService = require('../../services/carService');
const router = require('express').Router();

router.get('/', stormpath.getUser, carService.getAllCars);

router.post('/', bodyParser.json(), carService.saveCar);

module.exports = router;
