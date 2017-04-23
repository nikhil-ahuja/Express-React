var Sequelize = require('sequelize');
var uid = require('rand-token').uid;
var Promise = require('bluebird');


module.exports = function (sequelize, DataTypes) {
    var authToken = sequelize.define('authToken', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        },
    }, {
        hooks: {
            afterCreate: function (user, options, next) {
                delete user.dataValues.user_id;
                delete user.dataValues.id;
                delete user.dataValues.created_at;
                delete user.dataValues.updated_at;

                next(null, user)
            }
        },
        classMethods: {
            associate: function (models) {
                authToken.belongsTo(models.User);
            },
            addToken: function (userId) {
                return new Promise(function(resolve,reject){
                    authToken.create({token: uid(16), user_id: userId}).then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        reject(error);
                    })
                });

            }
        },
        underscored: true,
        tableName: 'auth_tokens'
    });
    return authToken;
};

