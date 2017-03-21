'use strict';

/**
 * Consultation
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Consultation = sequelize.define('Consultation', {

        /**
         * Attributes
         */

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

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Consultation.getSaveableFields = () => {
        return null;
    }

    return Consultation;
};