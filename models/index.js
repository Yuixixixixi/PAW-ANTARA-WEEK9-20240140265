const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

User.hasMany(Item, { foreignKey: 'userId', as: 'items' });
Item.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {
  sequelize,
  User,
  Item
};

module.exports = db;