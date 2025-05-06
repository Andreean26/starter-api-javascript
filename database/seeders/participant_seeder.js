'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('participants', [
      {
        event_id: 1, // Annual Tech Conference
        account_id: 1, // Account ID
        participant_name: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone_number: '+62812555001',
        attendance_status: 'confirmed',
        created_at: now,
        updated_at: now
      },
      {
        event_id: 1, // Annual Tech Conference
        account_id: 2, // Account ID
        participant_name: 'Maria Garcia',
        email: 'maria.g@example.com',
        phone_number: '+62812555002',
        attendance_status: 'confirmed',
        created_at: now,
        updated_at: now
      },
      {
        event_id: 2, // JavaScript Workshop
        account_id: 3, // Account ID
        participant_name: 'Sam Wilson',
        email: 'sam.w@example.com',
        phone_number: '+62812555003',
        attendance_status: 'pending',
        created_at: now,
        updated_at: now
      },
      {
        event_id: 3, // AI Seminar
        account_id: 4, // Account ID
        participant_name: 'Patricia Lee',
        email: 'patricia.l@example.com',
        phone_number: '+62812555004',
        attendance_status: 'confirmed',
        created_at: now,
        updated_at: now
      },
      {
        event_id: 4, // Networking Night
        account_id: 5, // Account ID
        participant_name: 'Robert Chen',
        email: 'robert.c@example.com',
        phone_number: '+62812555005',
        attendance_status: 'declined',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('participants', null, {});
  }
};