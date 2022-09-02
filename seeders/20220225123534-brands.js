'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('brands', [
      {
        brand_name: 'Samsung',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand_name: 'Wai Wai',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand_name: 'Nike',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brand_name: 'Brand-Unknown',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('brands', null, {});

  }
};
