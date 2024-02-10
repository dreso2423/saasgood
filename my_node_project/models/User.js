// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  googleId: DataTypes.STRING,
  name: DataTypes.STRING,
  email_address: DataTypes.STRING,
  company_id: DataTypes.UUID,
  role: DataTypes.ENUM('admin', 'user'),
  hashed_password: DataTypes.STRING,
  api_key: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = User;