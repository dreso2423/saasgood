// models/Campaign.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  data_source_id: DataTypes.UUID,
  name: DataTypes.STRING,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  budget: DataTypes.DECIMAL(10, 2),
  objective: DataTypes.STRING,
  performance_metrics_json: DataTypes.JSON,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'campaigns',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = Campaign;