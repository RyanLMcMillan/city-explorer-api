'use strict';
// imports
// const {response} = request('express');
// requires
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors'); // to share the data
// const { default: axios } = require('axios');
// use
const app = express();
app.use(cors()); // middleware - see error handlers 
const getWeather = require('./weather');
const getMovies = require('./movies');
// routes
const PORT = process.env.PORT || 3002; // this will validate if its running on the correct server or not

app.get('/', (request, response) => {
  response.send('Welcome, from us to you!')
});

app.get('/weather', getWeather);



app.get('/movies', getMovies) 


app.get('*', (request, response) => {
  // this will be a catch all if user inputs something incorrectly
  response.status(404).send('not found');
}); 

// error handling

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Classes




// listen

app.listen(PORT, () => console.log(`listening on port ${PORT}`));