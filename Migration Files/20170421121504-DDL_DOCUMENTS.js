'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('documents',
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
          document_type: {
            type: Sequelize.STRING, allowNull: true
          },
          upload_date: {
            type: Sequelize.DATE, allowNull: true
          },
          document_path: {
            type: Sequelize.STRING, allowNull: true
          },
          due_date: {
            type: Sequelize.DATE, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('documents');
  }
};
