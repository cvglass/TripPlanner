const Hotel = require('./hotels');
const Restaurant = require('./restaurants');
const Activity = require('./activities');
const Place = require('./places');
const db = require('./db');
const Sequelize = require('sequelize');


Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = db

// const db = require('./models/index')
