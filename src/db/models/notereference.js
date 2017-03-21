'use strict';

/**
 * Model: NoteReference
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var NoteReference = sequelize.define('NoteReference', {

        /**
         * Attributes
         */

        noteId: {
            type: DataTypes.INTEGER,
            unique: 'item_tag_taggable'
        },
        objectType: {
            type: DataTypes.STRING,
            unique: 'item_tag_taggable'
        },
        objectId: {
            type: DataTypes.INTEGER,
            unique: 'item_tag_taggable',
            references: null
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
                // associations can be defined here
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {string[]}
     */
    NoteReference.getSaveableFields = () => {
        return ['noteId', 'objectType', 'objectId']
    }

    return NoteReference;
};