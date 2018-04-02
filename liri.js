require("dotenv").config();

// Create variable to store imported keys info
const keys = require("./keys.js");

// Create variables for each of the used Node packages
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');
const fs = require('fs');

// Create variables to store keys for Twitter & Spotify
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdb = keys.omdb.api_key || 'trilogy';

runCommand(process.argv[2], process.argv[3]);

// Takes in two parameters (command & query). 
// Command = a command (my-tweets, spotify-this-song, movie-this, or do-what-it-says)
// Query = input for the command
function runCommand(command, query){
	if (command === "my-tweets") {
		console.log('Let me pull your tweets...');
		logData('\r\n-----------------');
		logData('Let me pull your tweets...');
		client.get('statuses/user_timeline',{screen_name: 'BlackPanther653',count: 20}, (error, tweet, response) => {
			if(!error){
				for (var i = 0; i < tweet.length; i++) {
					console.log('['+tweet[i].created_at + '] ' + tweet[i].text);
					logData('['+tweet[i].created_at + '] ' + tweet[i].text);
				}
			}else {
				logData('Error: ' + error);
				return console.log('Error: ' + error);
			}
		});
	} else if (command === "spotify-this-song") {
		query = query || 'The Sign Ace of Base';
		console.log('Searching for the song '+ query +'...');
		logData('\r\n-----------------');
		logData('Searching for the song '+ query +'...');

		// Search for the song
		spotify.search({ type: 'track', query: query, limit: 1 }, (err, data) => {
			if (err) {
				logData('Error occurred: ' + err);
				return console.log('Error occurred: ' + err);
			}
			const result = data.tracks.items;
			for (var i = 0; i < result.length; i++) {
				// setup variables
				const artists = result[i].artists;
				const song = result[i].name;
				const link = result[i].external_urls.spotify;
				const album = result[i].album.name;
				const albumType = result[i].album.album_type;

				// Display list of artists
				for (var r = 0; r < artists.length; r++) {
					console.log('Artist['+ (r + 1)+']: '+ artists[r].name);
					logData('Artist['+ (r + 1)+']: '+ artists[r].name);
				}

				// Display data in console
				console.log('Song name: ' + song);
				console.log('Preview Link: ' + link);
				console.log('Album ('+ albumType +'): ' + album);

				// Write data to log file
				logData('Song name: ' + song);
				logData('Preview Link: ' + link);
				logData('Album ('+ albumType +'): ' + album);
			}
		});
	} else if (command === "movie-this") {
		query = query || 'Mr Nobody';
		console.log('Searching for the movie "'+ query +'"...');
		logData('\r\n-----------------');
		logData('Searching for the movie "'+ query +'"...');

		// Search for the movie
		request('http://www.omdbapi.com/?t='+ encodeURIComponent(query) +'&apikey=' + omdb, (error, response, body) => {
			if (error) {
				logData('Error occurred: ' + error);
				return console.log('Error occurred: ' + error);
			}
			if(body){
				// Parse returned JSON string into a JSON object
				const result = JSON.parse(body);

				// Display data in the console
				console.log('Title: '+result.Title);
			  	console.log('Year: '+result.Year);
			  	console.log('IMDB Rating: '+result.Ratings[0].Value);
			  	console.log('Rotten Tomatoes Rating: '+result.Ratings[1].Value);
			  	console.log('Country: '+result.Country);
			  	console.log('Language: '+result.Language);
			  	console.log('Plot: '+result.Plot);
			  	console.log('Actor(s): '+result.Actors);

			  	// Write data to log file
			  	logData('Title: '+result.Title);
			  	logData('Year: '+result.Year);
			  	logData('IMDB Rating: '+result.Ratings[0].Value);
			  	logData('Rotten Tomatoes Rating: '+result.Ratings[1].Value);
			  	logData('Country: '+result.Country);
			  	logData('Language: '+result.Language);
			  	logData('Plot: '+result.Plot);
			  	logData('Actor(s): '+result.Actors);
			}
		});

	} else if (command === "do-what-it-says") {
		// Read data from the file
		fs.readFile('random.txt', 'utf8', (err, data) => {
		  if (err) throw err;

		  // Convert data Buffer to a string
		  var fileData = data.split(',');

		  // Extract the command from the file
		  var fCommand = fileData[0];

		  // Extract the query from the file
		  var fQuery = fileData[1];

		  // Use recursion to run the command from the file
		  runCommand(fCommand, fQuery);

		});
	} else {
		console.log('Sorry, "'+ command +'" is not a valid command.');
		logData('\r\n-----------------');
		logData('Sorry, "'+ command +'" is not a valid command.');
	}
};

function logData(data){
	fs.appendFile('log.txt', data + '\r\n', (err) => {
	  if (err) throw err;
	});	
};