'use strict';

var ValidationError = require('../../exception/ValidationError').default;
var LogicalError    = require('../../exception/LogicalError').default;

/**
 * Model: Note
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define('Note', {
            body: {
                type: DataTypes.STRING,
            },
            authorId: {
                type: DataTypes.INTEGER,
            },
            objectId: {
                type: DataTypes.INTEGER,
            },
            objectType: {
                type: DataTypes.STRING,
            },
        },

        /**
         * Options
         */
        {
            /**
             * Model Validation
             */
            validate: {},

            /**
             * Class methods
             *
             * !!! Do not use this for class or instance methods !!!
             *
             */
            classMethods: {
                associate: function (models) {
                    // Author
                    models.Note.belongsTo(models.User, {
                        as: 'author',
                        foreignKey: 'authorId'
                    });

                    // Patient
                    models.Note.belongsTo(models.Patient, {
                        foreignKey: 'objectId',
                        constraints: false,
                        as: 'patient'
                    });
                },
            }
        });

    /**
     * Get saveable fields
     *
     * This will be used for create and update routines
     *
     * @returns {string[]}
     */
    Note.getSaveableFields = () => {
        return ['title', 'body', 'authorId'];
    };

    return Note;
};