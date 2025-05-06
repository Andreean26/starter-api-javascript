'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        category_name: 'futball/futsal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: 'Basketball',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: 'Badminton',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: 'Tennis',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        category_name: 'Swimming',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};