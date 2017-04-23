var models = require('../models/index');
var logger = require('../config/logger');
var FILE_NAME = "Session Middleware";


/*****************************************************
 Session Middleware - Checks user is Authorised or not

 output:-
 Redirects to next() route OR Error message
 ******************************************************/
exports.ensureAuth = function(req,res,next){
    var FUNCTION_NAME = ' ensureAuth';
    logger.debug(FILE_NAME+FUNCTION_NAME+"--session middleware called");
    ensureAuth(req, res, next, false);
};


var ensureAuth = function(req,res,next){
    var FUNCTION_NAME = ' ensureAuth';
    logger.debug(FILE_NAME+FUNCTION_NAME+"-- called");
    var error_response= {
        success:false,
        message:"Unauthorised Access",
        data:null
    };

    if(req.get('Authorization')===undefined)
    {
        logger.info(FILE_NAME+FUNCTION_NAME+"-- Authorization header undefined");

        res.status(401).send(error_response);
    }
    else {
        models.authToken.findOne({
            where:{
                token:req.get('Authorization')
            }
        }).then(function(result){
            if(!result){
                res.status(401).send(error_response);
            }
            else{
                logger.debug(FILE_NAME+FUNCTION_NAME+"--Token verified moving controls to next callback");
                return result.getUser().then(function (user) {
                    req.auth_token = req.get('Authorization');
                    req.currentUser = user;


                        next();

                    return null;
                })
            }

        }).catch(function(err){
            logger.error(FILE_NAME+FUNCTION_NAME+"--Error raised while verifying Token",err);
            res.status(401).send(error_response);
        });
    }
};
