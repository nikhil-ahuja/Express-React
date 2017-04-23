'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('passport_visa_details',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          },
          candidate: {
            type: Sequelize.INTEGER,
            references: {
              model: 'candidate',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          nationality: {
            type: Sequelize.STRING, allowNull: false
          },
          passport_issue_date: {
            type: Sequelize.DATE, allowNull: false
          },
          passport_expiry_date: {
            type: Sequelize.DATE, allowNull: false
          },
          passport_number: {
            type: Sequelize.INTEGER, allowNull: false
          },
          visa_number: {
            type: Sequelize.INTEGER, allowNull: true
          },
          visa_issue_date: {
            type: Sequelize.DATE, allowNull: true
          },
          visa_expiry_date: {
            type: Sequelize.DATE, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('passport_visa_details');
  }
};
