// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres', // replace with your database dialect
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

module.exports = sequelize;