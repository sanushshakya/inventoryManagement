'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('order_lines_items', 'received_quantity', {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.removeColumn('order_lines_items', 'received_quantity')
  }
};
