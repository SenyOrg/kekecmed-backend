'use strict';

/**
 * Migration: EventType
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
        return queryInterface.createTable('EventTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '#fffff',
            },
            description: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('EventTypes');
    }
};