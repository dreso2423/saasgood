'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import each model individually
db.Company = require('./Company');
db.User = require('./User');
db.DataSource = require('./DataSource');
db.Campaign = require('./campaign');
db.AdSet = require('./AdSet');
db.Ad = require('./ads');
db.Connection = require('./connection');
db.Conversion = require('./Conversion');
db.Visitor = require('./Visitor');
db.Event = require('./Event');
db.Integration = require('./Integrations');

// Define associations here
db.Company.hasMany(db.User, { foreignKey: 'company_id' });
db.Company.hasMany(db.DataSource, { foreignKey: 'company_id' });
db.Campaign.belongsTo(db.DataSource, { foreignKey: 'data_source_id' });
db.AdSet.belongsTo(db.Campaign, { foreignKey: 'campaign_id' });
db.Ad.belongsTo(db.AdSet, { foreignKey: 'ad_set_id' });
db.Connection.belongsTo(db.Company, { foreignKey: 'company_id' });
db.Connection.belongsTo(db.DataSource, { foreignKey: 'data_source_id' });
db.Conversion.belongsTo(db.User, { foreignKey: 'user_id' });
db.Conversion.belongsTo(db.Visitor, { foreignKey: 'visitor_id' });
db.DataSource.belongsTo(db.Company, { foreignKey: 'company_id' });
db.DataSource.hasMany(db.Connection, { foreignKey: 'data_source_id' });
db.Event.belongsTo(db.DataSource, { foreignKey: 'data_source_id' });
db.Event.belongsTo(db.Connection, { foreignKey: 'connection_id' });
db.Event.belongsTo(db.Campaign, { foreignKey: 'campaign_id' });
db.Event.belongsTo(db.AdSet, { foreignKey: 'ad_set_id' });
db.Event.belongsTo(db.Ad, { foreignKey: 'ad_id' });
db.Event.belongsTo(db.User, { foreignKey: 'user_id' });
db.Integration.belongsTo(db.User, { foreignKey: 'userId' });
db.User.belongsTo(db.Company, { foreignKey: 'company_id' });
db.Visitor.belongsTo(db.Company, { foreignKey: 'company_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;