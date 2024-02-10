// models/Integration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User'); // Assuming you have a User model
const { exec } = require('child_process'); // Add this line

const Integration = sequelize.define('Integration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: DataTypes.STRING, // e.g., 'google_ads', 'facebook_ads', 'pipedrive', 'segment'
  userId: {
    type: DataTypes.STRING(36), // Change this line
    references: {
      model: 'users', // name of your user table
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  settings: DataTypes.JSONB, // Store integration-specific settings as JSON
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'integrations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



// Add this method
Integration.prototype.runMeltanoETL = function() {
  const command = `meltano elt ${this.type} target-postgres --job_id=${this.id}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

module.exports = Integration;