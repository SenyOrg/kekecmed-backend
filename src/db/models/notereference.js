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
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    NoteReference.getSaveableFields = () => {
        return ['noteId', 'objectType', 'objectId']
    }
    return NoteReference;
};