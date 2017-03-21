'use strict';

/**
 * Model: Media
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Media = sequelize.define('Media', {
        fileName: {
            type: DataTypes.STRING,
        },
        fileType: {
            type: DataTypes.STRING
        },
        fileSize: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        objectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        objectType: {
            type: DataTypes.STRING,
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

                // Creator
                models.Media.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId'
                });

                // Patient
                models.Media.belongsTo(models.Patient, {
                    as: 'patient',
                    foreignKey: 'objectId',
                    scope: {
                        objectType: 'Patient'
                    }
                })
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Media.getSaveableFields = () => {
        return null;
    }

    return Media;
};