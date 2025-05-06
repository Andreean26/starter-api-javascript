const { DataTypes } = require('sequelize');
const database = require('../../database');
const bcrypt = require('bcrypt');

const Account = database.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'accounts',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (account) => {
      if (account.password) {
        account.password = await bcrypt.hash(account.password, 10);
      }
    },
    beforeUpdate: async (account) => {
      if (account.changed('password')) {
        account.password = await bcrypt.hash(account.password, 10);
      }
    }
  }
});

// Menambahkan method instance untuk verifikasi password
Account.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Account;