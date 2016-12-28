'use strict';

/**
 * Model: Calendar
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Calendar = sequelize.define('Calendar', {
        title: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        creatorId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        shared: {
            type: DataTypes.BOOLEAN
        },
        scopes: {
            type: DataTypes.STRING
        }
    },
    {
        classMethods: {
            associate: function (models) {
                // Creator
                models.Calendar.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Calendar.getSaveableFields = () => {
        return null;
    }

    return Calendar;
};