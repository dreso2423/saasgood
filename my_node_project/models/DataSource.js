// models/DataSources.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const DataSources = sequelize.define('DataSources', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  company_id: DataTypes.UUID,
  name: DataTypes.STRING,
  type: DataTypes.ENUM('crm', 'advertising_platform', 'marketing_tool', 'cdp'),
  api_documentation_url: DataTypes.STRING,
  authentication_method: DataTypes.ENUM('api_key', 'oauth'),
  platform_specific_config: DataTypes.JSON,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'data_sources',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = DataSources;