# LIRI-Node-App

## Purpose

LIRI is a Language Interpretation and Recognition Interface that takes in a command and a query parameter and returns data.

## Getting Started

To use this app you will need your own set of API keys for the Twitter and Spotify APIs.

Syntax:
$ node liri.js '[enter command here]' '[enter query here]'

Example: 
```
$ node liri.js movie-this "Black Panther"
```

## Commands

* my-tweets: - Displays the last 20 tweets and when they were created of the specified Twitter handle. If no handle is indicated, it will display tweets from my account (BlackPanther653).
  * Usage example 1: $ node liri.js my-tweets BarackObama
  * Usage example 2: $ node liri.js my-tweets
* spotify-this-song: - Displays detailed information about a given song. If no song is specified, it will default to "The Sign" by Ace of Base.
  * Usage example 1: $ node liri.js spotify-this-song "All The Stars by Kendrick Lamar"
  * Usage example 2: $ node liri.js spotify-this-song
* movie-this: - Displays detailed information about a specified movie. If no movie is specified, it will default to the movie "Mr. Nobody".
  * Usage example 1: $ node liri.js movie-this "Black Panther"
  * Usage example 2: $ node liri.js movie-this
* do-what-it-says: Reads a command and query from a specified text file and executes the command. If no text file is specified, it will default to random.txt. The file should be stored in the root folder.
  * Usage example 1: $ node liri.js do-what-it-says "fileWithRandomCommand.txt"
  * Usage example 2: $ node liri.js do-what-it-says

## APIs Used

* [Twitter](https://developer.twitter.com/en/docs)
* [Spotify](https://developer.spotify.com/documentation/web-api/)
* [OMDB](http://www.omdbapi.com/)

## Node Packages Used

* https://www.npmjs.com/package/twitter
* https://www.npmjs.com/package/node-spotify-api
* https://www.npmjs.com/package/request
* https://www.npmjs.com/package/dotenv
* [FileSystem (fs)](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html)

## Author

This project was written by 
[Jon White](https://jonathan-white.github.io/)