'use strict';

/**
 * Model: Event
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define('Event', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        calendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false
        }
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
                // Calendar
                models.Event.belongsTo(models.Calendar, {
                    as: 'calendar',
                    foreignKey: 'calendarId',
                });

                // EventType
                models.Event.belongsTo(models.EventType, {
                    as: 'eventType',
                    foreignKey: 'eventTypeId',
                });

                // EventStatus
                models.Event.belongsTo(models.EventStatus, {
                    as: 'eventStatus',
                    foreignKey: 'eventStatusId',
                });

                // Creator
                models.Event.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId',
                });

                // Patient
                models.Event.belongsTo(models.Patient, {
                    as: 'patient',
                    foreignKey: 'patientId',
                });

                // Participants
                models.Event.belongsToMany(models.User, {
                    as: 'participants',
                    through: {
                        model: models.EventParticipant
                    },
                    foreignKey: 'eventId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Event.getSaveableFields = () => {
        return null;
    }

    return Event;
};