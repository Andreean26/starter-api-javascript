'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash password sekali saja untuk efisiensi
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    return queryInterface.bulkInsert('accounts', [
      {
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        phone_number: '+62812345671',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'janedoe',
        email: 'jane.doe@example.com',
        password: hashedPassword,
        phone_number: '+62812345672',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        phone_number: '+62812345673',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'organizer',
        email: 'organizer@example.com',
        password: hashedPassword,
        phone_number: '+62812345674',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'testuser',
        email: 'test.user@example.com',
        password: hashedPassword,
        phone_number: '+62812345675',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};