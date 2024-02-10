'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('visitors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      userId: {
        type: Sequelize.STRING(36),
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      gclid: Sequelize.STRING,
      fbclid: Sequelize.STRING,
      ttclid: Sequelize.STRING,
      liclid: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('visitors');
  }
};