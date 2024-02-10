// models/AdSet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const AdSet = sequelize.define('AdSet', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  campaign_id: DataTypes.UUID,
  name: DataTypes.STRING,
  targeting_criteria: DataTypes.JSON,
  budget: DataTypes.DECIMAL(10, 2),
  performance_metrics_json: DataTypes.JSON,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'ad_sets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = AdSet;