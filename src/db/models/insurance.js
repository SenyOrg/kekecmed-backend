'use strict';

var ValidationError = require('../../exception/ValidationError').default;
var Logger          = require('../../util/logger').default;

/**
 * Model: Insurance
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Insurance = sequelize.define('Insurance', {
        /**
         * ATTRIBUTES
         */

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        /**
         * OPTIONS
         */

        classMethods: {
            associate: function (models) {
                // Patients
                models.Insurance.hasMany(models.Patient, {
                    as: 'patients',
                    foreignKey: 'insuranceId'
                });
            }
        }
    });


    return Insurance;
};