require("dotenv").config();

// Create variable to store imported keys info
const keys = require("./keys.js");

// Create variables for each of the invoked Node packages
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');
const fs = require('fs');

// Create variables to store keys for Twitter & Spotify
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdb = keys.omdb.api_key || 'trilogy';

// Store all functions in the 'actions' object
var actions = {
	// The twitter function calls the Twitter API and returns the selected user's last 20 tweets
	twitter: (handle) => {
		client.get('statuses/user_timeline',{screen_name: handle,count: 20}, (error, tweet, response) => {
			if(!error){
				// Loop through and display/log returned tweets 
				for (var i = 0; i < tweet.length; i++) {
					console.log('['+tweet[i].created_at + '] ' + tweet[i].text);
					actions.writeToLogFile('['+tweet[i].created_at + '] ' + tweet[i].text);
				}
			}else {
				// If there is an error display/log the error message
				actions.writeToLogFile('Error occurred: ' + error);
				return console.log('Error occurred: ' + error);
			}
		});
	},

	// The spotify function searches the Spotify API for the specified song
	// Prints/logs details about the song including artist(s), song name, preview link & album 
	spotify: (song) => {
		spotify.search({ type: 'track', query: song, limit: 1 }, (err, data) => {
			if (err) {
				actions.writeToLogFile('Error occurred: ' + err);
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
					actions.writeToLogFile('Artist['+ (r + 1)+']: '+ artists[r].name);
				}

				// Display data in console
				console.log('Song name: ' + song);
				console.log('Preview Link: ' + link);
				console.log('Album ('+ albumType +'): ' + album);

				// Write data to log file
				actions.writeToLogFile('Song name: ' + song);
				actions.writeToLogFile('Preview Link: ' + link);
				actions.writeToLogFile('Album ('+ albumType +'): ' + album);
			}
		});
	},

	// The omdb function searches the OMDB API for the specified movie
	// Prints/logs details about the movie
	omdb: (movie) => {
		request('http://www.omdbapi.com/?t='+ encodeURIComponent(movie) +'&apikey=' + omdb, (error, response, body) => {
			if (error) {
				actions.writeToLogFile('Error occurred: ' + error);
				return console.log('Error occurred: ' + error);
			}
			if(body){
				// Parse returned JSON string into a JSON object
				const result = JSON.parse(body);

				// Display data in the console
				console.log('Title: '+result.Title);
			  	console.log('Year: '+result.Year);
			  	console.log('IMDB Rating: '+result.Ratings[0].Value);
			  	if(result.Ratings[1]){
			  		console.log('Rotten Tomatoes Rating: '+result.Ratings[1].Value);
			  	}
			  	console.log('Country: '+result.Country);
			  	console.log('Language: '+result.Language);
			  	console.log('Plot: '+result.Plot);
			  	console.log('Actor(s): '+result.Actors);

			  	// Write data to log file
			  	actions.writeToLogFile('Title: '+result.Title);
			  	actions.writeToLogFile('Year: '+result.Year);
			  	actions.writeToLogFile('IMDB Rating: '+result.Ratings[0].Value);
			  	if(result.Ratings[1]){
			  		actions.writeToLogFile('Rotten Tomatoes Rating: '+result.Ratings[1].Value);
				}
			  	actions.writeToLogFile('Country: '+result.Country);
			  	actions.writeToLogFile('Language: '+result.Language);
			  	actions.writeToLogFile('Plot: '+result.Plot);
			  	actions.writeToLogFile('Actor(s): '+result.Actors);
			}
		});
	},

	// The random function executes a command from the random.txt file
	random: (file) => {
		// Read data from the file
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) throw err;

			// Convert data Buffer to a string
			var fileData = data.split(',');

			// Extract the command from the file
			var fileCommand = fileData[0];

			// Extract the query from the file
			// Remove quotes from query string 
			var fileQuery = fileData[1].replace(/\"/g,'');

			// Use recursion to run the command from the file
			if (!(fileCommand === "do-what-it-says")){
				actions.execute(fileCommand, fileQuery);
			}else {
				actions.invalidCommand("The 'do-what-it-says' command is already running. Choose another command.");
			}

		});
	},

	// The execute function takes in command and query parameters. Based on the chosen command,
	// a different API is called using the callAPI function 
	// Use default query values if user does not specify a value
	execute: (command, query) => {
		if (command === "my-tweets") {
			query = query || 'BlackPanther653';
			actions.callAPI('twitter','Fetching the last 20 tweets from "'+ query +'"...',query);
		} else if (command === "spotify-this-song") {
			query = query || 'The Sign Ace of Base';
			actions.callAPI('spotify','Searching for the song "'+ query +'"...',query);
		} else if (command === "movie-this") {
			query = query || 'Mr Nobody';
			actions.callAPI('omdb','Searching for the movie "'+ query +'"...',query);
		} else if (command === "do-what-it-says") {
			query = query || 'random.txt';
			actions.callAPI('random','Pulling command from "'+ query +'" file...',query);
		} else {
			actions.invalidCommand('Sorry, "'+ command +'" is not a valid command.');
		}		
	},

	// The callAPI function takes in three parameters (command, message and query)
	// This function both consoles & writes to a log file the specified message 
	// Additionally, based on the entered command, the associated API function is called 
	callAPI: (command,message,query) => {
		console.log(message);
		actions.writeToLogFile('\r\n-----------------');
		actions.writeToLogFile(message);
		actions[command](query);
	},

	// The writeToLogFile function writes the specified content to the log.txt file
	writeToLogFile: (content) => {
		fs.appendFile('log.txt', content + '\r\n', (err) => {
			if (err) throw err;
		});	
	},

	// Notify user the command they entered was invalid
	invalidCommand: (message) => {
		console.log(message);
		actions.writeToLogFile('\r\n-----------------');
		actions.writeToLogFile(message);
	}
};

// Start the app!
actions.execute(process.argv[2], process.argv[3]);