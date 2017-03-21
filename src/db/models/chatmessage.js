'use strict';

/**
 * Model: ChatMessage
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {
    var ChatMessage = sequelize.define('ChatMessage', {

        /**
         * Attributes
         */

        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
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
                // Author
                models.ChatMessage.belongsTo(models.User, {
                    as: 'author',
                    foreignKey: 'authorId'
                });

                // Chat
                models.ChatMessage.belongsTo(models.Chat, {
                    as: 'chat',
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
    ChatMessage.getSaveableFields = () => {
        return null;
    }

    return ChatMessage;
};