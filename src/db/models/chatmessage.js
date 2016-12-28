'use strict';
module.exports = function(sequelize, DataTypes) {
  var ChatMessage = sequelize.define('ChatMessage', {
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
    classMethods: {
      associate: function(models) {
        models.ChatMessage.belongsTo(models.User, {
          as: 'author',
          foreignKey: 'authorId'
        });

        models.ChatMessage.belongsTo(models.Chat, {
          as: 'chat',
          foreignKey: 'chatId'
        });
      }
    }
  });
  return ChatMessage;
};