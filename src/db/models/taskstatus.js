'use strict';
module.exports = function (sequelize, DataTypes) {
    var TaskStatus = sequelize.define('TaskStatus', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return TaskStatus;
};