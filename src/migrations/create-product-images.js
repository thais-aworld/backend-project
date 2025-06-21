'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_images', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE'
      },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
      path: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_images');
  }
};
