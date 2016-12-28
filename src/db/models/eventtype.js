'use strict';

/**
 * Model: EventType
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var EventType = sequelize.define('EventType', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: '#fffff',
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return EventType;
};