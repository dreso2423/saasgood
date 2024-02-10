// models/Ad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ad_set_id: DataTypes.UUID,
  creative_type: DataTypes.STRING,
  landing_page_url: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'ads',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = Ad;