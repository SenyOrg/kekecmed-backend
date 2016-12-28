'use strict';

/**
 * Model: EventParticipant
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var EventParticipant = sequelize.define('EventParticipant', {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        participantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: function (models) {
                models.EventParticipant.belongsTo(models.Event, {
                    as: 'event',
                    foreignKey: 'eventId',
                });

                models.EventParticipant.belongsTo(models.User, {
                    as: 'participant',
                    foreignKey: 'participantId'
                })
            }
        }
    });
    return EventParticipant;
};