'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
// const env       = process.env.NODE_ENV || 'development';
// const config    = require(__dirname + '/../config/config.js')[env];
const db        = {};

// if (config.use_env_variable) {
//   const sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   const sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize('chat-wall-db', 'david', 'codeworks', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
