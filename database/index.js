require('dotenv').config();
const { Sequelize } = require('sequelize');

// Verifikasi dan cetak informasi koneksi untuk debugging
console.log('Database Configuration:');
console.log(`- Dialect: ${process.env.DB_DIALECT || 'mysql'}`);
console.log(`- Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`- Port: ${process.env.DB_PORT || '3306'}`);
console.log(`- Database: ${process.env.DB_DATABASE || 'undefined'}`);
console.log(`- Username: ${process.env.DB_USERNAME || 'undefined'}`);
console.log(`- Password: ${process.env.DB_PASSWORD ? '********' : 'none'}`);

// Periksa konfigurasi yang diperlukan
if (!process.env.DB_DATABASE) {
  console.error('ERROR: DB_DATABASE environment variable is not defined!');
  process.exit(1);
}

if (!process.env.DB_USERNAME) {
  console.error('ERROR: DB_USERNAME environment variable is not defined!');
  process.exit(1);
}

const database = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD || '', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: Number(process.env.DB_PORT || 3306),
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: { 
      connectTimeout: 30000,
      // Tambahkan opsi ini jika menggunakan MySQL 8+
      // authPlugins: {
      //   mysql_native_password: () => () => Buffer.from("password")
      // }
    },
    retry: { max: 3 }
  }
);

// Test koneksi
database.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = database;