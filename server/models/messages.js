// messages model
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    creator: DataTypes.STRING,
    channel: DataTypes.STRING,
    score: DataTypes.INTEGER,
    expireTime: DataTypes.STRING
  });

  return Message;
};
