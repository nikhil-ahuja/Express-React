'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('kin_details',
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
          relationship: {
            type: Sequelize.STRING, allowNull: false
          },
          home_phone: {
            type: Sequelize.STRING, allowNull: true
          },
          mobile_phone: {
            type: Sequelize.STRING, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('kin_details');
  }
};
