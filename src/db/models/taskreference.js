'use strict';
module.exports = function(sequelize, DataTypes) {
  var TaskReference = sequelize.define('TaskReference', {
    taskId: DataTypes.INTEGER,
    objectId: DataTypes.INTEGER,
    objectType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.TaskReference.belongsTo(models.Task, {
          as: 'task',
          foreignKey: 'taskId'
        })
      }
    }
  });
  return TaskReference;
};