'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Cek apakah kolom password sudah ada
      const tableInfo = await queryInterface.describeTable('accounts');
      if (!tableInfo.password) {
        await queryInterface.addColumn('accounts', 'password', {
          type: Sequelize.STRING(255),
          allowNull: true // Sementara dibuat nullable untuk backward compatibility
        });
        
        // Update semua record yang ada dengan default password
        await queryInterface.sequelize.query(`
          UPDATE accounts SET password = '$2b$10$yRlrP9MG0t4RpLE3mrfvVOVYlkEETJZBIfUJ9Xj6GTrVVYZflQdES' 
          WHERE password IS NULL
        `); // Default password: 'password123'
        
        // Set kolom menjadi NOT NULL
        await queryInterface.changeColumn('accounts', 'password', {
          type: Sequelize.STRING(255),
          allowNull: false
        });
      }
    } catch (error) {
      console.error('Migration failed:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('accounts', 'password');
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }
};