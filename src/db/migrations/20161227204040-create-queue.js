'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Queues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      multiple: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      calendars: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '[]'
      },
      eventTypes: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '[]',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Queues');
  }
};