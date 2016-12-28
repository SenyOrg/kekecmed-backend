'use strict';
module.exports = function (sequelize, DataTypes) {
    var QueueItem = sequelize.define('QueueItem', {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        patientId: {
            type: DataTypes.INTEGER,
        },
        queueId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE,
        },
        end: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return QueueItem;
};