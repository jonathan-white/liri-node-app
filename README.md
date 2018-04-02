# liri-node-app

## Purpose

LIRI is a Language Intrepretation and Recognition Interface that takes in a command and a query parameter and returns data.

## Getting Started

$ node liri.js [command] [query]

Example: $ node liri.js movie-this "Black Panther"

## Commands

* my-tweets: - Displays your last 20 tweets and when they were created.
* spotify-this-song: - Displays detailed information about a given song.
* movie-this: - Displays detailed information about a given movie.
* do-what-it-says: Reads a command and query from a file and executes the command

### APIs Used
* Twitter
* Spotify
* OMDB

## Node Packages Used

* https://www.npmjs.com/package/twitter
* https://www.npmjs.com/package/node-spotify-api
* https://www.npmjs.com/package/request
* https://www.npmjs.com/package/dotenv
* FileSystem (fs)

## Author

This project is maintained and written by 
[Jon White](https://motionswing.github.io/)