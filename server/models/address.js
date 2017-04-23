var Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    var Address = sequelize.define('Address', {
        streetAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "street_address"
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "city"
        },
        state: {
            type: Sequelize.STRING,
            field: "state"
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "country"
        },
        postcode: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "postcode"
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
    }, {

        classMethods: {
            associate: function (models) {
                Address.hasMany(models.Candidate);
            }
        },
        underscored: true,
        tableName: 'address'
    });
    return Address;
};

