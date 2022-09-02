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
    await queryInterface.bulkInsert('categories', [
      {
        category_type: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_type: 'Food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_type: 'Clothes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_type: 'Category-Unknown',
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
    await queryInterface.bulkDelete('categories', null, {});

  }
};
