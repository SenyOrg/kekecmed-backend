'use strict';
module.exports = function (sequelize, DataTypes) {
    var Consultation = sequelize.define('Consultation', {
        eventId: {
            type: DataTypes.INTEGER,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
        },
        end: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function (models) {
                // Patient
                models.Consultation.belongsTo(models.Patient, {
                    as: 'patient',
                    foreignKey: 'patientId'
                });

                // Event
                models.Consultation.belongsTo(models.Event, {
                    as: 'event',
                    foreignKey: 'eventId'
                });
            }
        }
    });
    return Consultation;
};