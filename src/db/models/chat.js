'use strict';

/**
 * Model: Chats
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var Chat = sequelize.define('Chat', {

        /**
         * Attributes
         */

        title: {
            type: DataTypes.STRING
        },

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
                // Participants
                models.Chat.belongsToMany(models.User, {
                    as: 'participants',
                    foreignKey: 'chatId',
                    through: {
                        model: models.ChatParticipant
                    }
                });

                // Messages
                models.Chat.hasMany(models.ChatMessage, {
                    as: 'messages',
                    foreignKey: 'chatId'
                });
            }
        }
    });

    /**
     * Get saveable fields
     *
     * @returns {null}
     */
    Chat.getSaveableFields = () => {
        return null;
    }

    return Chat;
};