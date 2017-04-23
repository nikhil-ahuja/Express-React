'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('additional_details',
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
          heard_from: {
            type: Sequelize.STRING, allowNull: true
          },
          internet_advert: {
            type: Sequelize.STRING, allowNull: true
          },
          other_details: {
            type: Sequelize.STRING, allowNull: true
          },
          newspaper_advert: {
            type: Sequelize.STRING, allowNull: true
          },
          work_preferences: {
            type: Sequelize.STRING, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('additional_details');
  }
};
