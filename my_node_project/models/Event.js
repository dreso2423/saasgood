// models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  type: DataTypes.STRING,
  timestamp: DataTypes.DATE,
  data_source_id: DataTypes.UUID,
  connection_id: DataTypes.UUID,
  campaign_id: DataTypes.UUID,
  ad_set_id: DataTypes.UUID,
  ad_id: DataTypes.UUID,
  platform_specific_tracking_ids: DataTypes.JSON,
  additional_event_data: DataTypes.JSON,
  user_id: DataTypes.UUID,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  tableName: 'events',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});



module.exports = Event;