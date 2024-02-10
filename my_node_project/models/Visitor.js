// models/Visitor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Visitor = sequelize.define('Visitor', {
  id: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  company_id: {
    type: DataTypes.STRING(36),
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  gclid: DataTypes.STRING,
  fbclid: DataTypes.STRING,
  ttclid: DataTypes.STRING,
  liclid: DataTypes.STRING,
  // Add any other data you want to track here
}, {
  tableName: 'visitors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = Visitor;