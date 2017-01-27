const db = require('./db');
const Sequelize = require('sequelize');

const Restaurant = db.define('restaurant', {
	name : {
		type: Sequelize.STRING
	},
	cuisine: {
		type: Sequelize.STRING
	},
	price : {
		type: Sequelize.INTEGER,
		validate: {
			min: 1,
			max: 5
		}
	}
});

module.exports = Restaurant;