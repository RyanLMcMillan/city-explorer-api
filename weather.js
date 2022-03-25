'use strict';
const { default: axios } = require('axios');

async function getWeather  (request, response)  {
  try {
  let city = request.query.city_name; // this is our search query  
    let cityObject = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.WEATHER_API_KEY}`)  
    let cityForcast = new Forcast(cityObject.data);
    console.log(cityForcast);
    response.send(cityForcast); // weather data api
  } catch(error){
    // console.log(error);
  }
};
class Forcast{
  constructor(cityObject) {
    // console.log(cityObject)
    this.cityName = cityObject.data[0].city_name;
    // console.log(cityObject.data[0].city_name);
    // Day One
    this.descriptionOne = cityObject.data[0].weather.description;
    this.dateOne = cityObject.data[0].ob_time;
    
  }
}
module.exports = getWeather;