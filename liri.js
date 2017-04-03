// declare var for node modules
var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");

// declare var for getting user data
var searchType = process.argv[2];
var name = process.argv.slice(3);

// grab key for twitter and store in keys var
var keyList = keys.twitterKeys;

// use switch to determine which function is called
switch(searchType) {
case "my-tweets":
    myTweets();
    break;
case "spotify-this-song":
    spotifySearch();
    break;
case "movie-this":
    movieSearch();
    break;
case "do-what-this-says":
    randomSearch();
    break;
}


// create twitter callback function
function myTweets() {
    var client = new Twitter(this.keyList);
    var params = {screen_name: 'jmw5050'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
	    console.log(tweets);
	} else {
	    console.log(error);
	}
    });
}; // close myTweets function

// create spotify callback function
function spotifySearch() {

} // close spotify function

// create omdb request function
function movieSearch() {

} // close movie search

// create random.txt readfile function
function randomSearch() {

} // close random search
