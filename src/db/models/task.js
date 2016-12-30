'use strict';
module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
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
        classMethods: {
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

    Task.getSaveableFields = () => {
        return null;
    }

    return Task;
};