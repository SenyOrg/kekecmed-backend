'use strict';

/**
 * Migration: Event
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
        return queryInterface.createTable('Events', {
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
            description: {
                type: Sequelize.STRING,
            },
            calendarId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Calendars',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            eventTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'EventTypes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            creatorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Patients',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            eventStatusId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'EventStatuses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            start: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end: {
                type: Sequelize.DATE,
                allowNull: false
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
        return queryInterface.dropTable('Events');
    }
};