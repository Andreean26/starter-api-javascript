'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Periksa apakah tabel events ada
      const tableInfo = await queryInterface.describeTable('events');
      
      // Jika kolom event_time masih ada, hapus dan tambahkan dua kolom baru
      if (tableInfo.event_time) {
        // Tambahkan kolom baru terlebih dahulu
        await queryInterface.addColumn('events', 'event_start_time', {
          type: Sequelize.DATE,
          allowNull: true // Sementara nullable
        });
        
        await queryInterface.addColumn('events', 'event_end_time', {
          type: Sequelize.DATE,
          allowNull: true // Sementara nullable
        });
        
        // Salin nilai event_time ke event_start_time
        await queryInterface.sequelize.query(`
          UPDATE events 
          SET event_start_time = event_time,
              event_end_time = DATE_ADD(event_time, INTERVAL 1 HOUR)
          WHERE event_time IS NOT NULL
        `);
        
        // Atur kolom menjadi NOT NULL
        await queryInterface.changeColumn('events', 'event_start_time', {
          type: Sequelize.DATE,
          allowNull: false
        });
        
        await queryInterface.changeColumn('events', 'event_end_time', {
          type: Sequelize.DATE,
          allowNull: false
        });
        
        // Hapus kolom event_time lama
        await queryInterface.removeColumn('events', 'event_time');
      }
    } catch (error) {
      console.error('Migration failed:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Tambahkan event_time kembali
      await queryInterface.addColumn('events', 'event_time', {
        type: Sequelize.DATE,
        allowNull: true
      });
      
      // Salin nilai start_time ke event_time
      await queryInterface.sequelize.query(`
        UPDATE events 
        SET event_time = event_start_time
        WHERE event_start_time IS NOT NULL
      `);
      
      // Set NOT NULL
      await queryInterface.changeColumn('events', 'event_time', {
        type: Sequelize.DATE,
        allowNull: false
      });
      
      // Hapus kolom baru
      await queryInterface.removeColumn('events', 'event_start_time');
      await queryInterface.removeColumn('events', 'event_end_time');
    } catch (error) {
      console.error('Rollback migration failed:', error);
    }
  }
};