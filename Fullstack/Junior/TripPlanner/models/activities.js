const db = require('./db');
const Sequelize = require('sequelize');

const Activity = db.define('activity', {
	name :{
		type: Sequelize.STRING
	},
	age_range: {
		type: Sequelize.STRING
	}
});

module.exports = Activity;