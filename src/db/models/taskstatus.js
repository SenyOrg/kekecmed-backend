'use strict';

/**
 * Model: TaskStatus
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var TaskStatus = sequelize.define('TaskStatus', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING,
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
                // associations can be defined here
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    TaskStatus.getSaveableFields = () => {
        return null;
    };

    return TaskStatus;
};