'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('equality_diversity_form',
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
          gender: {
            type: Sequelize.STRING, allowNull: true
          },
          position_applied: {
            type: Sequelize.STRING, allowNull: true
          },
          race: {
            type: Sequelize.STRING, allowNull: true
          },
          any_disability: {
            type: Sequelize.STRING, allowNull: true
          },
          religious_belief: {
            type: Sequelize.STRING, allowNull: true
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('equality_diversity_form');
  }
};
