'use strict';
module.exports = function(sequelize, DataTypes) {
  var Queue = sequelize.define('Queue', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    multiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    calendars: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '[]'
    },
    eventTypes: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '[]',
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Queue;
};