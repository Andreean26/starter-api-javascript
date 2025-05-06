'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Tambahkan kolom account_id sebagai foreign key
      await queryInterface.addColumn('participants', 'account_id', {
        type: Sequelize.INTEGER,
        allowNull: true, // Nullable untuk mendukung peserta tanpa akun
        references: {
          model: 'accounts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Jika akun dihapus, account_id akan menjadi NULL
      });
    } catch (error) {
      console.error('Migration failed:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Hapus kolom account_id
      await queryInterface.removeColumn('participants', 'account_id');
    } catch (error) {
      console.error('Rollback migration failed:', error);
    }
  }
};