'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Tambahkan kolom username
      await queryInterface.addColumn('participants', 'username', {
        type: Sequelize.STRING(50),
        allowNull: true
      });

      // Tambahkan kolom email
      await queryInterface.addColumn('participants', 'email', {
        type: Sequelize.STRING(100),
        allowNull: true
      });

      // Tambahkan kolom phone_number
      await queryInterface.addColumn('participants', 'phone_number', {
        type: Sequelize.STRING(20),
        allowNull: true
      });
    } catch (error) {
      console.error('Migration failed:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Hapus kolom username
      await queryInterface.removeColumn('participants', 'username');

      // Hapus kolom email
      await queryInterface.removeColumn('participants', 'email');

      // Hapus kolom phone_number
      await queryInterface.removeColumn('participants', 'phone_number');
    } catch (error) {
      console.error('Rollback migration failed:', error);
    }
  }
};