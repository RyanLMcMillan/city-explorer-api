'use strict';
const { default: axios } = require('axios');

let cache = {

};

async function getWeather(request, response) {
  try {
    let city = request.query.city_name; // this is our search query  

    // create a key for what the user has searched for
    let key = city + 'Data';

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24)) {
      //use the cache 
      response.status(200).send(cache[key].data)
    } else {
      // make a new api request

      // make an api request to unsplash
      let cityObject = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.WEATHER_API_KEY}`)
      let cityForcast = new Forcast(cityObject.data);
      // line 25 is where the cache will be populating 
      cache[key] = {
        data: cityForcast,
        timestamp: Date.now()
      }
      response.status(200).send(cityForcast); // weather data api
    };

    // console.log(cityForcast);
  } catch (error) {
    // console.log(error);
  }
};
class Forcast {
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