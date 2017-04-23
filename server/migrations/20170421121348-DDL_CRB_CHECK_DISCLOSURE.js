'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('crb_check_disclosure',
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
          number_issue: {
            type: Sequelize.STRING, allowNull: true
          },
          check_date: {
            type: Sequelize.DATE, allowNull: true
          },
          sign_date: {
            type: Sequelize.DATE, allowNull: true
          },
          comments: {
            type: Sequelize.STRING, allowNull: true
          },
          signature_path: {
            type: Sequelize.STRING, allowNull: true
          },
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('crb_check_disclosure');
  }
};
