// Channel model
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    pin: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {type: DataTypes.STRING},
    creator: {type: DataTypes.STRING, allowNull: false},
    expireTime: {type: DataTypes.STRING, defaultValue: Date.now() + 604800000},
  });

  Channel.associate = function (db) {
    Channel.hasMany(db.Message, { foreignKey: 'channel_id' })
  }

  return Channel;
};
