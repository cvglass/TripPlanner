const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const Hotel = db.models.hotel;
const Restaurant = db.models.restaurant;
const Activity = db.models.activity;
const Place = db.models.place;
const pg = require('pg');
const Promise = require('bluebird');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use('/public', express.static('public'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache:true });

app.get('/', (req,res) => {
	var hotels = Hotel.findAll({
		attributes: ['name']
	});
	var restaurants = Restaurant.findAll({
		attributes: ['name']
	});
	var activities = Activity.findAll({
		attributes: ['name']
	});

	Promise.all([hotels, restaurants, activities])
		.then(value => {
			res.render('index', { 
				hotels: value[0], 
				restaurants: value[1], 
				activities: value[2] })
		})
		.catch(err => {
			if(err) console.log(err);
		})

	// hotels.then(result => {
	// 	res.render('index', { hotels: result });
	// })
})


app.listen(3000, (req, res)=>{
	console.log('server is listening for aesthetes');
});



app.use((err, req, res, next)=>{
	res.status(err.status || 500).send();
	console.log(err);
})