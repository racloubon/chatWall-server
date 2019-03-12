// messages model
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {type:DataTypes.STRING, allowNull: false},
    creator: {type:DataTypes.STRING, allowNull: false},
    score: {type: DataTypes.INTEGER, defaultValue: 0},
    expireTime: {type: DataTypes.STRING, defaultValue: Date()}
  });

  Message.associate = function (db) {
    Message.belongsTo(db.Channel, { foreignKey: 'channel_id' });
  }

  return Message;
};
