var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var PassportVisa = sequelize.define('PassportVisa',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at'
            },
            nationality: {
                type: Sequelize.STRING, allowNull: false
            },
            passportIssueDate: {
                type: Sequelize.DATE, allowNull: false, field: "passport_issue_date"
            },
            passportExpiryDate: {
                type: Sequelize.DATE, allowNull: false, field: "passport_expiry_date"
            },
            passportNumber: {
                type: Sequelize.INTEGER, allowNull: false, field: "passport_number"
            },
            visaNumber: {
                type: Sequelize.INTEGER, allowNull: true, field: 'visa_number'
            },
            visaIssueDate: {
                type: Sequelize.DATE, allowNull: true, field: "visa_issue_date"
            },
            visaExpiryDate: {
                type: Sequelize.DATE, allowNull: true, field: "visa_expiry_date"
            }
        },
        {

            classMethods: {
                associate: function (models) {
                    PassportVisa.belongsTo(models.Candidate);
                }
            },

            underscored: true,
            tableName: 'passport_visa_details'
        });



    return PassportVisa;
};


