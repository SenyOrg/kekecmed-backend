'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0;');
        return queryInterface.createTable('Tasks', {
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
                allowNull: false
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: false
            },
            statusId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'TaskStatuses',
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
        queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0;');
        return queryInterface.dropTable('Tasks');
    }
};