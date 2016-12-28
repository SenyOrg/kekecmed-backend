'use strict';
module.exports = function(sequelize, DataTypes) {
  var QueueItem = sequelize.define('QueueItem', {
    eventId: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    patientId: {
      type: sequelize.INTEGER,
    },
    queueId: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    start: {
      type: sequelize.DATE,
    },
    end: {
      type: sequelize.DATE
    },
    status: {
      type: sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return QueueItem;
};