'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.changeColumn('vendors', 'phone', {
        type: Sequelize.BIGINT.UNSIGNED ,
        allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
     await queryInterface.changeColumn('vendors', 'phone', {
      type: Sequelize.INTEGER ,
      allowNull: true,
  });
  }
};
