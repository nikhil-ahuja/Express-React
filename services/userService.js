var errors = require('restify-errors');
var logger = require('../logger');
var successHandler = require('../responseHandlers/successHandler');
var User = require('../models/user');
const FILE_NAME = 'userService';

exports.saveAccountDetails = function (req, res, next) {
    var FUNCTION_NAME = 'saveAccountDetails';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);
    function saveAccount() {
        req.user.givenName = req.body.givenName;
        req.user.surname = req.body.surname;
        req.user.email = req.body.email;

        if ('color' in req.body.customData) {
            req.user.customData.color = req.body.customData.color;
        }

        req.user.save(function (err) {
            if (err) {
                logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, err);
                return next(new errors.InternalServerError(err.userMessage || err.message));
            }
            logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, req.user);
            User.findOne({email: req.user.email}, function(err, user){
                if(user){
                    user.firstName = req.body.givenName;
                    user.lastName = req.body.surname;
                    user.email = req.body.email;
                    user.save();
                }
                res.json(new successHandler(req.user));
            });
        });
    }

    if (req.body.password) {
        var application = req.app.get('stormpathApplication');

        application.authenticateAccount({
            username: req.user.username,
            password: req.body.password
        }, function (err) {
            if (err) {
                logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, err);
                return next(new errors.UnauthorizedError('The existing password that you entered was incorrect.'));
            }

            req.user.password = req.body.password;
            saveAccount();
        });
    } else {
        saveAccount();
    }

};

exports.getCurrentUser = function(req, res, next){
    var FUNCTION_NAME = 'getCurrentUser';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    if (req.user) {
        logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, req.user);
        res.status(200).json(req.user);
    } else {
        return next(new errors.UnauthorizedError('Not Logged In!'));
    }
};