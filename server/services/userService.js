var errors = require('restify-errors');
var logger = require('../config/logger');
var successHandler = require('../responseHandlers/successHandler');
var models = require('../models');
var Promise = require("bluebird");
const FILE_NAME = 'userService';


exports.saveAccountDetails = function (req, res, next) {
    var FUNCTION_NAME = 'saveAccountDetails';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    if(!firstName){
        return next(new errors.BadRequestError('First Name cannot be empty'));
    }
    if(!lastName){
        return next(new errors.BadRequestError('Last Name cannot be empty'));
    }
    if(!email){
        return next(new errors.BadRequestError('Email cannot be empty'));
    }
    if(!password){
        return next(new errors.BadRequestError('Password cannot be empty'));
    }

    var data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    models.User.create(data).then((response) => {
        logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, response);
        res.json(new successHandler(response));
    }).catch((error) => {
        return next(new errors.BadRequestError('Bad Request'));
    })

};

exports.getAuthenticationToken = function(req, res, next){
    var FUNCTION_NAME = 'getAuthenticationToken';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    var email = req.body.email;
    var password = req.body.password;

    if(!email){
        return next(new errors.BadRequestError('Email cannot be empty'));
    }
    if(!password){
        return next(new errors.BadRequestError('Password cannot be empty'));
    }

    var data = {
        email:email,
        password:password
    };

    models.User.validateUser(data).then((result) => {
        logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, result);
        res.json(new successHandler(result));
    }).catch((error) => {
        return next(new errors.UnauthorizedError('Please check the credentials.'));
    });


};
