'use strict';
module.exports = function(sequelize, DataTypes) {
  var TaskAssignee = sequelize.define('TaskAssignee', {
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.TaskAssignee.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
        models.TaskAssignee.belongsTo(models.Task, {as: 'task', foreignKey: 'taskId'});
      }
    }
  });

  return TaskAssignee;
};