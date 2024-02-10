// models/Connections.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Connections = sequelize.define('Connections', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  company_id: DataTypes.UUID,
  data_source_id: DataTypes.UUID,
  access_token: DataTypes.STRING,
  refresh_token: DataTypes.STRING,
  last_synchronized_timestamp: DataTypes.DATE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'connections',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Connections;