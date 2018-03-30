require("dotenv").config();

// Create variable to store imported keys info
var keys = require("./keys.js");

// Create variables to store keys for Twitter & Spotify
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "my-tweets") {
	console.log('You want some tweets');
} else if (process.argv[2] === "spotify-this-song") {
	console.log('You want a song');
} else if (process.argv[2] === "movie-this") {
	console.log('You want a movie');
} else if (process.argv[2] === "do-what-it-says") {
	console.log('Do what it says!! Don\'t make it angry!!!');
} else {
	console.log('Sorry, "'+ process.argv[2] +'"" is not a valid command.');
}
