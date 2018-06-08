// Channel model
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: {type: DataTypes.STRING, unique: true},
    creator: {type: DataTypes.STRING, allowNull: false},
    expireTime: {type: DataTypes.STRING, defaultValue: Date()}
  });

  return Channel;
};
