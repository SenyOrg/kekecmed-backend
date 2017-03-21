'use strict';

/**
 * Model: TaskAssignee
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var TaskAssignee = sequelize.define('TaskAssignee', {

        /**
         * Attributes
         */

        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
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

                // User
                models.TaskAssignee.belongsTo(models.User, {
                    as: 'user',
                    foreignKey: 'userId'
                });

                // Task
                models.TaskAssignee.belongsTo(models.Task, {
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
    TaskAssignee.getSaveableFields = () => {
        return null;
    }

    return TaskAssignee;
};