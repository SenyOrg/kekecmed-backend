'use strict';
module.exports = function (sequelize, DataTypes) {
    var TaskStatus = sequelize.define('TaskStatus', {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return TaskStatus;
};