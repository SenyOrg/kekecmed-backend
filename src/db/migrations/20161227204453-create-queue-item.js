'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('QueueItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            patientId: {
                type: Sequelize.INTEGER,
            },
            queueId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            start: {
                type: Sequelize.DATE,
            },
            end: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.INTEGER
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('QueueItems');
    }
};