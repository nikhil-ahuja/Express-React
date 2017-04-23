var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var models = require('../models');


var bearerStrategy = () => {
    return new Strategy(
        function (token, cb) {
            models.token.find({token: token}).then((token) => {
                if (!token) {
                    return cb(null, null);
                }
                return cb(null, token);
            }).catch((err) => {
                if (err) {
                    return cb(err);
                }
            })

        }
    );
};



module.exports = {
    bearerStrategy: bearerStrategy
};
