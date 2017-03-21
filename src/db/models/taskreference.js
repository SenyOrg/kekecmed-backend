'use strict';

/**
 * Model: TaskReference
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var TaskReference = sequelize.define('TaskReference', {

        /**
         * Attributes
         */

        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        objectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        objectType: {
            type: DataTypes.INTEGER,
            allowNull: false
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

                // Task
                models.TaskReference.belongsTo(models.Task, {
                    as: 'task',
                    foreignKey: 'taskId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    TaskReference.getSaveableFields = () => {
        return null;
    };

    return TaskReference;
};