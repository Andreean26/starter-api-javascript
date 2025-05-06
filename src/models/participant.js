const { DataTypes } = require('sequelize');
const database = require('../../database');

const Participant = database.define('Participant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  participant_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  attendance_status: {
    type: DataTypes.ENUM('confirmed', 'pending', 'declined'),
    defaultValue: 'pending',
    allowNull: false
  }
}, {
  tableName: 'participants',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Participant;