var errors = require('restify-errors');
var logger = require('../config/logger');
var successHandler = require('../responseHandlers/successHandler');
var Car = require('../models/car');
const FILE_NAME = 'carService';

exports.getAllCars = function (req, res, next) {
    var FUNCTION_NAME = 'getAllCars';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    if (req.user) {

        Car.find({}, function(err, cars) {
            if(err){
                logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, err);
                return next(new errors.InternalServerError('Some Internal Server error occurred.'));
            }else{
                res.json(new successHandler(cars));
            }
        });
    } else {
        return next(new errors.UnauthorizedError('Not Authorized to access this.'));
    }

};

exports.saveCar = function (req, res, next) {
    var FUNCTION_NAME = 'saveCar';

    var name = req.body.name;
    var model =  req.body.model;
    var color = req.body.color;

    if(!name){
        logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME+' Car name is mandatory.');
        return next(new errors.BadRequestError('Car name is mandatory.'));
    }
    if(!model){
        logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME+' Car model is mandatory.');
        return next(new errors.BadRequestError('Car model is mandatory.'));
    }
    if(!color){
        logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME+' Car color is mandatory.');
        return next(new errors.BadRequestError('Car color is mandatory.'));
    }

    var car = new Car({
        name : name,
        model : model,
        color : color
    });

    car.save(function (err, data) {
        if(err){
            logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, err);
            return next(new errors.InternalServerError('Some Internal Server error occurred.'));
        }else{
            logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, data);
            res.json(new successHandler(data));
        }
    });

};
