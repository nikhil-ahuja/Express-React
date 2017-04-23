'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('work_eligibility',
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
          nmc_pin_number: {
            type: Sequelize.INTEGER, allowNull: true
          },
          nmc_expiry_date: {
            type: Sequelize.DATE, allowNull: true
          },
          hpc_number: {
            type: Sequelize.INTEGER, allowNull: true
          },
          hpc_expiry_date: {
            type: Sequelize.DATE, allowNull: true
          },
          nmc_part_of_register: {
            type: Sequelize.STRING, allowNull: true
          },
          ni_number: {
            type: Sequelize.STRING, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('work_eligibility');
  }
};
