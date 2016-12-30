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
            title: {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.STRING,
            },
            authorId: {
                type: DataTypes.INTEGER,
            }
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
                    models.Note.belongsTo(models.User, {
                        as: 'author',
                        foreignKey: 'authorId'
                    });

                    models.Note.belongsToMany(models.Patient, {
                        through: {
                            model: models.NoteReference,
                            unique: false,
                            scope: {
                                objectType: 'Patient'
                            }
                        },
                        as: 'patients',
                        foreignKey: 'noteId',
                        constraints: false
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
    }

    return Note;
};