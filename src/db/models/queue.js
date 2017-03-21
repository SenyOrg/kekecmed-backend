'use strict';

/**
 * Model: Queue
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Queue = sequelize.define('Queue', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        multiple: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        calendars: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '[]'
        },
        eventTypes: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '[]',
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
                // associations can be defined here
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Queue.getSaveableFields = () => {
        return null;
    };

    return Queue;
};