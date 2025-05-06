'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'  // Tetap merujuk ke username sebagai foreign key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      event_name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      event_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      number_people: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'URL path to the event image'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('events');
  }
};