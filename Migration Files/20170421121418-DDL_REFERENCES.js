'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('references',
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
          address: {
            type: Sequelize.INTEGER,
            references: {
              model: 'address',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          name: {
            type: Sequelize.STRING, allowNull: false
          },
          position: {
            type: Sequelize.DATE, allowNull: true
          },
          phone: {
            type: Sequelize.STRING, allowNull: true
          },
          fax: {
            type: Sequelize.STRING, allowNull: true
          },
          email: {
            type: Sequelize.STRING, allowNull: false
          },
          known_for: {
            type: Sequelize.STRING, allowNull: true
          },
          relationship: {
            type: Sequelize.STRING, allowNull: true
          },
          can_contact: {
            type: Sequelize.BOOLEAN, defaultValue: false
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('references');
  }
};
