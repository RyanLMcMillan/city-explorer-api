'use strict';
// imports
// const {response} = request('express');
// requires
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors'); // to share the data

// use
const app = express();
app.use(cors()); // middleware - see error handlers 
const PORT = process.env.PORT || 3002; // this will validate if its running on the correct server or not

// routes

app.get('/', (request, response) => {
  response.send('Welcome, from us to you!')
});

app.get('/weather', (request, response) => {
  try {
  let city = request.query.city_name; // this is our search query  
  if (city){
    let cityObject = data.find(localCity => localCity.city_name === city);
    let cityForcast = new Forcast(cityObject);
    response.send(cityForcast); // weather data api
  } else {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityObject = data.find(localCity => localCity.lat === lat && localCity.lon === lon);
    let cityForcast = new Forcast(cityObject);
    response.send(cityForcast);
  }
  } catch(error){
    console.log(error);
  }
});



app.get('*', (request, response) => {
  // this will be a catch all if user inputs something incorrectly
  response.status(404).send('not found');
}); 

// error handling

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Classes
class Forcast{
  constructor(cityObject) {
    console.log(cityObject)
    this.cityName = cityObject.city_name;
    // Day One
    this.descriptionOne = cityObject.data[0].weather.description;
    this.dateOne = cityObject.data[0].valid_date;
    // Day Two
    this.descriptionTwo = cityObject.data[1].weather.description;
    this.dateTwo = cityObject.data[1].valid_date;
    // Day Three
    this.descriptionThree = cityObject.data[2].weather.description;
    this.dateThree = cityObject.data[2].valid_date;
  }
}

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));