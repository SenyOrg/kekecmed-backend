'use strict';

/**
 * Migration: NoteReference
 *
 * @type {{up: module.exports.up, down: module.exports.down}}
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
module.exports = {

    /**
     * Up
     *
     * @param queryInterface
     * @param Sequelize
     * @returns {*}
     */
    up: function (queryInterface, Sequelize) {
        return null;
        return queryInterface.createTable('NoteReferences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            noteId: {
                type: Sequelize.INTEGER,
                unique: 'noteSet',
                references: {
                    model: 'Notes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            objectId: {
                type: Sequelize.INTEGER,
                unique: 'noteSet'
            },
            objectType: {
                type: Sequelize.STRING,
                unique: 'noteSet'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    /**
     * Down
     *
     * @param queryInterface
     * @param Sequelize
     * @returns {*}
     */
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('NoteReferences');
    }
};