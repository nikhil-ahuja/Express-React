'use strict';

var bcrypt = require('bcrypt');
var Sequelize = require('sequelize');
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User',
        {
            firstName: {
                type: Sequelize.STRING, allowNull: false,validate: {notEmpty: true},
                field: "first_name"
            },
            lastName: {
                type: Sequelize.STRING,
                field: "last_name"
            },
            email: {
                type: Sequelize.STRING, unique: true,allowNull: false,validate: {isEmail: true, notEmpty: true}
            },
            password: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            profileUrl: {
                type: Sequelize.STRING,
                field: "profile_url"
                //validate: {isUrl: true}
            },
            address: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATE
            },
            zipcode: {
                type: Sequelize.STRING
            },
            isVerified: {
                type: Sequelize.BOOLEAN, defaultValue: false,
                field: 'is_verified'
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
            scopes: {
                verified: {
                    where: {isVerified: true}
                },
                active: {
                    where: {isDeactivated: false}
                }
            },
            hooks: {
                beforeValidate: function (user) {
                    if(user.phone) {
                        user.phone = user.phone.replace(/[-()\s]/g,"");
                    }
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
                    User.hasMany(models.authToken);
                },
                validateUser: function (credentials) {
                    return new Promise(function (resolve, reject) {
                        User.find({email: credentials.email}).then((data) => {
                            if (data) {
                                if (data.validatePassword(credentials.password)) {
                                    data.sequelize.models.authToken.addToken(data.id).then((response) => {
                                        resolve(response)
                                    }).catch((error) => {
                                        reject(error)
                                    });
                                }
                                else{
                                    var error = {};
                                    error["status"] = 401;
                                    error["message"]="Invalid Password";
                                    reject(error)
                                }
                            }
                        }).catch((error) => {
                            reject(error)
                        })
                    })

                }
            },
            instanceMethods: {
                validatePassword: function(password) {
                    return bcrypt.compareSync(password, this.password);
                }
            },
            getterMethods: {
                fullName: function () {
                    return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
                }
            },

            underscored: true,
            tableName: 'users'
        });

    return User;
};


