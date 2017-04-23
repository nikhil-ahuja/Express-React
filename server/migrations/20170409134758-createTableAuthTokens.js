'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('auth_tokens',
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
          token:{
            type:Sequelize.STRING,
            allowNull: false
          },
          user_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('auth_tokens');
  }
};
