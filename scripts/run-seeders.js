require('dotenv').config();
const { Sequelize } = require('sequelize');
const accountSeeder = require('../database/seeders/account_seeder');
const categorySeeder = require('../database/seeders/category_seeder');
const eventSeeder = require('../database/seeders/event_seeder');
const participantSeeder = require('../database/seeders/participant_seeder');

async function runSeeders() {
  console.log('Running database seeders...');

  const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: Number(process.env.DB_PORT || 3306),
    logging: console.log
  });

  try {
    // Test koneksi database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    const queryInterface = sequelize.getQueryInterface();

    // Jalankan seeder untuk accounts terlebih dahulu
    console.log('Seeding accounts table...');
    await accountSeeder.up(queryInterface, Sequelize);
    console.log('✓ Accounts seeded successfully');

    // Jalankan seeder untuk categories
    console.log('Seeding categories table...');
    await categorySeeder.up(queryInterface, Sequelize);
    console.log('✓ Categories seeded successfully');

    // Jalankan seeder untuk events
    console.log('Seeding events table...');
    await eventSeeder.up(queryInterface, Sequelize);
    console.log('✓ Events seeded successfully');

    // Jalankan seeder untuk participants
    console.log('Seeding participants table...');
    await participantSeeder.up(queryInterface, Sequelize);
    console.log('✓ Participants seeded successfully');

    console.log('All seeders completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeder failed:', error);
    process.exit(1);
  }
}

runSeeders();