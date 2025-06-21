'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
      name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false },
      use_in_menu: { type: Sequelize.BOOLEAN, defaultValue: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      description: { type: Sequelize.STRING },
      price: { type: Sequelize.FLOAT, allowNull: false },
      price_with_discount: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
