'use strict';
module.exports = function(sequelize, DataTypes) {
  var ChatParticipant = sequelize.define('ChatParticipant', {
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
    classMethods: {
      associate: function(models) {
        models.ChatParticipant.belongsTo(models.Chat, {
          as: 'chat',
          foreignKey: 'chatId',
        });

        models.ChatParticipant.belongstTo(models.User, {
          as: 'participant',
          foreignKey: 'participantId'
        })
      }
    }
  });

  return ChatParticipant;
};