'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('employment_history',
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
          company_address: {
            type: Sequelize.INTEGER,
            references: {
              model: 'address',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          company_name: {
            type: Sequelize.STRING, allowNull: false
          },
          designation: {
            type: Sequelize.STRING, allowNull: false
          },
          start_date: {
            type: Sequelize.DATE, allowNull: false
          },
          end_date: {
            type: Sequelize.DATE, allowNull: true
          },
          reason_of_leaving: {
            type: Sequelize.STRING, allowNull: false
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('employment_history');
  }
};
