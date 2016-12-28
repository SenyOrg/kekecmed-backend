'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Consultations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Events',
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
            start: {
                type: Sequelize.DATE,
            },
            end: {
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('Consultations');
    }
};