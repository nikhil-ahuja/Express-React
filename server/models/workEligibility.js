var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var WorkEligibility = sequelize.define('WorkEligibility',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdAt: {
                type: Sequelize.DATE,
                field: "created_at"
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: "updated_at"
            },

            nmcPinNumber: {
                type: Sequelize.INTEGER, allowNull: true, field:"nmc_pin_number"
            },
            nmcExpiryDate: {
                type: Sequelize.DATE, allowNull: true, field:"nmc_expiry_date"
            },
            hpcNumber: {
                type: Sequelize.INTEGER, allowNull: true, field:"hpc_number"
            },
            hpcExpiryDate: {
                type: Sequelize.DATE, allowNull: true, field:"hpc_expiry_date"
            },
            nmcPartOfRegister: {
                type: Sequelize.STRING, allowNull: true, field:"nmc_part_of_register"
            },
            niNumber: {
                type: Sequelize.STRING, allowNull: true, field:"ni_number"
            }
        },
        {

            classMethods: {
                associate: function (models) {
                    WorkEligibility.belongsTo(models.Candidate);
                }
            },

            underscored: true,
            tableName: 'work_eligibility'
        });



    return WorkEligibility;
};


