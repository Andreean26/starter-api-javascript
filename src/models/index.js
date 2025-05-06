const Account = require('./account');
const Category = require('./category');
const Event = require('./event');
const Participant = require('./participant');

// Define associations
Account.hasMany(Event, { foreignKey: 'username' });
Event.belongsTo(Account, { foreignKey: 'username', targetKey: 'username' });

Category.hasMany(Event, { foreignKey: 'category_id' });
Event.belongsTo(Category, { foreignKey: 'category_id' });

Event.hasMany(Participant, { foreignKey: 'event_id' });
Participant.belongsTo(Event, { foreignKey: 'event_id' });

// Relasi baru: Participant ke Account
Account.hasMany(Participant, { foreignKey: 'account_id' });
Participant.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });

module.exports = {
  Account,
  Category,
  Event,
  Participant
};