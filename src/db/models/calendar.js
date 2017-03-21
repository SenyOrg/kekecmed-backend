'use strict';

/**
 * Model: Calendar
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Calendar = sequelize.define('Calendar', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        creatorId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        shared: {
            type: DataTypes.BOOLEAN
        },
        scopes: {
            type: DataTypes.STRING
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
                // Creator
                models.Calendar.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId'
                });

                // Events
                models.Calendar.hasMany(models.Event, {
                    as: 'events',
                    foreignKey: 'calendarId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Calendar.getSaveableFields = () => {
        return null;
    }

    return Calendar;
};