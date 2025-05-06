'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get current date for creating events at different times
    const now = new Date();
    
    // Create dates for events
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // Helper function to add hours to a date
    const addHours = (date, hours) => {
      const newDate = new Date(date);
      newDate.setHours(newDate.getHours() + hours);
      return newDate;
    };

    return queryInterface.bulkInsert('events', [
      {
        username: 'johndoe',
        category_id: 1, // Conference
        event_name: 'champion league',
        event_start_time: nextMonth,
        event_end_time: addHours(nextMonth, 8),
        location: 'Stadium XYZ',
        number_people: 30,
        description: 'Join us for the annual champion league event where teams from all over the world compete for the title.',
        image_url: 'https://example.com/images/tech-conference.jpg',
        created_at: now,
        updated_at: now
      },
      {
        username: 'janedoe',
        category_id: 2, // Workshop
        event_name: 'football league',
        event_start_time: tomorrow,
        event_end_time: addHours(tomorrow, 4),
        location: 'Stadium ABC',
        number_people: 30,
        description: 'play football with your friends and enjoy the game.',
        image_url: 'https://example.com/images/js-workshop.jpg',
        created_at: now,
        updated_at: now
      },
      {
        username: 'admin',
        category_id: 3, // Seminar
        event_name: 'basketball league',
        event_start_time: nextWeek,
        event_end_time: addHours(nextWeek, 3),
        location: 'hall Center Auditorium',
        number_people: 150,
        description: 'basketball league event with top teams competing for the championship.',
        image_url: 'https://example.com/images/ai-seminar.jpg',
        created_at: now,
        updated_at: now
      },
      {
        username: 'organizer',
        category_id: 4, // Social Gathering
        event_name: 'swimming competition',
        event_start_time: addHours(now, 48), // 2 days from now
        event_end_time: addHours(now, 51), // 3 hours event
        location: 'City Park',
        number_people: 75,
        description: 'A fun swimming competition for all ages. Join us for a day of fun and fitness!',
        image_url: 'https://example.com/images/networking-night.jpg',
        created_at: now,
        updated_at: now
      },
      {
        username: 'testuser',
        category_id: 5, // Exhibition
        event_name: 'badminton competition',
        event_start_time: addHours(now, 72), // 3 days from now
        event_end_time: addHours(now, 96), // 24 hours event (spans multiple days)
        location: 'Community Center',
        number_people: 200,
        description: 'badminton competition event with various teams participating.',
        image_url: 'https://example.com/images/digital-art.jpg',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  }
};