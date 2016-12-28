'use strict';
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
        classMethods: {
            associate: function (models) {
                models.Media.belongsTo(models.User, {
                    as: 'creator',
                    foreignKey: 'creatorId'
                });

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
    return Media;
};