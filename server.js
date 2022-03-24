'use strict';
// imports
// const {response} = request('express');
// requires
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors'); // to share the data
const { default: axios } = require('axios');
// use
const app = express();
app.use(cors()); // middleware - see error handlers 
const PORT = process.env.PORT || 3002; // this will validate if its running on the correct server or not

// routes

app.get('/', (request, response) => {
  response.send('Welcome, from us to you!')
});

app.get('/weather', async (request, response) => {
  try {
  let city = request.query.city_name; // this is our search query  
  // if (city){
    let cityObject = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.WEATHER_API_KEY}`)
    // data.find(localCity => localCity.city_name === city);
    let cityForcast = new Forcast(cityObject.data);
    response.send(cityForcast); // weather data api
  } catch(error){
    console.log(error);
  }
});

// app.get('/movies', (request, response) => {

// })

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
    this.cityName = cityObject.data[0].city_name;
    // console.log(cityObject.data[0].city_name);
    // Day One
    this.descriptionOne = cityObject.data[0].weather.description;
    this.dateOne = cityObject.data[0].ob_time;
    // console.log(this.descriptionOne);
    // console.log(this.dateOne);
    // // Day Two
    // this.descriptionTwo = cityObject.data[1].weather.description;
    // this.dateTwo = cityObject.data[1].valid_date;
    // // Day Three
    // this.descriptionThree = cityObject.data[2].weather.description;
    // this.dateThree = cityObject.data[2].valid_date;
  }
}

// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));