// models/Company.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  account_type: DataTypes.ENUM('free', 'paid'),
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'company',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});


module.exports = Company;