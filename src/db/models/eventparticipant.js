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

        /**
         * Attributes
         */

        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        participantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {

        /**
         * Options
         */

        /**
         * Class Methods
         */
        classMethods: {

            /**
             * Setup associations
             *
             * @param models
             */
            associate: function (models) {

                // Event
                models.EventParticipant.belongsTo(models.Event, {
                    as: 'event',
                    foreignKey: 'eventId',
                });

                // Particpant
                models.EventParticipant.belongsTo(models.User, {
                    as: 'participant',
                    foreignKey: 'participantId'
                })
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    EventParticipant.getSaveableFields = () => {
        return null;
    }

    return EventParticipant;
};