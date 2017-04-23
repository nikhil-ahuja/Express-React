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


exports.savePersonalDetails = function (req, res, next) {

    var FUNCTION_NAME = 'savePersonalDetails';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var canDriveCar = req.body.canDriveCar;
    var workPhone = req.body.workPhone;
    var homePhone = req.body.homePhone;
    var mobilePhone = req.body.mobilePhone;
    var maritalStatus = req.body.maritalStatus;
    var title = req.body.title;
    var city = req.body.city;
    var streetAddress = req.body.streetAddress;
    var country = req.body.country;
    var state = req.body.state;
    var postcode = req.body.postcode;
    var dob = req.body.dob;
    var payrollNumber = req.body.payrollNumber;


    if(!email){
        return next(new errors.BadRequestError('Email cannot be empty'));
    }
    if(!password){
        return next(new errors.BadRequestError('Password cannot be empty'));
    }
    if(!firstName){
        return next(new errors.BadRequestError('First name cannot be empty'));
    }
    if(!lastName){
        return next(new errors.BadRequestError('Last name cannot be empty'));
    }
    if(!canDriveCar){
        return next(new errors.BadRequestError('Can drive car cannot be empty'));
    }
    if(!workPhone){
        return next(new errors.BadRequestError('Work phone cannot be empty'));
    }
    if(!homePhone){
        return next(new errors.BadRequestError('Home phone cannot be empty'));
    }
    if(!mobilePhone){
        return next(new errors.BadRequestError('Mobile phone cannot be empty'));
    }
    if(!maritalStatus){
        return next(new errors.BadRequestError('Marital status cannot be empty'));
    }
    if(!title){
        return next(new errors.BadRequestError('Title cannot be empty'));
    }
    if(!dob){
        return next(new errors.BadRequestError('DOB cannot be empty'));
    }
    if(!payrollNumber){
        return next(new errors.BadRequestError('Payroll Number cannot be empty'));
    }
    if(!city){
        return next(new errors.BadRequestError('City cannot be empty'));
    }
    if(!state){
        return next(new errors.BadRequestError('State cannot be empty'));
    }
    if(!country){
        return next(new errors.BadRequestError('Country cannot be empty'));
    }
    if(!postcode){
        return next(new errors.BadRequestError('Postcode cannot be empty'));
    }
    if(!streetAddress){
        return next(new errors.BadRequestError('Street address cannot be empty'));
    }

    var candidateData = {
        email:email,
        password:password,
        firstName: firstName,
        lastName: lastName,
        workPhone: workPhone,
        mobilePhone: mobilePhone,
        homePhone: homePhone,
        maritalStatus: maritalStatus,
        canDriveCar: canDriveCar,
        title: title,
        dob: dob,
        payrollNumber: payrollNumber
    };

    var addressData = {
        city: city,
        state: state,
        postcode: postcode,
        streetAddress: streetAddress,
        country: country
    };

    models.Address.create(addressData).then(function(address){
        candidateData['address_id'] = address.dataValues.id;
        models.Candidate.create(candidateData).then(function(result){
            logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, result);
            res.json(new successHandler(result));
        }).catch((error) => {
            logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, error);
            return next(new errors.InternalServerError('Some internal server error occurred.'));
        });
    }).catch((error) => {
        logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, error);
        return next(new errors.InternalServerError('Some internal server error occurred.'));
    });


};


exports.savePassportDetails = function (req, res, next) {

    var FUNCTION_NAME = 'savePassportDetails';

    logger.debug('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME);

    var candidate_id = req.body.candidateId;
    var nationality = req.body.nationality;
    var passportIssueDate = req.body.passportIssueDate;
    var passportExpiryDate = req.body.passportExpiryDate;
    var passportNumber = req.body.passportNumber;
    var visaNumber = req.body.visaNumber;
    var visaIssueDate = req.body.visaIssueDate;
    var visaExpiryDate = req.body.visaExpiryDate;
    var nmcPinNumber = req.body.nmcPinNumber;
    var nmcExpiryDate = req.body.nmcExpiryDate;
    var hpcNumber = req.body.hpcNumber;
    var hpcExpiryDate = req.body.hpcExpiryDate;
    var nmcPartOfRegister = req.body.nmcPartOfRegister;
    var niNumber = req.body.niNumber;


    if(!candidate_id){
        return next(new errors.BadRequestError('Candidate Id cannot be empty'));
    }
    if(!nationality){
        return next(new errors.BadRequestError('Nationality cannot be empty'));
    }
    if(!passportIssueDate){
        return next(new errors.BadRequestError('Passport Issue Date cannot be empty'));
    }
    if(!passportExpiryDate){
        return next(new errors.BadRequestError('Passport Expiry Date cannot be empty'));
    }
    if(!passportNumber){
        return next(new errors.BadRequestError('Passport number cannot be empty'));
    }
    if(!visaNumber){
        return next(new errors.BadRequestError('Visa number cannot be empty'));
    }
    if(!visaIssueDate){
        return next(new errors.BadRequestError('Visa Issue date cannot be empty'));
    }
    if(!visaExpiryDate){
        return next(new errors.BadRequestError('Visa expiry date cannot be empty'));
    }
    if(!nmcPinNumber){
        return next(new errors.BadRequestError('NMC Pin Number cannot be empty'));
    }
    if(!nmcExpiryDate){
        return next(new errors.BadRequestError('NMC Expiry date cannot be empty'));
    }
    if(!hpcNumber){
        return next(new errors.BadRequestError('HPC Number cannot be empty'));
    }
    if(!hpcExpiryDate){
        return next(new errors.BadRequestError('HPC expiry date cannot be empty'));
    }
    if(!nmcPartOfRegister){
        return next(new errors.BadRequestError('NMC Part of register cannot be empty'));
    }
    if(!niNumber){
        return next(new errors.BadRequestError('NI Number cannot be empty'));
    }

    var passportVisaData = {
        nationality:nationality,
        passportIssueDate:passportIssueDate,
        passportExpiryDate: passportExpiryDate,
        passportNumber: passportNumber,
        visaNumber: visaNumber,
        visaIssueDate: visaIssueDate,
        visaExpiryDate: visaExpiryDate,
        candidate_id: candidate_id
    };

    var workEligibilityData = {
        nmcPinNumber: nmcPinNumber,
        nmcExpiryDate: nmcExpiryDate,
        hpcNumber: hpcNumber,
        hpcExpiryDate: hpcExpiryDate,
        nmcPartOfRegister: nmcPartOfRegister,
        niNumber: niNumber,
        candidate_id: candidate_id
    };

    models.PassportVisa.create(passportVisaData).then(function(data){
        models.WorkEligibility.create(workEligibilityData).then(function(result){
            logger.info('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, result);
            res.json(new successHandler({passportData:data, workData: result}));
        }).catch((error) => {
            logger.error('Inside File: ' + FILE_NAME + ' Function: ' + FUNCTION_NAME, error);
            return next(new errors.InternalServerError('Some internal server error occurred.'));
        });
    }).catch((error) => {
        logger.error('Inside File: '+FILE_NAME+' Function: '+FUNCTION_NAME, error);
        return next(new errors.InternalServerError('Some internal server error occurred.'));
    });


};

