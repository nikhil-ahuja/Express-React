var Sequelize = require('sequelize');
var uid = require('rand-token').uid;
var Promise = require('bluebird');
var bcrypt = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
    var Candidate = sequelize.define('Candidate',
        {
            firstName: {
                type: Sequelize.STRING, allowNull: false,validate: {notEmpty: true},
                field: "first_name"
            },
            lastName: {
                type: Sequelize.STRING,
                field: "last_name"
            },
            title: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING, unique: true,allowNull: false,validate: {isEmail: true, notEmpty: true}
            },
            password: {
                type: Sequelize.STRING
            },
            workPhone: {
                type: Sequelize.STRING,
                field: "work_phone"
            },
            mobilePhone: {
                type: Sequelize.STRING,
                field: "mobile_phone"
            },
            homePhone: {
                type: Sequelize.STRING,
                field: "home_phone"
            },
            canDriveCar: {
                type: Sequelize.BOOLEAN, defaultValue: false, field: "can_drive_car"
            },
            maritalStatus:{
                type: Sequelize.STRING,
                field: "marital_status"
            },
            dob: {
                type: Sequelize.DATE, allowNull: false, field: "dob"
            },
            payrollNumber: {
                type: Sequelize.INTEGER, allowNull: false, field: "payroll_number"
             },

            qualifications: {
                type: Sequelize.STRING
            },
            moreThan48Hours: {
                type: Sequelize.BOOLEAN, defaultValue: false, field: "more_than_48_hours"
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at'
            },
        },

        {

            hooks: {
                beforeValidate: function (user) {
                    if(user.email) {
                        user.email = user.email.toLowerCase();
                    }
                },
                beforeCreate : function(user, options, next) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(user.password, salt, function(err, hash) {
                            user.password = hash;
                            user.quickbloxKey = hash;
                            next(null, user);
                        });
                    });
                }


            },
            classMethods: {
                associate: function (models) {
                    Candidate.belongsTo(models.Address);
                    Candidate.hasMany(models.PassportVisa);
                    Candidate.hasMany(models.WorkEligibility);
                }
            },
            underscored: true,
            tableName: 'candidate'
        });

    return Candidate;
};


