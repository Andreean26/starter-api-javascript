const { DataTypes } = require('sequelize');
const database = require('../../database');

const Event = database.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'username'  // Tetap merujuk ke username karena menjadi foreign key fungsional
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  event_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  event_start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  event_end_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterStartTime(value) {
        if (new Date(value) <= new Date(this.event_start_time)) {
          throw new Error('End time must be after start time');
        }
      }
    }
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  number_people: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'events',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Event;