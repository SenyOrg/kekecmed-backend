'use strict';

var ValidationError = require('../../exception/ValidationError').default;

/**
 * Model: User
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        /**
         * ATTRIBUTES
         */

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                maleOrFemale: (value) => {
                    if ((value !== 'm') && (value !== 'f')) {
                        throw new ValidationError('Value should be \'m\' or \'f\'.');
                    }
                }
            }
        },
        street: {
            type: DataTypes.STRING
        },
        no: {
            type: DataTypes.STRING
        },
        zipCode: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        image: {
            type: DataTypes.STRING
        },
    }, {
        /**
         * OPTIONS
         */

        classMethods: {
            associate: function (models) {
                // Notes
                models.User.hasMany(models.Note, {
                    as: 'notes',
                    foreignKey: 'authorId',
                    constraints: false
                });

                // Tasks (created)
                models.User.hasMany(models.Task, {
                    as: 'createdTasks',
                    foreignKey: 'creatorId'
                });

                // Task (assigned)
                models.User.belongsToMany(models.Task, {
                    through: {
                        model: models.TaskAssignee,
                        unique: false,
                    },
                    as: 'assignedTasks',
                    foreignKey: 'userId',
                    constraints: false
                });

                // Calendars
                models.User.hasMany(models.Calendar, {
                    as: 'calendars',
                    foreignKey: 'creatorId'
                });

                // Participating events
                models.User.belongsToMany(models.Event, {
                    as: 'events',
                    through: {
                        model: models.EventParticipant,
                    },
                    foreignKey: 'participantId',
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    User.getSaveableFields = () => {
        return null;
    };

    return User;
};