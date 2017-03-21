'use strict';

/**
 * Model: ChatParticipants
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var ChatParticipant = sequelize.define('ChatParticipant', {

        /**
         * Attributes
         */

        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        participantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unreadMessages: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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

                // Chat
                models.ChatParticipant.belongsTo(models.Chat, {
                    as: 'chat',
                    foreignKey: 'chatId',
                });

                // Users
                models.ChatParticipant.belongsTo(models.User, {
                    as: 'participant',
                    foreignKey: 'participantId'
                })
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    ChatParticipant.getSaveableFields = () => {
        return null;
    }

    return ChatParticipant;
};