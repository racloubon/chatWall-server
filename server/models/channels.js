// Channel model
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: {type: DataTypes.STRING, unique: true},
    creator: DataTypes.STRING,
    expireTime: DataTypes.STRING
  });

  return Channel;
};
