'use strict';

/**
 * Migration: Patient
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
        queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0;');

        return queryInterface.createTable('Patients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.CHAR
            },
            birthDate: {
                type: Sequelize.DATE
            },
            insuranceUUID: {
                type: Sequelize.STRING,
            },
            insuranceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Insurances',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            phone: {
                type: Sequelize.STRING,
            },
            mobile: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            street: {
                type: Sequelize.STRING,
            },
            no: {
                type: Sequelize.STRING,
            },
            zipCode: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            image: {
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
        queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0;');
        return queryInterface.dropTable('Patients');
    }
};