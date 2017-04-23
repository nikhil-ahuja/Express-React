'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('candidate',
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
          title: {
            type: Sequelize.STRING
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
          work_phone: {
            type: Sequelize.STRING, allowNull: true
          },
          home_phone: {
            type: Sequelize.STRING, allowNull: true
          },
          mobile_phone: {
            type: Sequelize.STRING, allowNull: false
          },
          can_drive_car: {
            type: Sequelize.BOOLEAN, defaultValue: false
          },
          home_address: {
            type: Sequelize.INTEGER,
            references: {
              model: 'address',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          payroll_number: {
            type: Sequelize.INTEGER, allowNull: false
          },
          marital_status: {
            type: Sequelize.STRING, allowNull: false
          },
          dob: {
            type: Sequelize.DATE, allowNull: false
          },
          qualifications: {
            type: Sequelize.STRING
          },
          more_than_48_hours: {
            type: Sequelize.BOOLEAN, defaultValue: false
          }
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('candidate');
  }
};
