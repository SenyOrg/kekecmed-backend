'use strict';

/**
 * Model: EventStatus
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var EventStatus = sequelize.define('EventStatus', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    EventStatus.getSaveableFields = () => {
        return null;
    }

    return EventStatus;
};