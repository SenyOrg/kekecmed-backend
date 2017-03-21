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

        /**
         * Attributes
         */

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
                // associations can be defined here
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    EventType.getSaveableFields = () => {
        return null;
    }

    return EventType;
};