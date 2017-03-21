'use strict';
module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
        },
        creatorId: {
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
                // Creator
                models.Task.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId'
                });

                // Status
                models.Task.belongsTo(models.TaskStatus, {
                    as: 'status',
                    foreignKey: 'statusId'
                });

                // Assigness
                models.Task.belongsToMany(models.User, {
                    through: {
                        model: models.TaskAssignee,
                        unique: false,
                    },
                    as: 'assignees',
                    foreignKey: 'taskId',
                });

                // References: Patients
                models.Task.belongsToMany(models.Patient, {
                    through: {
                        model: models.TaskReference,
                        unique: false,
                        scope: {
                            objectType: 'Patient'
                        }
                    },
                    as: 'patients',
                    foreignKey: 'taskId',
                    constraints: false
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Task.getSaveableFields = () => {
        return null;
    }

    return Task;
};