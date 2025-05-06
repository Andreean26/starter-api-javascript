const { DataTypes } = require('sequelize');
const database = require('../../database');

const Category = database.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'categories',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Category;