'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users',
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
          first_name: {
            type: Sequelize.STRING, allowNull: false
          },
          last_name: {
            type: Sequelize.STRING, allowNull: false
          },
          email: {
            type: Sequelize.STRING, unique: true,allowNull: false
          },
          password: {
            type: Sequelize.STRING
          },
          phone: {
            type: Sequelize.STRING,unique: true,allowNull: true
          },
          profile_url: {
            type: Sequelize.STRING
          },
          address: {
            type: Sequelize.STRING
          },
          gender: {
            type: Sequelize.STRING
          },
          dob: {
            type: Sequelize.DATE
          },
          zipcode: {
            type: Sequelize.STRING
          },
          is_verified: {
            type: Sequelize.BOOLEAN, defaultValue: false
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
