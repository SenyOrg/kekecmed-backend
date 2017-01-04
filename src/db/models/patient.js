'use strict';

var ValidationError = require('../../exception/ValidationError').default;

/**
 * Model: Patient
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Patient = sequelize.define('Patient', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
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
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        insuranceUUID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        insuranceId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        no: {
            type: DataTypes.STRING,
        },
        zipCode: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
    }, {
        /**
         * OPTIONS
         */
        classMethods: {
            associate: function (models) {
                // Notes
                models.Patient.hasMany(models.Note, {
                    as: 'notes',
                    foreignKey: 'objectId',
                    scope: {
                        objectType: 'Patient'
                    },
                    constraints: false
                });

                // Tasks
                models.Patient.belongsToMany(models.Task, {
                    through: {
                        model: models.TaskReference,
                        unique: false,
                        scope: {
                            objectType: 'Patient'
                        }
                    },
                    as: 'tasks',
                    foreignKey: 'objectId',
                    constraints: false
                });

                // Insurance
                models.Patient.belongsTo(models.Insurance, {
                    as: 'insurance',
                    foreignKey: 'insuranceId'
                });

                // Events
                models.Patient.hasMany(models.Event, {
                    as: 'events',
                    foreignKey: 'patientId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Patient.getSaveableFields = () => {
        return null;
    };

    return Patient;
};