'use strict';

/**
 * Model: QueueItem
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var QueueItem = sequelize.define('QueueItem', {

        /**
         * Attributes
         */

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
    QueueItem.getSaveableFields = () => {
        return null;
    };

    return QueueItem;
};