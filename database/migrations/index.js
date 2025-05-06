const path = require('path');
const fs = require('fs');

const migrations = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const migration = require(path.join(__dirname, file));
    const name = file.split('.')[0];
    migrations[name] = migration;
  });

module.exports = migrations;