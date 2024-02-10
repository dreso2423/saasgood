// models/Conversion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Conversion = sequelize.define('Conversion', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  user_id: DataTypes.UUID,
  visitor_id: DataTypes.UUID,
  timestamp: DataTypes.DATE,
  type: DataTypes.STRING,
  value: DataTypes.DECIMAL(10, 2),
  revenueGenerated: DataTypes.DECIMAL(10, 2),
  costPerAcquisition: DataTypes.DECIMAL(10, 2),
  lifetimeValue: DataTypes.DECIMAL(10, 2),
  conversionPath: DataTypes.JSON,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'conversions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = Conversion;