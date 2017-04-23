'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('address',
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
          street_address: {
            type: Sequelize.STRING, allowNull: false
          },
          city: {
            type: Sequelize.STRING, allowNull: false
          },
          state: {
            type: Sequelize.STRING, allowNull: true
          },
          postcode: {
            type: Sequelize.STRING,allowNull: false
          },
          country: {
            type: Sequelize.STRING
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('address');
  }
};
