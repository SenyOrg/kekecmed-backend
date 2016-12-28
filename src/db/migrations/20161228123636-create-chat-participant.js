'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('ChatParticipants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            chatId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            participantId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            unreadMessages: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        return queryInterface.dropTable('ChatParticipants');
    }
};