'use strict';
const { default: axios } = require('axios');
 
async function getMovies (request, response)  {
  // console.log('getMovies')  
  try {
    let keyword = request.query.keyword; // this is our search query 
    // console.log(movieQuery);
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${keyword}`;
    // console.log(movieUrl) // API Link
    let movieGrabData = await axios.get(movieUrl);
    // console.log(movieGrabData)
    let actualData = movieGrabData.data.results;
    // console.log(actualData);
    let movieArray = [];
    // console.log(movieArray);
    for (let i = 0; i < actualData.length; i++){
      movieArray.push(new Movie(actualData[i]));
    } // console.log(movieArray)
    response.send(movieArray);
  } catch (error) {
    console.log(error);
  }
};
class Movie {
  constructor(actualData){
    this.title = actualData.title;
    this.overview = actualData.overview;
    this.imgUrl = actualData.poster_path;
    this.avgVotes = actualData.vote_average;
    this.popularity = actualData.popularity;
    this.releaseDate = actualData.release_date;
  }
}
module.exports = getMovies;