'use strict';
module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    title: {
      type: DataTypes.STRING
    },

  }, {
    classMethods: {
      associate: function(models) {
        // Participants
        models.Chat.hasMany(models.User, {
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
  return Chat;
};